uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uIntensity;

varying vec2 vUv;
varying float vDistort;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
	return a + b * cos(6.28318 * (c * t + d));
}

void main()	{

	float distort = vDistort * uIntensity;

	// vec3 brightness = vec3(0.5, 0.5, 0.5);
	// vec3 contrast = vec3(0.5, 0.5, 0.5);
	// vec3 oscilation = vec3(1.0, 1.0, 1.0);
	// vec3 phase = vec3(0.0, 0.1, 0.2);
	// vec3 oscilation = vec3(1.0, 0.7, 0.4);
	// vec3 phase = vec3(0.0, 0.15, 0.20);

	vec3 brightness = vec3(.1, .1, .9);
	vec3 contrast = vec3(.3, .3, .3);
	vec3 oscilation = vec3(.5, .5, .9);
	vec3 phase = vec3(.9, .1, .8);

	vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);
	// vec3 color = vec3(0.914,0.576,0.737);

	gl_FragColor = vec4(color, .2);

}