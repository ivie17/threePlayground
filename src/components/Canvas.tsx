import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Box from './Box'

const Blob  = dynamic(() =>
import('./Blob').then((mod) => mod.Blob)
)

export default function CanvasSetup() {
  return (
    <Box width='100%' height='100vh'>
      <Canvas >
      <color attach="background" r={0} g={0} b={0} />
      <Suspense fallback={`Loading...`}>
        <Blob />
      </Suspense>
        <OrbitControls />
      </Canvas>
    </Box>
  )
}
