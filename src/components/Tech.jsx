


// src/sections/Tech.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { MonitorSmartphone } from "lucide-react";
import { technologies } from "../constants";


const TechIcon = ({ icon, name, index }) => {
  const ref = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative w-32 h-32"
      >
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 to-cyan-600/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Octagonal Frame */}
        <div className="relative w-full h-full bg-gray-900/80 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-purple-500/20">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/10 to-cyan-600/10 opacity-50" />
          
          {/* Inner Glow Ring */}
          <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-md" />
          
          {/* Icon Container */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
            <motion.img
              src={icon}
              alt={name}
              className="w-16 h-16 object-contain drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
            />
          </div>
        </div>

        {/* Floating Particles on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              initial={{ x: 64, y: 64 }}
              animate={{
                x: [64, 64 + (Math.random() - 0.5) * 100],
                y: [64, 64 + (Math.random() - 0.5) * 100],
                opacity: [1, 0],
              }}
              transition={{ duration: 1.2, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      </motion.div>

      <p className="text-center text-gray-300 text-sm mt-4 font-medium tracking-wide">
        {name}
      </p>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <section
      id="tech"
      className="relative w-full min-h-screen py-24 px-6 sm:px-16 bg-gradient-to-b from-gray-900 via-purple-900/10 to-black overflow-hidden"
    >
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-purple-400 text-lg uppercase tracking-widest font-semibold">
            My Arsenal
          </p>
          <h2 className="text-white font-black text-5xl sm:text-7xl lg:text-8xl mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Technologies I Master
          </h2>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            From neural networks to real-time 3D rendering — I build intelligent, scalable, and beautiful systems.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="mt-20 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-10 justify-center">
          {technologies.map((tech, index) => (
            <TechIcon key={tech.name} icon={tech.icon} name={tech.name} index={index} />
          ))}
        </div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center mt-24 text-center"
        >
          <MonitorSmartphone className="w-10 h-10 text-cyan-400 mb-4" />
          <p className="text-gray-300 text-lg font-medium">
            Building the future of AI, one line of code at a time
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Kenya | Nairobi | Always learning, always building
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Tech;