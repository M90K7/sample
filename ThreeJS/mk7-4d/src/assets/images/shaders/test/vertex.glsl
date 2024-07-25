uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

attribute float aRandom;
attribute vec2 uv;
uniform vec2 uFrequency;
uniform float uTime;


varying float vRandom;
varying vec2 vUv;
varying float vZ;
 
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // modelPosition.z += sin(modelPosition.x * 10.0) * 0.5;
  // modelPosition.z += aRandom * 0.7;

  modelPosition.z += (sin(modelPosition.x * uFrequency.x + (uTime * 0.5)) * 0.15) + (sin(modelPosition.y * uFrequency.y + (uTime * 0.5)) * 0.15);

  vec4 viewPosition = viewMatrix * modelPosition;

  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vRandom = aRandom;
  vUv = uv;
  vZ = modelPosition.z;
}