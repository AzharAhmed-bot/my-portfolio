import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";

const CanvasLoader = () => (
  <mesh>
    <sphereGeometry args={[0.5, 32, 32]} />
    <meshStandardMaterial emissive="#915EFF" emissiveIntensity={1.5} />
  </mesh>
);

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 2]} intensity={1.2} color="#915EFF" />
      <directionalLight position={[-3, -2, -1]} intensity={0.6} color="#00d4ff" />
      <mesh ref={meshRef} castShadow receiveShadow scale={2.6}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#1a152e"
          metalness={0.7}
          roughness={0.2}
          envMapIntensity={0.9}
        />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1.1} map={decal} />
        {/* subtle glow halo */}
        <mesh>
          <sphereGeometry args={[1.05, 32, 32]} />
          <meshBasicMaterial color="#915EFF" transparent opacity={0.08} />
        </mesh>
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => (
  <Canvas
    frameloop="always"
    dpr={[1, 2]}
    gl={{ preserveDrawingBuffer: true }}
    camera={{ position: [0, 0, 4] }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls enableZoom={false} enablePan={false} />
      <Ball imgUrl={icon} />
    </Suspense>
    <Preload all />
  </Canvas>
);

export default BallCanvas;
