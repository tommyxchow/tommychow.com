import {
  blackwallFragmentShader,
  blackwallVertexShader,
} from './blackwall-shaders'

const FRAME_INTERVAL = 1000 / 30
const MAX_PIXELS = 1_500_000
const STATIC_TIME = 24

function createRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2', {
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

  const vertex = gl.createShader(gl.VERTEX_SHADER)
  const fragment = gl.createShader(gl.FRAGMENT_SHADER)
  const program = gl.createProgram()
  const buffer = gl.createBuffer()

  const dispose = () => {
    gl.deleteBuffer(buffer)
    gl.deleteProgram(program)
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
  }

  if (!vertex || !fragment) {
    dispose()
    console.warn(
      'Blackwall graphics allocation failed. Using the static background.',
    )
    return null
  }

  gl.shaderSource(vertex, blackwallVertexShader)
  gl.shaderSource(fragment, blackwallFragmentShader)
  gl.compileShader(vertex)
  gl.compileShader(fragment)
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.bindAttribLocation(program, 0, 'aPosition')
  gl.linkProgram(program)

  if (gl.getProgramParameter(program, gl.LINK_STATUS) !== true) {
    console.warn('Blackwall shader failed. Using the static background.', {
      program: gl.getProgramInfoLog(program),
      vertex: gl.getShaderInfoLog(vertex),
      fragment: gl.getShaderInfoLog(fragment),
    })
    dispose()
    return null
  }

  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  )
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  const resolution = gl.getUniformLocation(program, 'uResolution')
  const time = gl.getUniformLocation(program, 'uTime')
  const pointer = gl.getUniformLocation(program, 'uPointer')
  const pulse = gl.getUniformLocation(program, 'uPulse')
  const style = getComputedStyle(canvas)

  // Both the shader and CSS fallback use the artwork's local color tokens.
  for (const [uniform, token] of Object.entries({
    uBaseColor: '--blackwall-base',
    uSignalColor: '--blackwall-signal',
  })) {
    const hex = style.getPropertyValue(token).trim().slice(1)
    const color = Number.parseInt(hex, 16)
    gl.uniform3f(
      gl.getUniformLocation(program, uniform),
      ((color >> 16) & 255) / 255,
      ((color >> 8) & 255) / 255,
      (color & 255) / 255,
    )
  }

  return {
    resize(width: number, height: number) {
      const scale = Math.min(
        window.devicePixelRatio,
        1.5,
        Math.sqrt(MAX_PIXELS / (width * height)),
      )
      canvas.width = Math.max(1, Math.floor(width * scale))
      canvas.height = Math.max(1, Math.floor(height * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(resolution, canvas.width, canvas.height)
    },
    draw(
      seconds: number,
      pointerX: number,
      pointerY: number,
      pulseX: number,
      pulseY: number,
      pulseTime: number,
    ) {
      gl.uniform1f(time, seconds)
      gl.uniform2f(pointer, pointerX, pointerY)
      gl.uniform3f(pulse, pulseX, pulseY, pulseTime)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
    dispose,
  }
}

export function startBlackwall(canvas: HTMLCanvasElement) {
  let renderer = createRenderer(canvas)
  if (!renderer) return

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let width = Math.max(1, canvas.clientWidth)
  let height = Math.max(1, canvas.clientHeight)
  let frame = 0
  let previousFrame = 0
  let seconds = STATIC_TIME
  let pointerX = -2
  let pointerY = -2
  let targetX = -2
  let targetY = -2
  let pulseX = 0
  let pulseY = 0
  let pulseTime = -10
  let lastTap = -Infinity
  let contextLost = false

  const draw = () => {
    renderer?.draw(seconds, pointerX, pointerY, pulseX, pulseY, pulseTime)
  }

  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
    previousFrame = 0
  }

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick)
    if (previousFrame !== 0 && now - previousFrame < FRAME_INTERVAL - 1) return

    const elapsed =
      previousFrame === 0 ? 0 : Math.min((now - previousFrame) / 1000, 0.1)
    previousFrame = now
    seconds += elapsed
    const easing = 1 - Math.exp(-elapsed * 6)
    pointerX += (targetX - pointerX) * easing
    pointerY += (targetY - pointerY) * easing
    draw()
  }

  const syncAnimation = () => {
    stop()
    if (contextLost || !renderer || document.hidden) return
    if (motionQuery.matches) {
      seconds = STATIC_TIME
      pointerX = targetX = -2
      pointerY = targetY = -2
      pulseTime = -10
    }
    draw()
    canvas.dataset.ready = ''
    if (!motionQuery.matches) frame = requestAnimationFrame(tick)
  }

  const resize = () => {
    width = Math.max(1, canvas.clientWidth)
    height = Math.max(1, canvas.clientHeight)
    if (contextLost) return
    renderer?.resize(width, height)
    draw()
  }

  const movePointer = (event: PointerEvent) => {
    if (motionQuery.matches || event.pointerType === 'touch') return
    targetX = event.clientX / width
    targetY = 1 - event.clientY / height
    // Don't sweep a disturbance across the screen when the pointer first enters.
    if (pointerX === -2) {
      pointerX = targetX
      pointerY = targetY
    }
  }

  const leavePointer = () => {
    pointerX = targetX = -2
    pointerY = targetY = -2
  }

  const tap = (event: PointerEvent) => {
    if (motionQuery.matches || event.button !== 0 || !event.isPrimary) return
    if (
      event.target instanceof Element &&
      event.target.closest(
        'a, button, input, textarea, select, summary, [role="button"], [role="dialog"], [contenteditable]',
      )
    )
      return
    const now = performance.now()
    if (now - lastTap < 350) return
    lastTap = now
    pulseX = event.clientX / width
    pulseY = 1 - event.clientY / height
    pulseTime = seconds
  }

  const loseContext = (event: Event) => {
    event.preventDefault()
    contextLost = true
    stop()
    // Context loss already releases GPU resources. Old handles are invalid
    // after restoration, so don't pass them to the new context's cleanup.
    renderer = null
    delete canvas.dataset.ready
    console.warn(
      'Blackwall graphics context was lost. Using the static background until it recovers.',
    )
  }

  const restoreContext = () => {
    renderer = createRenderer(canvas)
    contextLost = false
    resize()
    syncAnimation()
  }

  resize()
  syncAnimation()
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('pointermove', movePointer, { passive: true })
  window.addEventListener('pointerdown', tap, { passive: true })
  document.documentElement.addEventListener('pointerleave', leavePointer)
  window.addEventListener('blur', leavePointer)
  document.addEventListener('visibilitychange', syncAnimation)
  motionQuery.addEventListener('change', syncAnimation)
  canvas.addEventListener('webglcontextlost', loseContext)
  canvas.addEventListener('webglcontextrestored', restoreContext)

  return () => {
    stop()
    observer.disconnect()
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', movePointer)
    window.removeEventListener('pointerdown', tap)
    document.documentElement.removeEventListener('pointerleave', leavePointer)
    window.removeEventListener('blur', leavePointer)
    document.removeEventListener('visibilitychange', syncAnimation)
    motionQuery.removeEventListener('change', syncAnimation)
    canvas.removeEventListener('webglcontextlost', loseContext)
    canvas.removeEventListener('webglcontextrestored', restoreContext)
    renderer?.dispose()
    delete canvas.dataset.ready
  }
}
