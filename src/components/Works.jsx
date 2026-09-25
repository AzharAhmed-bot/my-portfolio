"use client";
import React, { useRef, useState } from "react";
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

const ProjectCard = ({
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
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
      viewport={{ once: true }}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black-100/60 backdrop-blur-sm transition-colors duration-300 hover:border-white/20"
      )}
    >
      {/* Cursor-tracked spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(128,77,238,0.15), transparent 70%)",
        }}
      />

      {/* Faint index number */}
      <span className="pointer-events-none absolute right-5 top-3 select-none font-black text-7xl leading-none text-white/[0.04]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Window chrome */}
      <div className="relative flex items-center gap-1.5 px-5 pt-5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
        <span className="ml-2 truncate font-mono text-[11px] text-gray-500">
          ~/projects/{slug}
        </span>
      </div>

      {/* Graphic */}
      <div className="relative mx-5 mt-4 h-40 shrink-0 overflow-hidden rounded-xl border border-white/5 sm:h-48">
        <div className={clsx("absolute inset-0 bg-gradient-to-br", gradient)} />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            className="h-14 w-14 text-white/25 transition-all duration-500 group-hover:scale-110 group-hover:text-white/40"
            strokeWidth={1.25}
          />
        </div>

        {imageOk && (
          <img
            src={`/projects/${slug}.png`}
            alt={name}
            onError={() => setImageOk(false)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-cyan-400">
          {name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-400">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={clsx(
                "rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium",
                tag.color
              )}
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4">
          {source_code_link && (
            <a
              href={source_code_link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-400 transition-colors hover:text-white"
            >
              <Github className="h-4 w-4" /> Code
            </a>
          )}
          {live_demo && (
            <a
              href={live_demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-400 transition-colors hover:text-cyan-400"
            >
              <ExternalLink className="h-4 w-4" /> Live
            </a>
          )}
          {!source_code_link && !live_demo && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <Lock className="h-3.5 w-3.5" /> Private
            </span>
          )}
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
        <ProjectCard key={project.slug} index={index} {...project} />
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
