import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh } from 'three';

function RotatingGlassShape() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Torus knot adds a high level of premium geometric complexity */}
      <torusKnotGeometry args={[0.9, 0.28, 120, 12]} />
      {/* 
        Matches the Indigo-600 accent color (#4f46e5).
        Soft, premium reflective material that reacts cleanly to light backgrounds.
      */}
      <MeshDistortMaterial
        color="#4f46e5"
        distort={0.2}
        speed={1.5}
        roughness={0.15}
        metalness={0.8}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}

const HeroScene = () => {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px] relative select-none">
      {/* 
        Important for Mobile Responsiveness & Accessibility:
        We set touch-action: pan-y on style to allow standard vertical scrolling on touch devices,
        and use pointer-events-none on the canvas element with pointer-events-auto inside for interaction.
      */}
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.9} />
        {/* Soft white key light */}
        <directionalLight position={[8, 8, 8]} intensity={1.5} />
        {/* Subtle indigo back light */}
        <directionalLight position={[-8, -8, -8]} intensity={0.6} color="#818cf8" />
        {/* Central highlight light */}
        <pointLight position={[0, 4, 2]} intensity={0.8} color="#c7d2fe" />

        <RotatingGlassShape />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
