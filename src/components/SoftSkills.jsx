import React from 'react';
import { Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function SoftSkills() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="border-b border-[#E8E8E3] dark:border-[#2C2C2C] pb-3">
        <h3 className="text-xs font-bold tracking-wider text-[#6B6B6B] dark:text-[#999999] uppercase">
          Soft Skills
        </h3>
      </div>

      <div className="space-y-2.5">
        {portfolioData.about.softSkills.map((skill, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-2.5 rounded-lg bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#262626] transition-all duration-200 hover:border-[#CCCCCC] dark:hover:border-[#3E3E3E]"
          >
            <div className="w-5 h-5 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#111111] dark:text-white">
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
