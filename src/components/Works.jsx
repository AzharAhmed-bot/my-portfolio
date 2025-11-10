"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { SectionWrapper } from "../hoc";

const projects = [
  {
    name: "Sqooli Partner Platform",
    description:
      "Developed a comprehensive partner management and revenue tracking platform for Sqooli's educational programs. Features campaign attribution, automated revenue distribution, M-PESA integration, and real-time performance dashboards.",
    tags: [
      { name: "Next.js", color: "text-purple-400" },
      { name: "Convex", color: "text-cyan-400" },
      { name: "M-PESA API", color: "text-green-400" },
      { name: "TypeScript", color: "text-blue-400" },
    ],
    image: "/projects/sqooli.png",
    source_code_link: "",
    live_demo: "https://sqooli.org",
  },
  {
    name: "Compass Calendar UX",
    description:
      "Designed the user experience for a minimalist calendar website using Figma. Focused on clean layout, intuitive navigation, and visual hierarchy to ensure seamless project understanding for the team.",
    tags: [
      { name: "Figma", color: "text-purple-400" },
      { name: "UX Design", color: "text-pink-400" },
      { name: "Prototyping", color: "text-cyan-400" },
    ],
    image: "/projects/compass.png",
    source_code_link: "",
    live_demo: "https://www.compasscalendar.com/",
  },
  {
    name: "Conventional Workout & Nutrition Fitness AI",
    description:
      "Integrated reasoning agents and voice interaction to mimic the adaptability of human trainers. Dynamically adjusts routines based on user feedback, schedules, and biometric data.",
    tags: [
      { name: "React", color: "text-cyan-400" },
      { name: "ConvexDB", color: "text-purple-400" },
      { name: "LangChain", color: "text-green-400" },
      { name: "Voice AI", color: "text-yellow-400" },
    ],
    image: "/projects/fitness-ai.png",
    source_code_link: "",
    live_demo: "",
  },
  {
    name: "Quantum Encrypted Chat Application",
    description:
      "Designed a secure chat platform to address the vulnerability of conventional messaging apps. Implemented end-to-end encryption using the NTRU algorithm for long-term protection against quantum attacks.",
    tags: [
      { name: "React", color: "text-cyan-400" },
      { name: "NTRU Crypto", color: "text-purple-400" },
      { name: "Cryptography", color: "text-red-400" },
    ],
    image: "/projects/quantum-chat.png",
    source_code_link: "https://github.com/AzharAhmed-bot/chit-chat",
    live_demo: "",
  },
  {
    name: "Air Quality Monitoring App",
    description:
      "Developed a real-time environmental monitoring application visualizing air quality data across Africa with focus on Kenya's sensor network. Created interactive maps with custom markers showing sensor locations and readings.",
    tags: [
      { name: "React", color: "text-cyan-400" },
      { name: "Google Maps API", color: "text-green-400" },
      { name: "Sensors.Africa", color: "text-purple-400" },
      { name: "DataViz", color: "text-yellow-400" },
    ],
    image: "/projects/air-quality.png",
    source_code_link: "https://github.com/AzharAhmed-bot/air-quality-analysis",
    live_demo: "",
  },
  {
    name: "Pen Tracking & Annotation System",
    description:
      "Built pen tracking system using real-time video analysis to trace pen movement paths with accurate coordinate mapping. Implemented Russian license plate recognition using OCR and pattern matching for automatic plate detection and character extraction.",
    tags: [
      { name: "Python", color: "text-yellow-400" },
      { name: "OpenCV", color: "text-green-400" },
      { name: "Computer Vision", color: "text-purple-400" },
      { name: "OCR", color: "text-cyan-400" },
    ],
    image: "/projects/pen-tracking.png",
    source_code_link: "https://github.com/AzharAhmed-bot/ai-possible/tree/master/lecture-5%3Aneural-networks",
    live_demo: "",
  },
];

const ProjectCard = ({ index, name, description, tags, image, source_code_link, live_demo }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true }}
    className="relative group w-full sm:w-[360px] lg:w-[380px]"
  >
    <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 border border-purple-500/20 rounded-[20px] overflow-hidden backdrop-blur-sm shadow-lg shadow-purple-900/20 hover:shadow-purple-700/40 transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-[230px] overflow-hidden bg-gray-800">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/projects/placeholder.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center gap-6">
          {source_code_link && (
            <button
              onClick={() => window.open(source_code_link, "_blank")}
              className="p-4 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 hover:scale-110 transition-transform shadow-lg"
            >
              <Github className="w-6 h-6 text-white" />
            </button>
          )}
          {live_demo && (
            <button
              onClick={() => window.open(live_demo, "_blank")}
              className="p-4 rounded-full bg-white/10 border-2 border-cyan-400 hover:scale-110 transition-transform shadow-lg"
            >
              <ExternalLink className="w-6 h-6 text-cyan-400" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white text-[24px] font-bold mb-3 group-hover:text-cyan-400 transition-colors">
          {name}
        </h3>
        <p className="text-gray-400 text-[15px] mb-5 leading-relaxed line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={`${name}-${tag.name}`} className={`text-[13px] font-medium ${tag.color}`}>
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const Works = () => (
  <section className="relative w-full min-h-screen py-24 px-6 sm:px-16  overflow-hidden">
    {/* Kenya Flag Glows */}
    <div className="absolute top-20 left-20 w-96 h-96 bg-black/20 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-32 left-32 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
    <div className="absolute top-44 left-44 w-72 h-72 bg-green-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
    <div className="absolute bottom-32 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16 relative z-10"
    >
      <p className="text-purple-400 text-lg uppercase tracking-widest font-semibold">
        My Work
      </p>
      <h2 className="text-white font-black text-5xl sm:text-7xl lg:text-8xl mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
        Projects.
      </h2>
      <p className="text-gray-300 mt-6 text-lg max-w-3xl mx-auto leading-relaxed">
        Real-world solutions built with AI, clean code, and Kenyan ingenuity.
      </p>
    </motion.div>

    {/* Projects Grid */}
    <div className="flex flex-wrap justify-center gap-12 z-10 relative max-w-7xl mx-auto">
      {projects.map((project, index) => (
        <ProjectCard key={`project-${index}`} index={index} {...project} />
      ))}
    </div>

    {/* Footer Note */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      viewport={{ once: true }}
      className="text-center mt-20 text-gray-500 text-sm"
    >
      More projects on <a href="https://github.com/AzharTakoy" target="_blank" className="text-cyan-400 hover:underline">GitHub</a> • 
      {" "}Building the future from Nairobi
    </motion.div>
  </section>
);

export default SectionWrapper(Works, "projects");