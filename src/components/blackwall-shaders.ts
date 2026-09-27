export const fullscreenVertexShader = `#version 300 es
in vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const noise = `
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

// Value noise that repeats every period cells in x, so the wall texture
// tiles horizontally without a seam on wide or narrow screens.
float periodicNoise(vec2 p, float period) {
  vec2 cell = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float x0 = mod(cell.x, period);
  float x1 = mod(cell.x + 1.0, period);
  float a = hash12(vec2(x0, cell.y));
  float b = hash12(vec2(x1, cell.y));
  float c = hash12(vec2(x0, cell.y + 1.0));
  float d = hash12(vec2(x1, cell.y + 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float valueNoise(vec2 p) {
  return periodicNoise(p, 4096.0);
}

float fbm(vec2 p, float period, int octaves) {
  float sum = 0.0;
  float amplitude = 0.5;
  float total = 0.0;
  for (int i = 0; i < 4; i++) {
    if (i >= octaves) break;
    sum += periodicNoise(p, period) * amplitude;
    total += amplitude;
    p = p * 2.0 + vec2(0.0, 17.3);
    period *= 2.0;
    amplitude *= 0.5;
  }
  return sum / total;
}
`

// Pass 1: a small datamosh simulation in wall space. Each 8x8 macroblock
// either refreshes from the live field (an I-frame block) or keeps copying the
// previous frame along a block motion vector (a P-frame block), which is what
// leaves the smeared, blocky trails the Blackwall has in the game.
export const simulationFragmentShader = `#version 300 es
precision highp float;

uniform sampler2D uPrevious;
uniform vec2 uSimSize;
uniform float uTime;
uniform float uTick;
uniform float uReset;
out vec4 outColor;

${noise}

const float CELLS = 6.0;

// R: energy, G: violet tint.
vec2 field(vec2 uv, float t) {
  vec2 p = vec2(uv.x * CELLS, uv.y * 2.2);
  p.x += t * 0.12;

  // Two rounds of domain warping give the liquid, smeared shapes.
  vec2 q = vec2(
    fbm(p + vec2(0.0, t * 0.06), CELLS, 3),
    fbm(p + vec2(3.1, 7.4 - t * 0.05), CELLS, 3)
  );
  vec2 r = vec2(
    fbm(p + 3.0 * q + vec2(1.7, 9.2 + t * 0.08), CELLS, 3),
    fbm(p + 3.0 * q + vec2(8.3, 2.8 - t * 0.07), CELLS, 3)
  );
  float f = fbm(p + 3.0 * r, CELLS, 4);

  float lit = smoothstep(0.3, 0.7, f);
  // Thin dark tendrils where the warp field crosses its midpoint.
  float veins = smoothstep(0.012, 0.07, abs(r.x - 0.5));
  float hot = smoothstep(0.56, 0.82, fbm(vec2(uv.x * 3.0 + t * 0.03, uv.y * 1.3 - t * 0.02), 3.0, 3));
  float region = 0.55 + 0.45 * periodicNoise(vec2(uv.x * 4.0, t * 0.04), 4.0);

  float energy = ((0.05 + 0.5 * lit) * mix(0.2, 1.0, veins) + hot * 0.42 * lit) * region;
  float violet = smoothstep(0.45, 0.85, q.y) * (1.0 - hot);
  return vec2(energy, violet);
}

void main() {
  vec2 texel = floor(gl_FragCoord.xy);
  vec2 uv = (texel + 0.5) / uSimSize;
  vec2 block = floor(texel / 8.0);
  vec2 blocks = uSimSize / 8.0;

  float blockSeed = hash12(block + 0.37);
  float epochLength = 4.0 + floor(blockSeed * 10.0);
  float epoch = floor((uTick + blockSeed * 97.0) / epochLength);
  float roll = hash12(vec2(block.x + epoch * 3.17, block.y - epoch * 1.63));
  float crispRoll = hash12(vec2(block.y + epoch * 2.31, block.x + 11.0));

  vec2 fresh = field(uv, uTime);
  if (uReset > 0.5) {
    outColor = vec4(fresh, step(0.7, crispRoll), 1.0);
    return;
  }

  // Neighbouring blocks share motion, the way real P-frame smear drifts in sheets.
  float motionPeriod = 8.0;
  vec2 motionCoord = vec2(block.x / blocks.x * motionPeriod, block.y * 0.25 + epoch * 0.05);
  vec2 flow = vec2(
    periodicNoise(motionCoord, motionPeriod),
    periodicNoise(motionCoord + vec2(0.0, 41.0), motionPeriod)
  );
  vec2 motion = floor((flow - 0.5) * vec2(7.0, 3.0) + 0.5);
  if (hash12(block + epoch) > 0.5) motion.y = 0.0;

  // Occasional horizontal tears drag whole rows sideways.
  float tearRow = floor(texel.y / 4.0);
  float tear = step(0.975, hash12(vec2(tearRow, floor(uTick / 3.0))));
  motion.x += tear * (hash12(vec2(tearRow, uTick)) > 0.5 ? 9.0 : -9.0);

  vec4 previous = texelFetch(uPrevious, ivec2(texel), 0);
  ivec2 source = ivec2(
    int(mod(texel.x - motion.x, uSimSize.x)),
    int(clamp(texel.y - motion.y, 0.0, uSimSize.y - 1.0))
  );
  vec4 moved = texelFetch(uPrevious, source, 0);

  if (roll < 0.08) {
    outColor = vec4(fresh, step(0.7, crispRoll), 1.0);
  } else if (roll < 0.5 || tear > 0.5) {
    outColor = vec4(mix(moved.rg, fresh, 0.06), 1.0, 1.0);
  } else {
    // Most blocks track the live field with a lag, so the wall keeps moving.
    outColor = vec4(mix(previous.rg, fresh, 0.35), 0.0, 1.0);
  }
}
`

// Pass 2: the frontal wall, the point-cloud floor, and the haze, at screen
// resolution. It only samples the simulation, so the per-pixel cost stays low.
export const displayFragmentShader = `#version 300 es
precision highp float;

uniform sampler2D uSim;
uniform vec2 uSimSize;
uniform vec2 uResolution;
uniform float uPixelRatio;
uniform float uTime;
out vec4 outColor;

${noise}

// Energy to color: black, deep crimson, red, hot pink, then near-white at the
// peaks, with violet pulled into the midtones where the sim marks it.
vec3 ramp(float x, float violet) {
  vec3 color = vec3(0.0);
  color = mix(color, vec3(0.16, 0.005, 0.02), smoothstep(0.0, 0.18, x));
  color = mix(color, vec3(0.78, 0.02, 0.07), smoothstep(0.12, 0.5, x));
  color = mix(color, vec3(1.0, 0.22, 0.3), smoothstep(0.45, 0.78, x));
  color = mix(color, vec3(1.0, 0.86, 0.88), smoothstep(0.72, 1.05, x));
  vec3 purple = vec3(0.42, 0.08, 0.5) * smoothstep(0.02, 0.3, x);
  float midtones = smoothstep(0.05, 0.25, x) * (1.0 - smoothstep(0.45, 0.7, x));
  return mix(color, purple, violet * midtones * 0.7);
}

void main() {
  vec2 pixel = gl_FragCoord.xy;
  vec2 screen = pixel / uResolution;
  float aspect = uResolution.x / uResolution.y;
  float t = uTime;
  float stepTime = floor(t * 6.0);

  // The wall faces the camera head-on: a hard-edged band half the screen
  // tall, sitting a little below center.
  float base = 0.18;
  float top = 0.68;
  float wallHeight = top - base;
  float wallUnits = uSimSize.x / uSimSize.y;
  float wallX = (screen.x - 0.5) * aspect / wallHeight;
  float wallV = (screen.y - base) / wallHeight;
  float u = wallX / wallUnits + 0.5;

  // ---- Wall ----
  float row = floor(wallV * uSimSize.y);
  float tear = step(0.965, hash12(vec2(row * 0.37, stepTime)));
  vec2 coord = vec2(u + tear * (hash12(vec2(row, stepTime + 1.0)) - 0.5) * 0.04, min(wallV, 1.0));

  // Hairline columns, fixed in screen space like a light-field display.
  float columnWidth = max(2.0, 3.0 * uPixelRatio);
  float column = floor(pixel.x / columnWidth);
  float columnFraction = fract(pixel.x / columnWidth);
  float columnSeed = hash12(vec2(column, 7.1));
  coord.y += (columnSeed - 0.5) * 0.012;

  ivec2 nearest = ivec2(
    int(mod(floor(coord.x * uSimSize.x), uSimSize.x)),
    int(clamp(floor(coord.y * uSimSize.y), 0.0, uSimSize.y - 1.0))
  );
  vec4 block = texelFetch(uSim, nearest, 0);
  // Smeared blocks stay pixel-sharp; the rest is filtered smooth.
  vec4 sim = block.b > 0.5 ? block : textureLod(uSim, coord, 0.0);

  float profile = smoothstep(0.0, 0.4, columnFraction) * (1.0 - smoothstep(0.6, 1.0, columnFraction));
  float strand = valueNoise(vec2(column * 0.73, wallV * 14.0 + t * (0.4 + columnSeed)));
  float columns = mix(0.35, 1.0, profile) * (0.7 + 0.5 * columnSeed) * mix(0.75, 1.1, strand);
  float scanline = 0.88 + 0.12 * step(0.5, fract(wallV * uSimSize.y));
  float energy = sim.r * columns * scanline * 1.7;

  // Every so often a bright band sweeps across the wall.
  float cycle = floor(t / 9.0);
  float phase = t - cycle * 9.0;
  float bandY = 0.2 + 0.6 * hash12(vec2(cycle, 5.0));
  float envelope = smoothstep(0.0, 0.15, phase) * (1.0 - smoothstep(0.4, 1.4, phase));
  float band = (wallV - bandY) * 22.0;
  energy += exp(-band * band) * envelope * 0.55 * (0.6 + 0.4 * profile);

  // Straight cuts top and bottom.
  vec3 wall = ramp(energy, sim.g) * step(0.0, wallV) * step(wallV, 1.0);

  // ---- Floor: a sparse point cloud lit by the wall ----
  // Computed everywhere because fwidth needs uniform control flow. Depth is
  // clamped so pixels above the floor don't overflow exp() to Inf, which the
  // floor mask below would turn into NaN instead of zero.
  float horizon = base + 0.07;
  float depth = min((horizon - base) / max(horizon - screen.y, 0.001), 1.0);
  float wallDistance = 5.0 * (1.0 - depth);
  vec2 floorPoint = vec2(wallX * depth, wallDistance) / 0.012;
  vec2 cell = floor(floorPoint);
  vec2 jitter = 0.15 + 0.7 * hash22(cell);
  vec2 footprint = max(fwidth(floorPoint), vec2(0.0001));
  float pointDistance = length((fract(floorPoint) - jitter) / footprint);
  float density = 0.3 + 0.55 * exp(-wallDistance * 0.9);
  float present = step(hash12(cell + 19.7), density);
  float point = (1.0 - smoothstep(0.5 * uPixelRatio, 1.3 * uPixelRatio, pointDistance)) * present;
  // Where cells shrink under a couple of pixels, fade to their average glow.
  point = mix(point, density * 0.3, smoothstep(0.35, 0.9, max(footprint.x, footprint.y)));
  float twinkle = 0.6 + 0.4 * hash12(cell + floor(t * 2.0 + hash12(cell) * 4.0));

  float floorU = wallX * depth / wallUnits + 0.5;
  float wallLight = textureLod(uSim, vec2(floorU, 0.08), 3.0).r;
  float reflection = textureLod(uSim, vec2(floorU, clamp(wallDistance * 0.25, 0.0, 1.0)), 4.0).r;
  vec3 floorColor = ramp(0.35 + wallLight * 0.8, 0.0) * point * twinkle * exp(-wallDistance * 0.3) * 2.2;
  floorColor += ramp(reflection * 0.7, 0.0) * exp(-wallDistance * 0.8) * 0.6;
  floorColor += vec3(0.8, 0.05, 0.1) * exp(-wallDistance * 4.0) * (0.15 + wallLight * 0.5);
  floorColor *= step(wallV, 0.0);

  vec3 color = wall + floorColor;

  // Bright contact line where the wall meets the floor.
  float baseLight = textureLod(uSim, vec2(u, 0.02), 2.0).r;
  float fromBase = (screen.y - base) * uResolution.y;
  color += ramp(0.8, 0.0) * exp(-abs(fromBase) / (1.2 * uPixelRatio)) * 0.35 * baseLight;

  // Haze from a blurred mip of the sim. It spills down onto the floor but
  // stops at the top edge, so the cut stays clean against the black.
  float glow = textureLod(uSim, vec2(u, clamp(wallV, 0.0, 1.0)), 5.0).r;
  float glowFalloff = step(wallV, 1.0) * exp(-max(-wallV, 0.0) * 3.0);
  color += ramp(glow * 0.7, 0.0) * 0.28 * glowFalloff;

  // Fall off toward the corners.
  color *= mix(1.0, 0.45, smoothstep(0.35, 1.1, length((screen - 0.5) * vec2(1.0, 1.1))));

  color += vec3(0.012, 0.006, 0.008);
  color += (hash12(pixel + fract(t) * 917.0) - 0.5) * 0.025;
  outColor = vec4(max(color, 0.0), 1.0);
}
`
