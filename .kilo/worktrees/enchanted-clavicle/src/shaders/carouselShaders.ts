export const vertexShader = `
uniform float uSpeed;
uniform float uTime;
varying vec2 vUv;

#define PI 3.141592653

void main() {
  vec3 pos = position;
  vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

  // 1. Vertical oscillation based on world X position and time
  float yDisplacement = 0.05 * sin(0.5 * worldPosition.x + uTime);
  pos.y += yDisplacement;
  pos.y -= 0.05;

  // 2. Horizontal oscillation using a slower time offset
  float xDisplacement = 0.05 * sin(0.5 * worldPosition.y + uTime + PI / 2.0);
  pos.x += xDisplacement;
  pos.x -= 0.05;

  // 3. Velocity-based stretch in Y
  float bendFactor = 0.3 * uSpeed;
  float yBend = bendFactor * cos(worldPosition.x * 2.0);
  pos.y += yBend;
  pos.y -= bendFactor;

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
  gl_FragColor = texture2D(uTexture, uv * uUvScale);
}
`;
