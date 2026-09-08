export const blackwallVertexShader = `#version 300 es
in vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

export const blackwallFragmentShader = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uPulse;
uniform vec3 uBaseColor;
uniform vec3 uSignalColor;
out vec4 outColor;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 cell = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(cell), hash(cell + vec2(1.0, 0.0)), f.x),
             mix(hash(cell + vec2(0.0, 1.0)), hash(cell + 1.0), f.x), f.y);
}

// Filter the procedural grid in screen space so distant lines don't shimmer.
float gridLine(float coordinate, float width) {
  float footprint = max(fwidth(coordinate), 0.001);
  float distanceToLine = abs(fract(coordinate - 0.5) - 0.5);
  float line = 1.0 - smoothstep(width, width + footprint, distanceToLine);
  return line * (1.0 - smoothstep(0.35, 1.5, footprint));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 screen = (uv - 0.5) * vec2(aspect, 1.0);
  float time = uTime;

  // Ray/plane intersections give a real perspective wall and floor without
  // a mesh, ray marching, textures, or a post-processing pipeline.
  float yaw = mix(0.13, 0.46, smoothstep(0.5, 1.65, aspect));
  vec3 forward = vec3(-sin(yaw), 0.0, -cos(yaw));
  vec3 right = vec3(cos(yaw), 0.0, -sin(yaw));
  vec3 ray = forward * 1.2 + right * screen.x + vec3(0.0, screen.y + 0.09, 0.0);
  vec3 origin = vec3(0.0, 1.35, 0.0);
  float wallDistance = ray.x < -0.001 ? -2.4 / ray.x : 10000.0;
  float floorDistance = ray.y < -0.001 ? -origin.y / ray.y : 10000.0;

  vec2 pointerDelta = (uv - uPointer) * vec2(aspect, 1.0);
  float presence = exp(-dot(pointerDelta, pointerDelta) * 16.0);
  float pulseAge = time - uPulse.z;
  float pulseDistance = length((uv - uPulse.xy) * vec2(aspect, 1.0));
  float pulse = exp(-pow((pulseDistance - pulseAge * 0.24) * 22.0, 2.0))
    * max(0.0, 1.0 - pulseAge / 3.0) * step(0.0, pulseAge);

  float signal = 0.0;
  float atmosphere = 0.0;

  if (wallDistance < floorDistance && wallDistance < 100.0) {
    vec3 hit = origin + ray * wallDistance;
    vec2 wall = vec2(-hit.z, hit.y);
    float depthFade = exp(-wallDistance * 0.032);

    // Broad, coherent disturbances travel through the fine signal columns.
    float swell = noise(wall * vec2(0.26, 0.36) + vec2(-time * 0.075, time * 0.025));
    float tendril = sin(wall.y * 1.25 + wall.x * 0.45 - time * 0.35);
    wall.x += (swell - 0.5) * 0.7 + tendril * 0.1;
    wall.y += sin(wall.x * 0.6 + time * 0.2) * 0.08;
    wall.x += presence * sin(wall.y * 2.0 - time) * 0.045 + pulse * 0.055;

    float column = floor(wall.x * 13.0);
    float seed = hash(vec2(column, 4.0));
    float flow = wall.y * 8.0 + time * (0.5 + seed * 1.5);
    vec2 cell = vec2(column, floor(flow));
    float data = hash(cell);
    float thread = gridLine(wall.x * 13.0, 0.035);
    float packet = gridLine(flow, 0.12);
    float broken = smoothstep(0.36, 0.8, noise(vec2(column * 0.7, flow * 0.18)));

    float activity = noise(wall * vec2(0.5, 0.7) + vec2(time * 0.12, -time * 0.1));
    float hot = smoothstep(0.5, 0.85, activity + swell * 0.22);
    float stream = pow(0.5 + 0.5 * sin(wall.y * 1.8 - wall.x * 0.65 + time * 0.65), 12.0);
    float filaments = thread * (0.07 + broken * 0.24 + hot * 0.85);
    float pixels = thread * packet * step(0.46, data) * (0.32 + hot * 1.9);
    float fine = gridLine(wall.x * 39.0, 0.022) * gridLine(wall.y * 25.0, 0.1);
    signal = (filaments + pixels + fine * hot * 0.3 + thread * stream * 0.5) * depthFade;
    signal *= 0.8 + presence * 0.35 + pulse * 1.8;
    atmosphere = (hot * 0.055 + stream * 0.018) * depthFade;

    // A dim contact glow anchors the wall to the dotted ground plane.
    signal += exp(-hit.y * 28.0) * depthFade * 0.18;
  } else if (floorDistance < 75.0) {
    vec3 hit = origin + ray * floorDistance;
    vec2 floorGrid = hit.xz * 5.5;
    float dots = gridLine(floorGrid.x, 0.055) * gridLine(floorGrid.y, 0.055);
    float data = hash(floor(floorGrid));
    float wave = 0.5 + 0.5 * sin(hit.z * 0.65 + hit.x * 0.9 + time * 0.45);
    float wallGlow = exp(-abs(hit.x + 2.4) * 0.6);
    signal = dots * step(0.3, data) * (0.08 + wave * 0.25 + wallGlow * 0.15);
    signal *= exp(-floorDistance * 0.045) * (1.0 + pulse);
    atmosphere = wallGlow * exp(-floorDistance * 0.08) * 0.012;
  }

  // Keep the portfolio's central reading area quiet without flattening depth.
  float readingArea = exp(-pow((uv.x - 0.5) * 4.0, 4.0))
    * (0.65 + 0.35 * exp(-pow((uv.y - 0.5) * 2.7, 4.0)));
  float vignette = 1.0 - smoothstep(0.3, 0.8, length((uv - 0.5) * vec2(0.85, 1.0)));
  float exposure = mix(1.0, 0.16, readingArea) * mix(0.25, 1.0, vignette);
  vec3 color = uBaseColor + uSignalColor * (signal * 0.78 + atmosphere) * exposure;
  color += uSignalColor * vec3(1.0, 0.4, 0.4) * pow(max(signal - 0.65, 0.0), 2.0) * 0.12 * exposure;
  outColor = vec4(color, 1.0);
}
`
