import React from 'react';
import { Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function SoftSkills() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="border-b border-[#E8E8E3] dark:border-[#2C2C2C] pb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-wider text-[#6B6B6B] dark:text-[#999999] uppercase">
          Soft Skills
        </h3>
        <span className="text-[10px] font-mono text-[#888888] dark:text-[#666666]">
          Key Competencies
        </span>
      </div>

      <div className="space-y-3">
        {portfolioData.about.softSkills.map((skill, index) => (
          <div 
            key={index}
            className="relative flex items-start gap-3.5 p-3 rounded-xl bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#262626] transition-all duration-300 ease-out hover:translate-x-1.5 hover:-translate-y-0.5 hover:border-[#111111]/40 dark:hover:border-white/40 shadow-2xs hover:shadow-md dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] group cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#111111]/[0.02] to-transparent dark:via-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="w-5 h-5 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 shadow-2xs">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>

            <div className="relative z-10">
              <h4 className="text-sm font-bold text-[#111111] dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                {skill.name}
              </h4>
              <p className="text-xs text-[#6B6B6B] dark:text-[#999999] mt-0.5 leading-snug">
                {skill.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
