'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/laptop.glb') // simpan model.glb di /public/models
  return <primitive object={scene} scale={1.5} />
}

export default function LaptopModel() {
  return (
    <div className="w-full h-[400px] md:h-[500px] bg-gray-900 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Model />
        <OrbitControls enableZoom autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  )
}
