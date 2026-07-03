import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

function AmbientShape() {
  const meshRef = useRef<Mesh>(null);

  // Slowly rotate the shape
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Torus Knot geometry: low poly for performance */}
      <torusKnotGeometry args={[1, 0.3, 32, 8]} />
      <meshBasicMaterial
        color="#06b6d4" // Neon Cyan
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

const SkillsScene = () => {
  return (
    <div className="w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <AmbientShape />
      </Canvas>
    </div>
  );
};

export default SkillsScene;
