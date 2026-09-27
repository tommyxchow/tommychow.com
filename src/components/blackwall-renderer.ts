import {
  displayFragmentShader,
  fullscreenVertexShader,
  simulationFragmentShader,
} from './blackwall-shaders'

// The sim is a small texture in wall space; its texels are square, so the
// wall is 4.8 heights wide before it repeats, wider than a 21:9 screen shows.
const SIM_WIDTH = 768
const SIM_HEIGHT = 160
const SIM_LEVELS = Math.floor(Math.log2(SIM_WIDTH)) + 1
// The datamosh reads as digital at 30 Hz, and it halves the GPU work.
const TICK_SECONDS = 1 / 30
const MAX_PIXEL_RATIO = 1.5
const MAX_PIXELS = 1_600_000
// Reduced motion shows one frame, after the sim has had time to smear.
const STATIC_TICKS = 45
// The tick feeds shader hashes, which lose float precision as it grows, so it
// wraps about every 3.3 hours. The blocks reshuffle once at the wrap, which
// reads as one more datamosh refresh.
const TICK_WRAP = 360_360
// A fresh seed per page load makes every visit a different wall. It stays
// small so the shader hashes keep their precision.
const SEED_RANGE = 500

function compileProgram(gl: WebGL2RenderingContext, fragmentSource: string) {
  const vertex = gl.createShader(gl.VERTEX_SHADER)
  const fragment = gl.createShader(gl.FRAGMENT_SHADER)
  const program = gl.createProgram()
  if (!vertex || !fragment) {
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
    gl.deleteProgram(program)
    return null
  }

  gl.shaderSource(vertex, fullscreenVertexShader)
  gl.shaderSource(fragment, fragmentSource)
  gl.compileShader(vertex)
  gl.compileShader(fragment)
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.bindAttribLocation(program, 0, 'aPosition')
  gl.linkProgram(program)

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS) === true
  if (!linked) {
    console.warn('Blackwall shader failed. Using the static background.', {
      program: gl.getProgramInfoLog(program),
      vertex: gl.getShaderInfoLog(vertex),
      fragment: gl.getShaderInfoLog(fragment),
    })
  }
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (linked) return program

  gl.deleteProgram(program)
  return null
}

function createTarget(gl: WebGL2RenderingContext) {
  const texture = gl.createTexture()
  const framebuffer = gl.createFramebuffer()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texStorage2D(gl.TEXTURE_2D, SIM_LEVELS, gl.RGBA8, SIM_WIDTH, SIM_HEIGHT)
  // Mipmaps double as a free blur for the haze and the floor reflection.
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_LINEAR,
  )
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0,
  )
  const complete =
    gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  return { texture, framebuffer, complete }
}

function createRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  })
  if (!gl) {
    console.warn(
      'Blackwall animation is unavailable. Using the static background.',
    )
    return null
  }

  const simulation = compileProgram(gl, simulationFragmentShader)
  const display = compileProgram(gl, displayFragmentShader)
  const buffer = gl.createBuffer()
  const vertexArray = gl.createVertexArray()
  const targets = [createTarget(gl), createTarget(gl)]

  const dispose = () => {
    for (const target of targets) {
      gl.deleteFramebuffer(target.framebuffer)
      gl.deleteTexture(target.texture)
    }
    gl.deleteVertexArray(vertexArray)
    gl.deleteBuffer(buffer)
    gl.deleteProgram(simulation)
    gl.deleteProgram(display)
  }

  if (!simulation || !display || targets.some((target) => !target.complete)) {
    if (simulation && display) {
      console.warn(
        'Blackwall render targets are unsupported. Using the static background.',
      )
    }
    dispose()
    return null
  }

  gl.bindVertexArray(vertexArray)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  )
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
  gl.activeTexture(gl.TEXTURE0)

  const simUniforms = {
    time: gl.getUniformLocation(simulation, 'uTime'),
    tick: gl.getUniformLocation(simulation, 'uTick'),
    reset: gl.getUniformLocation(simulation, 'uReset'),
  }
  const displayUniforms = {
    resolution: gl.getUniformLocation(display, 'uResolution'),
    pixelRatio: gl.getUniformLocation(display, 'uPixelRatio'),
    time: gl.getUniformLocation(display, 'uTime'),
  }
  const seed = [Math.random() * SEED_RANGE, Math.random() * SEED_RANGE] as const
  gl.useProgram(simulation)
  gl.uniform1i(gl.getUniformLocation(simulation, 'uPrevious'), 0)
  gl.uniform2f(
    gl.getUniformLocation(simulation, 'uSimSize'),
    SIM_WIDTH,
    SIM_HEIGHT,
  )
  gl.uniform2f(gl.getUniformLocation(simulation, 'uSeed'), ...seed)
  gl.useProgram(display)
  gl.uniform1i(gl.getUniformLocation(display, 'uSim'), 0)
  gl.uniform2f(
    gl.getUniformLocation(display, 'uSimSize'),
    SIM_WIDTH,
    SIM_HEIGHT,
  )
  gl.uniform2f(gl.getUniformLocation(display, 'uSeed'), ...seed)

  // targets[latest] holds the newest sim frame; the other one is written next.
  let latest = 0
  let tickCount = 0
  let initialized = false

  return {
    resize(width: number, height: number) {
      const scale = Math.min(
        window.devicePixelRatio,
        MAX_PIXEL_RATIO,
        Math.sqrt(MAX_PIXELS / (width * height)),
      )
      canvas.width = Math.max(1, Math.floor(width * scale))
      canvas.height = Math.max(1, Math.floor(height * scale))
      gl.useProgram(display)
      gl.uniform2f(displayUniforms.resolution, canvas.width, canvas.height)
      gl.uniform1f(displayUniforms.pixelRatio, canvas.width / width)
    },
    step(seconds: number) {
      const source = targets[latest]
      const destination = targets[1 - latest]
      if (!source || !destination) return

      gl.bindFramebuffer(gl.FRAMEBUFFER, destination.framebuffer)
      gl.viewport(0, 0, SIM_WIDTH, SIM_HEIGHT)
      gl.useProgram(simulation)
      gl.bindTexture(gl.TEXTURE_2D, source.texture)
      gl.uniform1f(simUniforms.time, seconds)
      gl.uniform1f(simUniforms.tick, tickCount)
      gl.uniform1f(simUniforms.reset, initialized ? 0 : 1)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.bindTexture(gl.TEXTURE_2D, destination.texture)
      gl.generateMipmap(gl.TEXTURE_2D)

      latest = 1 - latest
      initialized = true
      tickCount = (tickCount + 1) % TICK_WRAP
    },
    draw(seconds: number) {
      const current = targets[latest]
      if (!current) return

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.useProgram(display)
      gl.bindTexture(gl.TEXTURE_2D, current.texture)
      gl.uniform1f(displayUniforms.time, seconds)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
    dispose,
  }
}

export function startBlackwall(canvas: HTMLCanvasElement) {
  let renderer = createRenderer(canvas)
  if (!renderer) return

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0
  let previousFrame = 0
  let pending = 0
  // The clock wraps with the renderer's tick count, so the shaders' time
  // inputs stay small enough for float precision in a tab left open for days.
  let ticks = 0
  let seconds = 0
  let warmed = false
  let contextLost = false

  const advance = () => {
    ticks = (ticks + 1) % TICK_WRAP
    seconds = ticks * TICK_SECONDS
    renderer?.step(seconds)
  }

  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
    previousFrame = 0
  }

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick)
    // Hidden time isn't counted, so the wall picks up where it left off.
    const elapsed =
      previousFrame === 0 ? 0 : Math.min((now - previousFrame) / 1000, 0.1)
    previousFrame = now
    pending += elapsed
    if (pending < TICK_SECONDS) return

    pending %= TICK_SECONDS
    advance()
    renderer?.draw(seconds)
  }

  // The first frame needs at least one sim step. The reduced-motion still
  // runs more so it shows smeared blocks, not just the fresh field.
  const warmUp = () => {
    if (!renderer || warmed) return
    warmed = true
    const steps = motionQuery.matches ? STATIC_TICKS : 1
    for (let count = 0; count < steps; count += 1) advance()
  }

  const syncAnimation = () => {
    stop()
    if (contextLost || !renderer || document.hidden) return
    warmUp()
    renderer.draw(seconds)
    canvas.dataset.ready = ''
    if (!motionQuery.matches) frame = requestAnimationFrame(tick)
  }

  const resize = () => {
    if (contextLost || !renderer) return
    renderer.resize(
      Math.max(1, canvas.clientWidth),
      Math.max(1, canvas.clientHeight),
    )
    // Resizing clears the canvas, so redraw right away instead of flashing.
    renderer.draw(seconds)
  }

  const loseContext = (event: Event) => {
    event.preventDefault()
    contextLost = true
    stop()
    // Context loss already released the GPU resources, and the old handles
    // are invalid after restoration, so they aren't passed to dispose.
    renderer = null
    delete canvas.dataset.ready
    console.warn(
      'Blackwall graphics context was lost. Using the static background until it recovers.',
    )
  }

  const restoreContext = () => {
    renderer = createRenderer(canvas)
    contextLost = false
    // The new renderer's tick count starts over, so the clock does too.
    ticks = 0
    seconds = 0
    warmed = false
    resize()
    syncAnimation()
  }

  resize()
  syncAnimation()
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  document.addEventListener('visibilitychange', syncAnimation)
  motionQuery.addEventListener('change', syncAnimation)
  canvas.addEventListener('webglcontextlost', loseContext)
  canvas.addEventListener('webglcontextrestored', restoreContext)

  return () => {
    stop()
    observer.disconnect()
    document.removeEventListener('visibilitychange', syncAnimation)
    motionQuery.removeEventListener('change', syncAnimation)
    canvas.removeEventListener('webglcontextlost', loseContext)
    canvas.removeEventListener('webglcontextrestored', restoreContext)
    renderer?.dispose()
    delete canvas.dataset.ready
  }
}
