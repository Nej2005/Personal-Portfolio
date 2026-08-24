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
      <div className="border-b border-[#E8E8E3] dark:border-[#2C2C2C] pb-3">
        <h3 className="text-xs font-bold tracking-wider text-[#6B6B6B] dark:text-[#999999] uppercase">
          Achievements
        </h3>
      </div>

      <div className="space-y-4">
        {portfolioData.about.achievements.map((item, index) => {
          const IconComponent = iconMap[item.icon] || CheckCircle2;
          return (
            <div 
              key={index}
              className="flex items-start gap-3.5 p-3 rounded-lg bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#262626] transition-all duration-200 hover:border-[#CCCCCC] dark:hover:border-[#3E3E3E] hover:shadow-subtle"
            >
              <div className="w-8 h-8 rounded-full bg-[#F7F7F3] dark:bg-[#222222] border border-[#E8E8E3] dark:border-[#333333] flex items-center justify-center text-[#111111] dark:text-white flex-shrink-0 mt-0.5">
                <IconComponent className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[#111111] dark:text-white leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-[#6B6B6B] dark:text-[#999999] mt-0.5">
                  {item.subtitle}
                </p>
                <span className="inline-block text-[11px] font-medium text-[#888888] dark:text-[#AAAAAA] mt-1 bg-[#F7F7F3] dark:bg-[#222222] px-2 py-0.5 rounded border border-[#E8E8E3] dark:border-[#333333]">
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
