import {
  Clock,
  Color,
  DirectionalLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  ShaderMaterial,
  SphereGeometry,
  SpotLight,
  Vector3
} from 'three'
// @ts-ignore
import vert from '!raw-loader!../shaders/terrain/terrain.vert'
// @ts-ignore
import commonNoise from '!raw-loader!../shaders/terrain/terrainCommon.vert'
// @ts-ignore
import vertFull from '!raw-loader!../shaders/terrain/terrainVertFull.vert'
// @ts-ignore
import frag from '!raw-loader!../shaders/terrain/terrain.frag'

import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

// import img from '../assets/matcap-1.png'
import { getTexture } from '../utils/getTexture'
import { useTexture } from '@react-three/drei'
import { SubsurfaceScatteringShader } from 'three/examples/jsm/shaders/SubsurfaceScatteringShader'

const clock = new Clock()
const uniforms = { iTime: { value: clock.elapsedTime } }

// const material = new MeshMatcapMaterial();
const material = new MeshPhongMaterial({
  color: '#222222',
  shininess: 0,
  fog: true,
  emissive: '#000000',
  reflectivity: 0,
  specular: 0
})

material.onBeforeCompile = function (info: any) {
  info.vertexShader = info.vertexShader
    .replace('#include <begin_vertex>', vert)
    .replace(
      '#include <common>',
      `
     #include <common>
     uniform float iTime;
  ` + commonNoise
    )
  info.diffuseColor = new Vector3(1, 1, 1)
  info.uniforms.iTime = uniforms.iTime
}

// SubsurfaceScatteringShader.vertexShader=SubsurfaceScatteringShader.vertexShader.replace('#include <begin_vertex>',vert).replace('#include <common>', `
//       #include <common>
//       uniform float iTime;
//    `+commonNoise)
// info.diffuseColor=new Vector3(1,1,1)
// info.uniforms.iTime=uniforms.iTime
// }

export function Blob() {
  const mesh = useRef<any>()
  const spotLight = useRef<SpotLight>(null)
  const dLight = useRef<DirectionalLight>(null)
  // const texture=useTexture(img.src)

  useFrame((state) => {
    if (mesh.current) {
      spotLight.current?.lookAt(mesh.current.position)
    }
    if (spotLight.current) {
      spotLight.current.shadow.camera.near = 500
      spotLight.current.shadow.camera.far = 4000
      // spotLight.current.shadow.camera.fov = 30
    }

    // console.log(mesh.current)
    uniforms.iTime.value = state.clock.getElapsedTime()
    //     const geometry=mesh.current.geometry

    //     if(!geometry) return
    //     geometry.vertices.forEach(function (v:any) {
    //       let time = Date.now();
    //       v.normalize();
    //       let distance = geometry.parameters.radius + noise(
    //           v.x + time * 0.0005,
    //           v.y + time * 0.0003,
    //           v.z + time * 0.0008
    //       ) * blobScale;
    //       v.multiplyScalar(distance);
    //   })
    //  geometry.verticesNeedUpdate = true;
    // geometry.normalsNeedUpdate = true;
    // geometry.computeVertexNormals();
    //  geometry.computeFaceNormals();
    //  rotation.y += 0.002;
  })

  // useEffect(()=>{
  //   material.matcap=texture
  // },[texture])

  return (
    <>
      <spotLight
        ref={spotLight}
        position={[-5, 10, -50]}
        intensity={10}
        color='#ffff00'
        castShadow={true}
        angle={(Math.PI * 3) / 5}
        decay={0}></spotLight>
      <directionalLight
        ref={dLight}
        position={[5, 0, 0]}
        intensity={1}
        color='#0000ff'></directionalLight>
      <ambientLight color='#ffffff' />
      <mesh
        ref={mesh}
        material={material}
        receiveShadow={true}
        castShadow={true}>
        <sphereGeometry
        attach="geometry"
        args={[1,90,90]}
          // parameters={{
          //   radius: 10,
          //   widthSegments: 1,
          //   heightSegments: 1,
          //   phiStart: 0,
          //   phiLength: 2 * Math.PI,
          //   thetaStart: 0,
          //   thetaLength: 2 * Math.PI
          // }}
        />
        {/* <meshBasicMaterial color='blue'/> */}
        {/* <meshPhongMaterial color='#cccccc'/> */}
        <shaderMaterial vertexShader={vertFull} fragmentShader={frag} uniforms={uniforms}/>
        {/* <shaderMaterial vertexShader={SubsurfaceScatteringShader.vertexShader} fragmentShader={SubsurfaceScatteringShader.fragmentShader} uniforms={uniforms}/> */}
      </mesh>
    </>
  )
}
