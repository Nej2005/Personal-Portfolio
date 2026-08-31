import React from 'react';
import { Award, Trophy, Star, Medal, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  Award: Award,
  Trophy: Trophy,
  Star: Star,
  Medal: Medal,
};

export default function Achievements() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="border-b border-[#E8E8E3] dark:border-[#2C2C2C] pb-3 flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-wider text-[#6B6B6B] dark:text-[#999999] uppercase">
          Achievements
        </h3>
        <span className="text-[10px] font-mono text-[#888888] dark:text-[#666666]">
          {portfolioData.about.achievements.length} Honors
        </span>
      </div>

      <div className="space-y-3.5">
        {portfolioData.about.achievements.map((item, index) => {
          const IconComponent = iconMap[item.icon] || CheckCircle2;
          return (
            <div 
              key={index}
              className="relative flex items-start gap-3.5 p-3.5 rounded-xl bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#262626] transition-all duration-300 ease-out hover:-translate-y-1 hover:translate-x-0.5 hover:border-[#111111]/40 dark:hover:border-white/40 shadow-xs hover:shadow-lg dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] group overflow-hidden cursor-pointer"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#111111] dark:bg-white rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-9 h-9 rounded-full bg-[#F7F7F3] dark:bg-[#222222] border border-[#E8E8E3] dark:border-[#333333] flex items-center justify-center text-[#111111] dark:text-white flex-shrink-0 mt-0.5 group-hover:bg-[#111111] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#111111] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xs">
                <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#111111] dark:text-white leading-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#6B6B6B] dark:text-[#999999] mt-1 leading-snug">
                  {item.subtitle}
                </p>
                <span className="inline-block text-[10px] font-semibold text-[#777777] dark:text-[#AAAAAA] mt-2 bg-[#F7F7F3] dark:bg-[#222222] px-2.5 py-0.5 rounded-full border border-[#E8E8E3] dark:border-[#333333] group-hover:border-[#111111]/30 dark:group-hover:border-white/30 transition-colors font-mono">
                  {item.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
