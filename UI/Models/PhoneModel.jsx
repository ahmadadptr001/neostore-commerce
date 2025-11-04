'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/phone.glb'); // simpan model.glb di /public/models
  return <primitive object={scene} scale={1.5} />;
}

export default function PhoneModel() {
  return (
    <div className="w-auto h-auto">
      <Canvas camera={{ position: [0, 1, -2], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Model />
        <OrbitControls enableZoom autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
