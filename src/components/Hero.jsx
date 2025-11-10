import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// Neural Network Node with activation indicator
const NeuralNode = ({ position, color, scale = 1, activated = false }) => {
  const meshRef = useRef();
  const glowRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15;
      meshRef.current.scale.setScalar(scale + pulse);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * 1.5 + Math.sin(state.clock.elapsedTime * 3 + position[0]) * 0.2);
      glowRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      {/* Main node */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={activated ? 1.2 : 0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

// Connection Line between nodes with data flow animation
const ConnectionLine = ({ start, end, progress = 1 }) => {
  const lineRef = useRef();
  const particleRef = useRef();
  
  const points = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    return [startVec, endVec];
  }, [start, end]);

  const curve = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    return new THREE.LineCurve3(startVec, endVec);
  }, [start, end]);

  useFrame((state) => {
    if (lineRef.current) {
      const pulse = (Math.sin(state.clock.elapsedTime * 3) + 1) / 2;
      lineRef.current.material.opacity = 0.2 + pulse * 0.3;
    }
    
    // Animate particle along the connection
    if (particleRef.current) {
      const t = (state.clock.elapsedTime * 0.5 + start[0] * 0.3) % 1;
      const pos = curve.getPoint(t);
      particleRef.current.position.copy(pos);
      particleRef.current.material.opacity = Math.sin(t * Math.PI) * 0.8;
    }
  });

  return (
    <group>
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#915EFF" 
          transparent 
          opacity={0.4}
          linewidth={2}
        />
      </line>
      {/* Data packet traveling along connection */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

// Main Neural Network Component
const NeuralNetwork = ({ isMobile }) => {
  const groupRef = useRef();

  // Define neural network layers with proper architecture
  const layers = useMemo(() => {
    const inputLayer = [
      [-3, 2, 0], [-3, 1, 0], [-3, 0, 0], [-3, -1, 0], [-3, -2, 0]
    ];
    const hiddenLayer1 = [
      [-1, 2.5, 0], [-1, 1.5, 0], [-1, 0.5, 0], [-1, -0.5, 0], 
      [-1, -1.5, 0], [-1, -2.5, 0], [-1, 3.5, 0], [-1, -3.5, 0]
    ];
    const hiddenLayer2 = [
      [1, 2.5, 0], [1, 1.5, 0], [1, 0.5, 0], [1, -0.5, 0], 
      [1, -1.5, 0], [1, -2.5, 0], [1, 3.5, 0], [1, -3.5, 0]
    ];
    const outputLayer = [
      [3, 1.5, 0], [3, 0, 0], [3, -1.5, 0]
    ];

    return { inputLayer, hiddenLayer1, hiddenLayer2, outputLayer };
  }, []);

  // Create all connections
  const connections = useMemo(() => {
    const conns = [];
    const { inputLayer, hiddenLayer1, hiddenLayer2, outputLayer } = layers;

    // Input to Hidden1
    inputLayer.forEach(start => {
      hiddenLayer1.forEach(end => {
        conns.push({ start, end });
      });
    });

    // Hidden1 to Hidden2
    hiddenLayer1.forEach(start => {
      hiddenLayer2.forEach(end => {
        conns.push({ start, end });
      });
    });

    // Hidden2 to Output
    hiddenLayer2.forEach(start => {
      outputLayer.forEach(end => {
        conns.push({ start, end });
      });
    });

    return conns;
  }, [layers]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const scale = isMobile ? 0.5 : 0.7;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#915EFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#ff00ff" />

      {/* Render connections */}
      {connections.map((conn, i) => (
        <ConnectionLine key={i} start={conn.start} end={conn.end} />
      ))}

      {/* Render nodes */}
      {layers.inputLayer.map((pos, i) => (
        <NeuralNode key={`input-${i}`} position={pos} color="#00d4ff" scale={0.9} />
      ))}
      {layers.hiddenLayer1.map((pos, i) => (
        <NeuralNode key={`hidden1-${i}`} position={pos} color="#915EFF" scale={1} activated={i % 2 === 0} />
      ))}
      {layers.hiddenLayer2.map((pos, i) => (
        <NeuralNode key={`hidden2-${i}`} position={pos} color="#915EFF" scale={1} activated={i % 3 === 0} />
      ))}
      {layers.outputLayer.map((pos, i) => (
        <NeuralNode key={`output-${i}`} position={pos} color="#ff00ff" scale={1.1} activated />
      ))}

      {/* Layer labels */}
      {[
        { pos: [-3, -4.5, 0], text: 'INPUT' },
        { pos: [-1, -5, 0], text: 'HIDDEN' },
        { pos: [1, -5, 0], text: 'HIDDEN' },
        { pos: [3, -4, 0], text: 'OUTPUT' }
      ].map((label, i) => (
        <mesh key={`label-${i}`} position={label.pos}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color="#915EFF" opacity={0.6} transparent />
        </mesh>
      ))}

      {/* Binary data stream particles */}
      {[...Array(25)].map((_, i) => {
        const angle = (i / 25) * Math.PI * 2;
        const radius = 6 + Math.sin(i * 0.5) * 1;
        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 1.5) * 4,
              Math.sin(angle) * 2,
            ]}
          >
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#00d4ff" : "#915EFF"} 
              emissive={i % 3 === 0 ? "#00d4ff" : "#915EFF"} 
              emissiveIntensity={0.8}
              metalness={0.5}
            />
          </mesh>
        );
      })}

      {/* AI circuit board grid background */}
      <mesh position={[0, 0, -2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[12, 12, 20, 20]} />
        <meshBasicMaterial 
          color="#915EFF" 
          wireframe 
          transparent 
          opacity={0.05}
        />
      </mesh>
    </group>
  );
};

const AICanvas = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      className="bg-transparent"
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <NeuralNetwork isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

const Hero = () => {
  const styles = {
    paddingX: "px-6 sm:px-16",
    heroHeadText: "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
    heroSubText: "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",
  };

  const techStack = [
    "AI & ML",
    "Computer Vision",
    "Full-Stack Dev",
    "Game Development"
  ];

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF] shadow-lg shadow-purple-500/50" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#915EFF] to-transparent" />
        </div>

        <div className="flex-1">
          <motion.h1 
            className={`${styles.heroHeadText}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, I'm <span className="text-[#915EFF] bg-clip-text">Azhar</span>
          </motion.h1>
          
          <motion.p 
            className={`${styles.heroSubText} mt-2`}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Software Engineer crafting <br className="sm:block hidden" />
            <span className="text-cyan-400">AI-powered solutions</span> & 
            <span className="text-purple-400"> intelligent systems</span>
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm text-gray-200 hover:bg-purple-500/20 hover:border-purple-400 transition-all cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <motion.div 
            className="flex gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a 
              href="#projects" 
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 border-2 border-purple-500 rounded-lg text-white font-medium hover:bg-purple-500/10 transition-all hover:scale-105"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* 3D Neural Network Canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <AICanvas />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-purple-500 flex justify-center items-start p-2 hover:border-cyan-400 transition-colors">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-gradient-to-b from-purple-500 to-cyan-400 mb-1 shadow-lg shadow-purple-500/50"
            />
          </div>
        </a>
      </div>

      {/* Background gradient effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
    </section>
  );
};

export default Hero;