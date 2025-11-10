import React from "react";
import { motion } from "framer-motion";
import { Brain, Code, Eye, Gamepad2 } from "lucide-react";

const ServiceCard = ({ index, title, icon: Icon, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative xs:w-[250px] w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-[20px] blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[20px] p-[1px]">
        <div className="bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 rounded-[20px] py-8 px-8 min-h-[280px] flex justify-evenly items-center flex-col backdrop-blur-sm">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-10 h-10 text-purple-400 group-hover:text-cyan-400 transition-colors" />
          </div>

          <h3 className="text-white text-[20px] font-bold text-center mt-4">
            {title}
          </h3>
          
          <p className="text-gray-400 text-sm text-center mt-2">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const services = [
    {
      title: "AI & Machine Learning",
      icon: Brain,
      description: "Predictive & generative ML with CNNs"
    },
    {
      title: "Computer Vision",
      icon: Eye,
      description: "OpenCV solutions for real-world problems"
    },
    {
      title: "Full-Stack Development",
      icon: Code,
      description: "React, Next.js, FastAPI & modern databases"
    },
    {
      title: "Game Development",
      icon: Gamepad2,
      description: "Unity & upcoming Unreal Engine projects"
    }
  ];

  return (
    <section id="about" className="relative w-full min-h-screen py-20 px-6 sm:px-16 bg-gradient-to-b from-gray-900 via-purple-900/10 to-gray-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="relative max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-purple-400 text-[14px] sm:text-[18px] uppercase tracking-wider">
            Introduction
          </p>
          <h2 className="text-white font-black text-[40px] sm:text-[60px] lg:text-[80px] mt-2">
            Overview.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <p className="text-gray-300 text-[17px] max-w-3xl leading-[30px]">
            I'm a <span className="text-cyan-400 font-semibold">Software Engineer</span> with a versatile, well-rounded approach to development. 
            With a background in <span className="text-purple-400 font-semibold">Knowledge Engineering</span>, I specialize in crafting algorithms 
            that deliver next-level solutions by translating complex real-world problems into elegant code.
          </p>
          
          <p className="text-gray-300 text-[17px] max-w-3xl leading-[30px] mt-6">
            Currently, I'm on a journey to merge software engineering with <span className="text-cyan-400 font-semibold">AI</span>, 
            creating cutting-edge solutions in <span className="text-purple-400 font-semibold">machine learning</span>, 
            <span className="text-cyan-400 font-semibold"> computer vision</span>, and 
            <span className="text-purple-400 font-semibold"> full-stack development</span>. I'm also part of the game development community, 
            working with Unity and planning to expand into Unreal Engine soon.
          </p>

          <p className="text-gray-300 text-[17px] max-w-3xl leading-[30px] mt-6">
            Let's collaborate to build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">
            intelligent, scalable solutions
            </span> that solve real-world problems!
          </p>
        </motion.div>

        <div className="mt-20 flex flex-wrap gap-10 justify-center lg:justify-start">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-white text-[24px] font-bold mb-6">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {["Python", "Java", "C#", "C++", "TypeScript", "JavaScript", "React", "Next.js", "FastAPI", "Flask", "OpenCV", "Unity"].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm text-gray-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;