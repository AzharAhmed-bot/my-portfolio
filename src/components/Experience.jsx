import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, Award } from "lucide-react";

const ExperienceCard = ({ experience, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative mb-16"
    >
      <div className="flex items-start gap-6">
        {/* Timeline dot and line */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-purple-500/50 z-10">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          {index < 1 && (
            <div className="w-1 h-full bg-gradient-to-b from-purple-500 to-transparent mt-2" />
          )}
        </div>

        {/* Content card */}
        <div className="flex-1 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-cyan-600/50 rounded-[20px] blur-sm opacity-0 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 rounded-[20px] p-6 border border-purple-500/20 backdrop-blur-sm">
              {/* Date badge */}
              <div className="inline-block px-4 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300 mb-4">
                {experience.date}
              </div>

              {/* Title and company */}
              <h3 className="text-white text-[24px] font-bold mb-2">
                {experience.title}
              </h3>
              <p className="text-cyan-400 text-[18px] font-semibold mb-1">
                {experience.company_name}
              </p>
              <p className="text-gray-400 text-[14px] mb-4">
                {experience.location}
              </p>

              {/* Points */}
              <ul className="space-y-3">
                {experience.points.map((point, idx) => (
                  <li
                    key={`experience-point-${idx}`}
                    className="flex items-start gap-2 text-gray-300 text-[15px] leading-relaxed"
                  >
                    <span className="text-purple-400 mt-1">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Key accomplishments */}
              {experience.accomplishments && experience.accomplishments.length > 0 && (
                <div className="mt-6 pt-6 border-t border-purple-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-cyan-400 font-semibold">Key Accomplishments</h4>
                  </div>
                  <ul className="space-y-2">
                    {experience.accomplishments.map((acc, idx) => (
                      <li
                        key={`accomplishment-${idx}`}
                        className="flex items-start gap-2 text-gray-300 text-[14px]"
                      >
                        <span className="text-cyan-400 mt-1">★</span>
                        <span>{acc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company_name: "SHIELD",
      location: "Nairobi",
      date: "April 2024 – November 2025",
      points: [
        "Designed, developed, and maintained the organization's main website and e-learning platform, enabling seamless access to tech education resources for underserved communities.",
        "Collaborated with senior engineers to implement design improvements, resolve bugs, and optimize performance across various projects.",
        "Integrated content management tools to simplify course updates and improve user engagement."
      ],
      accomplishments: [
        "Contributed to UI/UX improvements that enhanced site navigation and reduced user-reported issues by 20%."
      ]
    },
    {
      title: "Software Developer Intern",
      company_name: "Italanta",
      location: "Nairobi",
      date: "Aug 2023 – Feb 2024",
      points: [
        "Developed and implemented Angular-based chat-bot web application using SCRUM Agile methods.",
        "Contributed to Gumzo chat-bot, successfully merging over five features and bug-fix pull requests into production codebases.",
        "Collaborated closely with a distributed team of developers, participating in code reviews, sprint planning, and agile workflows."
      ],
      accomplishments: [
        "Achieved 5+ successful code merges into active open-source repositories."
      ]
    }
  ];

  return (
    <section id="work" className="relative w-full min-h-screen py-20 px-6 sm:px-16 bg-gradient-to-b from-gray-900 via-purple-900/5 to-gray-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
      
      <div className="relative max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 text-[14px] sm:text-[18px] uppercase tracking-wider">
            What I have done so far
          </p>
          <h2 className="text-white font-black text-[40px] sm:text-[60px] lg:text-[80px] mt-2">
            Work Experience.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent opacity-20" />
          
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        {/* Education section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <Code className="w-8 h-8 text-purple-400" />
            <h3 className="text-white text-[32px] font-bold">Education</h3>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 rounded-[20px] p-6 border border-purple-500/20 backdrop-blur-sm">
            <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
              <div>
                <h4 className="text-white text-[22px] font-bold">Bachelor of Science in Computer Science</h4>
                <p className="text-cyan-400 text-[18px] font-semibold">Strathmore University</p>
                <p className="text-purple-400 text-[14px] mt-1">First Class Honours</p>
              </div>
              <div className="px-4 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-sm text-cyan-300">
                Expected July 2027
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-400 text-[14px] font-semibold mb-2">Relevant Coursework:</p>
              <div className="flex flex-wrap gap-2">
                {["Data Structures & Algorithms", "Database Systems", "Software Engineering", "Artificial Intelligence", "Computer Networks", "HCI", "Web Development", "Mobile App Development"].map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1 bg-white/5 border border-purple-500/20 rounded-full text-xs text-gray-300"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;