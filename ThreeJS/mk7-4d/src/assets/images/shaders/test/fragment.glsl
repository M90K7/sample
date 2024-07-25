precision mediump float;

uniform vec4 uColor;
uniform sampler2D uTexture;

varying float vRandom;
varying vec2 vUv;
varying float vZ;

        
void main() {
  // gl_FragColor = vec4(uColor.r, vRandom * 0.5 , uColor.b, 1.0);

  vec4 texttureColor = texture2D(uTexture, vUv);
  texttureColor.rgb *= vZ * 0.2 + 0.5;
  gl_FragColor = texttureColor;
}
