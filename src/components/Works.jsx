"use client";
import React, { useState } from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Lock,
  Database,
  Wind,
  HeartPulse,
  Gamepad2,
  Grid3x3,
  Signpost,
  PenTool,
  Mic,
} from "lucide-react";
import { SectionWrapper } from "../hoc";

const projects = [
  {
    slug: "chit-chat",
    name: "Quantum-Resistant Encrypted Chat",
    description:
      "Real-time chat platform secured with NTRU lattice-based cryptography, built to withstand attacks from future quantum computers. End-to-end encryption, light/dark themes.",
    tags: [
      { name: "React", color: "text-cyan-400" },
      { name: "NTRU Crypto", color: "text-purple-400" },
      { name: "Cryptography", color: "text-red-400" },
    ],
    source_code_link: "https://github.com/AzharAhmed-bot/chit-chat",
    icon: Lock,
    gradient: "from-purple-600 via-indigo-800 to-gray-950",
    className: "lg:col-span-3",
  },
  {
    slug: "yes_db",
    name: "YesDB",
    description:
      "A relational database engine built from scratch in Python — custom SQL parser, B-tree storage engine, and an optional cloud Backend-as-a-Service. Published on PyPI.",
    tags: [
      { name: "Python", color: "text-yellow-400" },
      { name: "SQL Engine", color: "text-cyan-400" },
      { name: "B-Tree", color: "text-green-400" },
    ],
    source_code_link: "https://github.com/AzharAhmed-bot/yes_db",
    icon: Database,
    gradient: "from-cyan-600 via-blue-800 to-gray-950",
    className: "lg:col-span-3",
  },
  {
    slug: "air-quality",
    name: "Air Quality Monitoring",
    description:
      "Real-time environmental monitoring app visualizing air quality data across Kenya's sensors.africa network, with interactive maps and live sensor readings.",
    tags: [
      { name: "React", color: "text-cyan-400" },
      { name: "Sensors.Africa API", color: "text-green-400" },
      { name: "DataViz", color: "text-yellow-400" },
    ],
    source_code_link: "https://github.com/AzharAhmed-bot/air-quality-analysis",
    icon: Wind,
    gradient: "from-emerald-600 via-teal-800 to-gray-950",
    className: "lg:col-span-2",
  },
  {
    slug: "lazy-lobsters",
    name: "Fall-Risk Patient Monitor",
    description:
      "Privacy-preserving system that watches over fall-risk patients in a hospital ward, catching unattended falls and distress in real time and alerting the nearest nurse.",
    tags: [
      { name: "Python", color: "text-yellow-400" },
      { name: "Computer Vision", color: "text-purple-400" },
      { name: "Healthcare", color: "text-red-400" },
    ],
    source_code_link: "https://github.com/AzharAhmed-bot/Lazy-Lobsters",
    icon: HeartPulse,
    gradient: "from-red-600 via-rose-900 to-gray-950",
    className: "lg:col-span-2",
  },
  {
    slug: "tiktactoe",
    name: "Unbeatable Tic-Tac-Toe",
    description:
      "A Tic-Tac-Toe AI powered by the minimax algorithm — plays perfectly, so it never loses a game.",
    tags: [
      { name: "TypeScript", color: "text-blue-400" },
      { name: "Minimax", color: "text-purple-400" },
      { name: "Game AI", color: "text-yellow-400" },
    ],
    source_code_link:
      "https://github.com/AzharAhmed-bot/simple-tiktactoe-that-humans-never-win",
    live_demo: "https://ai-tiktactoe.netlify.app/",
    icon: Gamepad2,
    gradient: "from-amber-500 via-orange-800 to-gray-950",
    className: "lg:col-span-2",
  },
  {
    slug: "crossword",
    name: "Crossword Generator",
    description:
      "Generates fully solved crossword puzzles using constraint satisfaction — arc consistency and backtracking search over a word-list domain.",
    tags: [
      { name: "Python", color: "text-yellow-400" },
      { name: "CSP", color: "text-purple-400" },
      { name: "AI", color: "text-cyan-400" },
    ],
    source_code_link:
      "https://github.com/AzharAhmed-bot/ai-possible/tree/master/lecture-3%3Aoptimization/project/crossword",
    icon: Grid3x3,
    gradient: "from-violet-600 via-purple-900 to-gray-950",
    className: "lg:col-span-3",
  },
  {
    slug: "traffic-sign",
    name: "Traffic Sign Classifier",
    description:
      "Convolutional neural network trained to classify road traffic signs, iterated across multiple training configurations to push accuracy higher.",
    tags: [
      { name: "Python", color: "text-yellow-400" },
      { name: "CNN", color: "text-purple-400" },
      { name: "TensorFlow", color: "text-orange-400" },
    ],
    source_code_link:
      "https://github.com/AzharAhmed-bot/ai-possible/tree/master/lecture-5%3Aneural-networks/project/traffic",
    icon: Signpost,
    gradient: "from-red-500 via-amber-800 to-gray-950",
    className: "lg:col-span-3",
  },
  {
    slug: "pen-tracer",
    name: "Pen Tracer",
    description:
      "Real-time video analysis that tracks a colored pen tip through contour detection, mapping its coordinates to draw its movement path on screen.",
    tags: [
      { name: "Python", color: "text-yellow-400" },
      { name: "OpenCV", color: "text-green-400" },
      { name: "Computer Vision", color: "text-cyan-400" },
    ],
    source_code_link:
      "https://github.com/AzharAhmed-bot/ai-possible/tree/master/lecture-5%3Aneural-networks/CNN/practice/project2",
    icon: PenTool,
    gradient: "from-pink-600 via-fuchsia-900 to-gray-950",
    className: "lg:col-span-2",
  },
  {
    slug: "fitness-ai",
    name: "AI Fitness Coach",
    description:
      "Voice-driven AI fitness coach that analyzes workout form from live video and adapts guidance in real time through a conversational agent.",
    tags: [
      { name: "React", color: "text-cyan-400" },
      { name: "Convex", color: "text-purple-400" },
      { name: "Voice AI", color: "text-yellow-400" },
    ],
    // Private repo — no public source link until it's opened up.
    icon: Mic,
    gradient: "from-cyan-500 via-emerald-800 to-gray-950",
    className: "lg:col-span-4",
  },
];

const BentoCard = ({
  index,
  slug,
  name,
  description,
  tags,
  icon: Icon,
  gradient,
  source_code_link,
  live_demo,
  className,
}) => {
  const [imageOk, setImageOk] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
      viewport={{ once: true }}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-[20px] bg-black-100 border border-purple-500/20 shadow-lg shadow-purple-900/20 hover:shadow-purple-700/40 transition-all duration-300"
      )}
    >
      {/* Graphic */}
      <div className="relative h-64 sm:h-72 shrink-0 overflow-hidden">
        <div
          className={clsx(
            "absolute inset-0 bg-gradient-to-br flex items-center justify-center",
            gradient
          )}
        >
          <Icon
            className="w-20 h-20 text-white/20 group-hover:text-white/30 group-hover:scale-110 transition-all duration-500"
            strokeWidth={1.25}
          />
        </div>

        {imageOk && (
          <img
            src={`/projects/${slug}.png`}
            alt={name}
            onError={() => setImageOk(false)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center gap-6">
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
      <div className="relative p-6 flex-1">
        <h3 className="text-white text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
          {name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={`text-[13px] font-medium ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => (
  <section className="relative w-full min-h-screen py-24 px-6 sm:px-16 overflow-hidden">
    {/* Kenya Flag Glows */}
    <div className="absolute top-20 left-20 w-96 h-96 bg-black/20 rounded-full blur-3xl animate-pulse" />
    <div
      className="absolute top-32 left-32 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: "1s" }}
    />
    <div
      className="absolute top-44 left-44 w-72 h-72 bg-green-600/10 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: "2s" }}
    />
    <div
      className="absolute bottom-32 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: "1.5s" }}
    />

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

    {/* Bento Grid */}
    <div className="grid grid-cols-1 gap-6 sm:mt-4 lg:grid-cols-6 max-w-7xl mx-auto relative z-10">
      {projects.map((project, index) => (
        <BentoCard key={project.slug} index={index} {...project} />
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
      More projects on{" "}
      <a
        href="https://github.com/AzharAhmed-bot"
        target="_blank"
        rel="noreferrer"
        className="text-cyan-400 hover:underline"
      >
        GitHub
      </a>{" "}
      • Building the future from Nairobi
    </motion.div>
  </section>
);

export default SectionWrapper(Works, "projects");
