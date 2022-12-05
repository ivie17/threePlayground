

  float time = iTime / 10.;
  // add time to the noise parameters so it's animated
  noise = 10.0 *  -.10 * turbulence( .5 * normal + time );
  float b = 5.0 * pnoise( 0.05 * position + vec3( 2.0 * time ), vec3( 100.0 ) );
  float displacement = - 0.5 * noise ;

  vec3 newPosition = position + normal * displacement;

  vec3 transformed = newPosition;

