varying vec3 vUv;
varying float displacement;

float thresholdMin=0.05;
float thresholdMax=0.3;

void main() {
    float disp=(1. - (displacement*-5.))/3.;
vec3 color = vec3(disp);

if(disp< thresholdMin){
    color = vec3( thresholdMin);
}

if(disp>thresholdMax){
    color = vec3(disp-thresholdMax);
}

  gl_FragColor = vec4(color ,1.0);
}