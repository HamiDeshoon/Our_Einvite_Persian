export const vertexShader = `
uniform float uSpeed;
uniform float uTime;
varying vec2 vUv;

#define PI 3.141592653

void main() {
  vec3 pos = position;
  vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  // Wave distortion based on time
  float waveX = sin(worldPosition.y * 2.0 + uTime * 2.0) * 0.08;
  float waveY = sin(worldPosition.x * 2.0 + uTime * 1.5) * 0.08;
  pos.x += waveX * (1.0 + abs(uSpeed) * 0.5);
  pos.y += waveY * (1.0 + abs(uSpeed) * 0.5);

  // Subtle rotation based on speed
  float rotation = uSpeed * 0.002;
  pos.x = pos.x * cos(rotation) - pos.y * sin(rotation);
  pos.y = pos.x * sin(rotation) + pos.y * cos(rotation);

  // Vertical float effect
  pos.z += sin(uTime * 0.5 + worldPosition.x) * 0.02;

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uContainerResolution;
uniform vec2 uUvScale;
varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min((uContainerResolution.x / uContainerResolution.y) / (uResolution.x / uResolution.y), 1.0),
    min((uContainerResolution.y / uContainerResolution.x) / (uResolution.y / uResolution.x), 1.0)
  );
  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
  vec4 color = texture2D(uTexture, uv * uUvScale);
  
  // Film-like desaturation on darker areas
  float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  vec3 desaturated = mix(color.rgb, vec3(luminance), 0.3);
  color.rgb = desaturated;
  
  // Subtle warm tone overlay
  color.rgb = mix(color.rgb, color.rgb * vec3(1.0, 0.95, 0.9), 0.15);
  
  gl_FragColor = color;
}
`;