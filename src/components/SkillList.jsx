import React from 'react';
import { techSvgMap } from './TechIcons';
import { 
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
} from 'lucide-react';

const iconMap = {
  Coffee: Coffee,
  Binary: Binary,
  FileCode2: FileCode2,
  Server: Server,
  Database: Database,
  Terminal: Terminal,
  Code: Code,
  GitBranch: GitBranch,
  Layout: Layout,
  Send: Send,
  Box: Box,
  Sparkles: Sparkles,
  FolderKanban: FolderKanban,
};

export default function SkillList({ skills, title }) {
  return (
    <div className="card-minimal p-4 sm:p-6 md:p-7 bg-white dark:bg-[#141414]">
      {/* Title */}
      <div className="border-b border-[#E8E8E3] dark:border-[#262626] pb-3 mb-3 sm:mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-wider text-[#6B6B6B] dark:text-[#999999] uppercase">
          {title}
        </h3>
        <span className="text-[10px] font-medium text-[#888888] dark:text-[#777777]">
          ({skills.length})
        </span>
      </div>

      {/* Skills list items */}
      <div className="divide-y divide-[#F0F0EB] dark:divide-[#222222]">
        {skills.map((skill, index) => {
          const SvgLogo = skill.logo ? techSvgMap[skill.logo.toLowerCase()] : null;
          const IconComponent = iconMap[skill.icon] || Cpu;
          return (
            <div 
              key={index}
              className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3 group transition-colors"
            >
              {/* Left: Icon & Skill Name */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#F7F7F3] dark:bg-[#202020] border border-[#E8E8E3] dark:border-[#333333] flex items-center justify-center text-[#111111] dark:text-white flex-shrink-0 group-hover:border-[#111111] dark:group-hover:border-white group-hover:scale-105 transition-all">
                  {SvgLogo ? (
                    <SvgLogo className="w-4 h-4 text-[#111111] dark:text-white" />
                  ) : (
                    <IconComponent className="w-4 h-4" />
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-semibold text-[#111111] dark:text-white tracking-tight leading-snug">
                  {skill.name}
                </h4>
              </div>

              {/* Right: Clean Category Badge */}
              {skill.category && (
                <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-[#F7F7F3] dark:bg-[#1E1E1E] text-[#666666] dark:text-[#AAAAAA] border border-[#E8E8E3] dark:border-[#2E2E2E] whitespace-nowrap flex-shrink-0">
                  {skill.category}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
