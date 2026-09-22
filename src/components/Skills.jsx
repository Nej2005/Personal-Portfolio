import React from 'react';
import ScrollReveal from './ScrollReveal';
import { techSvgMap } from './TechIcons';
import { 
  Code2, 
  Server, 
  Wrench, 
  Coffee, 
  Binary, 
  FileCode2, 
  Database, 
  Terminal, 
  Code, 
  GitBranch, 
  Layout, 
  Send, 
  Box,
  Sparkles,
  FolderKanban,
  Cpu
} from 'lucide-react';

const iconMap = {
  Coffee,
  Binary,
  FileCode2,
  Server,
  Database,
  Terminal,
  Code,
  GitBranch,
  Layout,
  Send,
  Box,
  Sparkles,
  FolderKanban,
  Cpu
};

export default function Skills() {
  const programmingLanguages = [
    { name: "JavaScript", logo: "javascript" },
    { name: "TypeScript", logo: "typescript" },
    { name: "React", logo: "react" },
    { name: "Node.js", logo: "nodejs" },
    { name: "Next.js", logo: "nextjs" },
    { name: "Express.js", logo: "express" },
    { name: "HTML5", logo: "html5" },
    { name: "CSS3", logo: "css3" },
    { name: "Tailwind CSS", logo: "tailwindcss" },
    { name: "PostgreSQL", logo: "postgresql" },
    { name: "PHP", logo: "php" },
    { name: "Java", logo: "java" },
  ];

  const developerTools = [
    { name: "VS Code", icon: "Code", category: "Primary IDE" },
    { name: "Git & GitHub", icon: "GitBranch", category: "Version Control" },
    { name: "MySQL & Supabase", icon: "Database", category: "Database Systems" },
    { name: "Figma, Canva, & Draw.io", icon: "Layout", category: "Design & Diagramming" },
    { name: "Codex, Claude Code, Gemini", icon: "Sparkles", category: "AI & LLM Tools" },
    { name: "Notion & Discord", icon: "FolderKanban", category: "Productivity" },
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-28 bg-white dark:bg-[#0D0D0D] transition-colors duration-300">
      <div className="section-container">
        
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="mb-8 sm:mb-12 border-b border-[#E8E8E3] dark:border-[#242424] pb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="pixel-badge">
                TECHNICAL EXPERTISE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111111] dark:text-white">
              Skills & Tech-stack
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          
          <ScrollReveal animation="slide-right" delay={150}>
            <div className="card-minimal p-5 sm:p-7 bg-[#FAFAF7] dark:bg-[#141414]">
              <div className="border-b border-[#E8E8E3] dark:border-[#262626] pb-3 mb-4 flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-wider text-[#6B6B6B] dark:text-[#999999] uppercase">
                  PROGRAMMING LANGUAGES
                </h3>
                <span className="text-[10px] font-mono text-[#888888] dark:text-[#777777]">
                  ({programmingLanguages.length})
                </span>
              </div>

              <div className="space-y-1">
                {programmingLanguages.map((skill, index) => {
                  const SvgLogo = skill.logo ? techSvgMap[skill.logo.toLowerCase()] : null;
                  return (
                    <div 
                      key={index}
                      className="py-2.5 px-3 rounded-lg flex items-center justify-between gap-3 group hover:bg-[#F7F7F3] dark:hover:bg-[#1C1C1C] transition-all duration-200 cursor-default"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#F7F7F3] dark:bg-[#202020] border border-[#E8E8E3] dark:border-[#303030] flex items-center justify-center text-[#111111] dark:text-white flex-shrink-0 group-hover:border-[#111111] dark:group-hover:border-white group-hover:scale-110 transition-all duration-200 shadow-2xs">
                          {SvgLogo ? (
                            <SvgLogo className="w-4 h-4 text-[#111111] dark:text-white" />
                          ) : (
                            <Code2 className="w-4 h-4" />
                          )}
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-[#111111] dark:text-white tracking-tight leading-none group-hover:text-black dark:group-hover:text-white">
                          {skill.name}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-left" delay={300}>
            <div className="card-minimal p-5 sm:p-7 bg-[#FAFAF7] dark:bg-[#141414]">
              <div className="border-b border-[#E8E8E3] dark:border-[#262626] pb-3 mb-4 flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-wider text-[#6B6B6B] dark:text-[#999999] uppercase">
                  DEVELOPER TOOLS
                </h3>
                <span className="text-[10px] font-mono text-[#888888] dark:text-[#777777]">
                  ({developerTools.length})
                </span>
              </div>

              <div className="space-y-1">
                {developerTools.map((skill, index) => {
                  const IconComponent = iconMap[skill.icon] || Cpu;
                  return (
                    <div 
                      key={index}
                      className="py-2.5 px-3 rounded-lg flex items-center justify-between gap-3 group hover:bg-[#F7F7F3] dark:hover:bg-[#1C1C1C] transition-all duration-200 cursor-default"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#F7F7F3] dark:bg-[#202020] border border-[#E8E8E3] dark:border-[#303030] flex items-center justify-center text-[#111111] dark:text-white flex-shrink-0 group-hover:border-[#111111] dark:group-hover:border-white group-hover:scale-110 transition-all duration-200 shadow-2xs">
                          <IconComponent className="w-4 h-4" />
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-[#111111] dark:text-white tracking-tight leading-none group-hover:text-black dark:group-hover:text-white">
                          {skill.name}
                        </h4>
                      </div>

                      {skill.category && (
                        <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded bg-[#F7F7F3] dark:bg-[#202020] text-[#666666] dark:text-[#AAAAAA] border border-[#E8E8E3] dark:border-[#2C2C2C] whitespace-nowrap flex-shrink-0 group-hover:border-[#111111]/30 dark:group-hover:border-white/30 transition-colors">
                          {skill.category}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
