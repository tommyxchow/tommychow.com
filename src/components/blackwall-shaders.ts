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
  // Wrap with a half-cell nudge: some GPUs divide through an approximate
  // reciprocal, so mod(6.0, 6.0) can come back as 6.0 and open a seam.
  float x0 = cell.x - period * floor((cell.x + 0.5) / period);
  float x1 = cell.x + 1.0 - period * floor((cell.x + 1.5) / period);
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
uniform vec2 uSeed;
uniform float uTime;
uniform float uTick;
uniform float uReset;
out vec4 outColor;

${noise}

// Cells across the texture width. These are periods of the tiling noise, so
// they stay whole numbers.
const float CELLS = 9.0;
const float HOT_CELLS = 4.0;
const float REGION_CELLS = 6.0;
// The domain warp compounds speed through each layer, so the shapes need a
// very slow clock to morph over tens of seconds. The sideways drift is a plain
// translation and runs on its own, gentler clock.
const float MORPH_SPEED = 0.06;
const float DRIFT_SPEED = 0.03;

// R: energy, G: violet tint. The seed only ever translates the noise, which
// keeps the horizontal tiling seamless.
vec2 field(vec2 uv, float t, float drift) {
  vec2 p = vec2(uv.x * CELLS + drift, uv.y * 2.2 + uSeed.x);

  // Two rounds of domain warping give the slow, storm-like shapes.
  vec2 q = vec2(
    fbm(p + vec2(0.0, t * 0.06), CELLS, 3),
    fbm(p + vec2(3.1, 7.4 - t * 0.05), CELLS, 3)
  );
  vec2 r = vec2(
    fbm(p + 3.0 * q + vec2(1.7, 9.2 + t * 0.08), CELLS, 3),
    fbm(p + 3.0 * q + vec2(8.3, 2.8 - t * 0.07), CELLS, 3)
  );
  float f = fbm(p + 3.0 * r, CELLS, 4);

  float lit = smoothstep(0.32, 0.68, f);
  float hot = smoothstep(0.56, 0.82, fbm(vec2(uv.x * HOT_CELLS + t * 0.03, uv.y * 1.3 - t * 0.02 + uSeed.y), HOT_CELLS, 3));
  float region = 0.55 + 0.45 * periodicNoise(vec2(uv.x * REGION_CELLS, t * 0.04 + uSeed.y), REGION_CELLS);

  float energy = ((0.04 + 0.52 * lit) + hot * 0.42 * lit) * region;
  float violet = smoothstep(0.45, 0.85, q.y) * (1.0 - hot);
  return vec2(energy, violet);
}

void main() {
  vec2 texel = floor(gl_FragCoord.xy);
  vec2 uv = (texel + 0.5) / uSimSize;
  vec2 block = floor(texel / 8.0);
  vec2 blocks = uSimSize / 8.0;

  float blockSeed = hash12(block + uSeed + 0.37);
  float epochLength = 10.0 + floor(blockSeed * 24.0);
  float epoch = floor((uTick + blockSeed * 97.0) / epochLength);
  float roll = hash12(vec2(block.x + epoch * 3.17, block.y - epoch * 1.63) + uSeed);
  float crispRoll = hash12(vec2(block.y + epoch * 2.31, block.x + 11.0) + uSeed);

  vec2 fresh = field(uv, uTime * MORPH_SPEED, uTime * DRIFT_SPEED);
  if (uReset > 0.5) {
    outColor = vec4(fresh, step(0.7, crispRoll), 1.0);
    return;
  }

  // Neighbouring blocks share motion, the way real P-frame smear drifts in sheets.
  float motionPeriod = 8.0;
  vec2 motionCoord = vec2(block.x / blocks.x * motionPeriod, block.y * 0.25 + epoch * 0.05 + uSeed.x);
  vec2 flow = vec2(
    periodicNoise(motionCoord, motionPeriod),
    periodicNoise(motionCoord + vec2(0.0, 41.0), motionPeriod)
  );
  vec2 motion = floor((flow - 0.5) * vec2(4.0, 2.0) + 0.5);
  if (hash12(block + epoch + uSeed) > 0.5) motion.y = 0.0;
  // Step the smear every fourth tick so trails creep instead of streak.
  if (mod(uTick + floor(blockSeed * 4.0), 4.0) >= 1.0) motion = vec2(0.0);

  // Rare horizontal tears drag a few rows sideways.
  float tearRow = floor(texel.y / 4.0);
  float tear = step(0.996, hash12(vec2(tearRow, floor(uTick / 6.0)) + uSeed));
  motion.x += tear * (hash12(vec2(tearRow, uTick) + uSeed) > 0.5 ? 4.0 : -4.0);

  vec4 previous = texelFetch(uPrevious, ivec2(texel), 0);
  ivec2 source = ivec2(
    // The half-texel nudge keeps an inexact mod from landing on the width.
    int(mod(texel.x - motion.x + 0.5, uSimSize.x)),
    int(clamp(texel.y - motion.y, 0.0, uSimSize.y - 1.0))
  );
  vec4 moved = texelFetch(uPrevious, source, 0);

  if (roll < 0.05) {
    outColor = vec4(fresh, step(0.7, crispRoll), 1.0);
  } else if (roll < 0.2 || tear > 0.5) {
    outColor = vec4(mix(moved.rg, fresh, 0.06), 1.0, 1.0);
  } else {
    // Most blocks track the live field with a long lag.
    outColor = vec4(mix(previous.rg, fresh, 0.18), 0.0, 1.0);
  }
}
`

// Pass 2: the wall as a grid of LED cells, the storm, and the dark floor,
// at screen resolution. It only samples the simulation, so the per-pixel cost
// stays low.
export const displayFragmentShader = `#version 300 es
precision highp float;

uniform sampler2D uSim;
uniform vec2 uSimSize;
uniform vec2 uResolution;
uniform vec2 uSeed;
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

// Lightning in the storm. Three overlapping clocks of different lengths each
// may fire one strike per slot at a random time and place, so strikes land
// irregularly and never repeat in step. p is in wall units: x across the
// screen, y up the wall.
float storm(vec2 p, float t, float halfWidth) {
  float total = 0.0;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float slotLength = 2.7 + fi * 1.3;
    float shifted = t + uSeed.x * (fi + 1.0) * 3.7;
    float slot = floor(shifted / slotLength);
    vec2 timing = hash22(vec2(slot + fi * 17.0, uSeed.y + fi * 5.3));
    // Most slots stay quiet.
    if (timing.x > 0.4) continue;

    float since = shifted - (slot + timing.y * 0.5) * slotLength;
    if (since < 0.0 || since > 2.5) continue;

    vec2 place = hash22(vec2(slot * 1.7 + 3.1, fi * 11.0 + uSeed.x));
    vec2 center = vec2((place.x - 0.5) * 1.8 * halfWidth, 0.15 + 0.75 * place.y);
    float radius = 0.08 + 0.22 * hash12(vec2(slot, fi + 7.0 + uSeed.x));
    vec2 offset = (p - center) / vec2(radius * 1.6, radius);
    float shape = exp(-dot(offset, offset));

    // A first flash, then one or two dimmer re-strikes, then a slow afterglow.
    float restrike = hash12(vec2(slot + 2.0, fi + uSeed.y));
    float second = 0.3 + restrike * 0.2;
    float envelope = exp(-since * 7.0)
      + step(0.12, since) * exp(-max(since - 0.12, 0.0) * 9.0) * 0.7
      + step(second, since) * step(0.4, restrike) * exp(-max(since - second, 0.0) * 5.0) * 0.45
      + exp(-since * 2.5) * 0.1;
    float strength = 0.5 + 0.7 * hash12(vec2(slot * 3.3, fi + 1.0 + uSeed.y));
    total += shape * envelope * strength;
  }
  return total;
}

void main() {
  vec2 pixel = gl_FragCoord.xy;
  vec2 screen = pixel / uResolution;
  float aspect = uResolution.x / uResolution.y;
  float t = uTime;
  float stepTime = floor(t * 2.0);

  // The wall faces the camera head-on: a band half the screen tall, sitting a
  // little below center.
  float base = 0.18;
  float top = 0.68;
  float wallHeight = top - base;
  float halfWidth = 0.5 * aspect / wallHeight;
  float wallUnits = uSimSize.x / uSimSize.y;
  float wallX = (screen.x - 0.5) * aspect / wallHeight;
  float wallV = (screen.y - base) / wallHeight;
  float u = wallX / wallUnits + 0.5;

  // ---- Wall: a grid of LED cells strung on swaying strings ----
  // A slow wave bends the strings, and its amplitude changes smoothly across
  // the screen so neighbouring strings sway together instead of crossing.
  float across = pixel.x / uResolution.y;
  float swayAmount = valueNoise(vec2(across * 3.0 + uSeed.x, t * 0.08)) - 0.35;
  float sway = max(swayAmount, 0.0) * 14.0 * uPixelRatio
    * sin(wallV * 3.5 - t * 0.55 + across * 2.0 + uSeed.y);

  float cellSize = max(2.0, 3.0 * uPixelRatio);
  float columnPosition = (pixel.x + sway) / cellSize;
  float column = floor(columnPosition);
  float columnFraction = fract(columnPosition);
  float rowIndex = floor(pixel.y / cellSize);
  float rowFraction = fract(pixel.y / cellSize);
  float columnSeed = hash12(vec2(column, 7.1) + uSeed);

  // Every pixel in a cell samples the cell's center, which pixelates the
  // content into LED dots.
  float cellX = (((column + 0.5) * cellSize - sway) / uResolution.x - 0.5) * aspect / wallHeight;
  float cellV = ((rowIndex + 0.5) * cellSize / uResolution.y - base) / wallHeight;
  vec2 coord = vec2(cellX / wallUnits + 0.5, clamp(cellV, 0.0, 1.0));

  float row = floor(cellV * uSimSize.y);
  float tear = step(0.997, hash12(vec2(row * 0.37, stepTime) + uSeed));
  coord.x += tear * (hash12(vec2(row, stepTime + 1.0) + uSeed) - 0.5) * 0.015;
  coord.y = clamp(coord.y + (columnSeed - 0.5) * 0.006, 0.0, 1.0);

  ivec2 nearest = ivec2(
    int(mod(floor(coord.x * uSimSize.x) + 0.5, uSimSize.x)),
    int(clamp(floor(coord.y * uSimSize.y), 0.0, uSimSize.y - 1.0))
  );
  float blocky = texelFetch(uSim, nearest, 0).b;
  // Smeared regions snap to 8-texel macroblocks, like broken video.
  vec2 macroblock = (floor(coord * uSimSize / 8.0) + 0.5) * 8.0 / uSimSize;
  vec4 sim = textureLod(uSim, blocky > 0.5 ? macroblock : coord, 0.0);

  float columnProfile = smoothstep(0.0, 0.35, columnFraction) * (1.0 - smoothstep(0.65, 1.0, columnFraction));
  float rowProfile = smoothstep(0.0, 0.3, rowFraction) * (1.0 - smoothstep(0.7, 1.0, rowFraction));
  float strand = valueNoise(vec2(column * 0.73, cellV * 5.0 - t * (0.15 + 0.25 * columnSeed)) + uSeed);
  // A few strings at a time slowly brighten, as if plucked.
  float pluck = smoothstep(0.6, 0.95, valueNoise(vec2(column * 0.21, t * 0.25) + uSeed));
  float strings = (0.65 + 0.6 * columnSeed) * mix(0.55, 1.25, strand) * (1.0 + pluck * 0.6);
  float energy = sim.r * strings * 1.5;

  // Every so often a soft band of light swells and fades across the wall, at
  // random times.
  float bandSlot = floor(t / 11.0 + uSeed.x);
  vec2 bandRoll = hash22(vec2(bandSlot, 5.0) + uSeed);
  float bandAge = clamp(t - (bandSlot - uSeed.x + bandRoll.x * 0.4) * 11.0, 0.0, 11.0);
  float envelope = step(bandRoll.y, 0.6) * smoothstep(0.0, 1.5, bandAge) * (1.0 - smoothstep(2.5, 5.0, bandAge));
  float band = (cellV - (0.2 + 0.6 * hash12(vec2(bandSlot, 9.0) + uSeed))) * 10.0;
  energy += exp(-band * band) * envelope * 0.3;

  // Lightning lights the storm shapes from inside, so it follows the clouds
  // instead of sitting on top as a flat glow.
  float burst = storm(vec2(cellX, cellV), t, halfWidth);
  energy += burst * (0.1 + sim.r * 1.2);

  vec3 wallColor = ramp(energy, sim.g);
  // Bright strikes split the color channels and burn toward a cold white core.
  float split = smoothstep(0.3, 1.2, burst);
  if (split > 0.01) {
    vec2 shift = vec2(split * 2.0 * cellSize / (wallHeight * wallUnits * uResolution.y), 0.0);
    float red = textureLod(uSim, coord + shift, 0.0).r;
    float blue = textureLod(uSim, coord - shift, 0.0).r;
    wallColor.r = ramp(energy + (red - sim.r) * 2.0 * split, sim.g).r;
    wallColor.b = ramp(energy + (blue - sim.r) * 2.0 * split, sim.g).b;
  }
  float core = smoothstep(0.8, 1.6, burst * (0.3 + sim.r));
  wallColor = mix(wallColor, vec3(0.85, 0.93, 1.0), core * 0.5);

  // Bright string cores, with faint scanlines between rows.
  wallColor *= mix(0.2, 1.0, columnProfile) * mix(0.8, 1.0, rowProfile);
  vec3 wall = wallColor * step(0.0, wallV) * step(wallV, 1.0);

  // ---- Floor: dark, with dust points and a soft glow lit by the wall ----
  // Computed everywhere because fwidth needs uniform control flow. Depth is
  // clamped so pixels above the floor don't overflow exp() to Inf, which the
  // floor mask below would turn into NaN instead of zero.
  float horizon = base + 0.07;
  float depth = min((horizon - base) / max(horizon - screen.y, 0.001), 1.0);
  float wallDistance = 5.0 * (1.0 - depth);
  vec2 floorPoint = vec2(wallX * depth, wallDistance) / 0.012 + uSeed;
  vec2 cell = floor(floorPoint);
  vec2 jitter = 0.15 + 0.7 * hash22(cell);
  vec2 footprint = max(fwidth(floorPoint), vec2(0.0001));
  float pointDistance = length((fract(floorPoint) - jitter) / footprint);
  float density = 0.3 + 0.55 * exp(-wallDistance * 0.9);
  float present = step(hash12(cell + 19.7), density);
  float point = (1.0 - smoothstep(0.5 * uPixelRatio, 1.3 * uPixelRatio, pointDistance)) * present;
  // Where cells shrink under a couple of pixels, fade to the points' average
  // coverage so the far floor doesn't turn into a brighter band.
  float coverage = density * min(2.0 * footprint.x * footprint.y, 0.3);
  point = mix(point, coverage, smoothstep(0.3, 1.0, max(footprint.x, footprint.y)));
  float twinkle = 0.6 + 0.4 * hash12(cell + floor(t * 0.5 + hash12(cell) * 4.0));

  float floorU = wallX * depth / wallUnits + 0.5;
  float wallLight = textureLod(uSim, vec2(floorU, 0.08), 3.0).r;
  float spill = textureLod(uSim, vec2(floorU, clamp(wallDistance * 0.25, 0.0, 1.0)), 4.0).r;
  vec3 floorColor = ramp(0.3 + wallLight * 0.6, 0.0) * point * twinkle * exp(-wallDistance * 0.5);
  floorColor += ramp(spill * 0.5, 0.0) * exp(-wallDistance * 1.4) * 0.35;
  floorColor += vec3(0.8, 0.05, 0.1) * exp(-wallDistance * 5.0) * (0.08 + wallLight * 0.3);
  // Fade the floor out toward the bottom of the screen.
  floorColor *= step(wallV, 0.0) * mix(0.2, 1.0, smoothstep(0.0, base, screen.y));

  // ---- Ceiling: the floor's soft glow mirrored above the top edge ----
  float aboveTop = max(screen.y - top, 0.0);
  float ceilingDepth = (horizon - base) / (horizon - base + aboveTop);
  float ceilingDistance = 5.0 * (1.0 - ceilingDepth);
  float ceilingU = wallX * ceilingDepth / wallUnits + 0.5;
  float topLight = textureLod(uSim, vec2(ceilingU, 0.92), 3.0).r;
  float ceilingSpill = textureLod(uSim, vec2(ceilingU, clamp(1.0 - ceilingDistance * 0.25, 0.0, 1.0)), 4.0).r;
  vec3 ceilingColor = ramp(ceilingSpill * 0.5, 0.0) * exp(-ceilingDistance * 1.4) * 0.35;
  ceilingColor += vec3(0.8, 0.05, 0.1) * exp(-ceilingDistance * 5.0) * (0.08 + topLight * 0.3);
  ceilingColor *= step(1.0, wallV) * mix(0.2, 1.0, 1.0 - smoothstep(top, 1.0, screen.y));

  vec3 color = wall + floorColor + ceilingColor;

  // Bright lines along both edges of the wall.
  float baseLight = textureLod(uSim, vec2(u, 0.02), 2.0).r;
  float fromBase = (screen.y - base) * uResolution.y;
  color += ramp(0.8, 0.0) * exp(-abs(fromBase) / (1.2 * uPixelRatio)) * 0.35 * baseLight;
  float topEdgeLight = textureLod(uSim, vec2(u, 0.98), 2.0).r;
  float fromTop = (screen.y - top) * uResolution.y;
  color += ramp(0.8, 0.0) * exp(-abs(fromTop) / (1.2 * uPixelRatio)) * 0.35 * topEdgeLight;

  // Haze from a blurred mip of the sim, spilling softly past both edges.
  float glow = textureLod(uSim, vec2(u, clamp(wallV, 0.0, 1.0)), 5.0).r;
  float glowFalloff = exp(-max(-wallV, 0.0) * 6.0) * exp(-max(wallV - 1.0, 0.0) * 6.0);
  color += ramp(glow * 0.7, 0.0) * 0.28 * glowFalloff;

  // Fall off toward the corners.
  color *= mix(1.0, 0.45, smoothstep(0.35, 1.1, length((screen - 0.5) * vec2(1.0, 1.1))));

  color += vec3(0.012, 0.006, 0.008);
  color += (hash12(pixel + fract(t) * 917.0) - 0.5) * 0.025;
  outColor = vec4(max(color, 0.0), 1.0);
}
`
