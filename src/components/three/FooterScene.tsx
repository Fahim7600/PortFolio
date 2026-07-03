import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

function AmbientShape() {
  const meshRef = useRef<Mesh>(null);

  // Slowly rotate the wireframe icosahedron
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.08;
      meshRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Low-poly icosahedron for extremely lightweight footprint */}
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial
        color="#4f46e5"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

const FooterScene = () => {
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

export default FooterScene;
