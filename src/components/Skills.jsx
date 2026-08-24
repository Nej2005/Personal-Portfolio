import React from 'react';
import { portfolioData } from '../data/portfolioData';
import SkillList from './SkillList';

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 md:py-32 bg-[#F7F7F3] dark:bg-[#121212] border-y border-[#E8E8E3] dark:border-[#242424] transition-colors duration-300">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="pixel-badge">
              TECHNICAL EXPERTISE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111111] dark:text-white">
            Skills & Tech-stack
          </h2>
        </div>

        {/* Two-Column Grid: Programming Languages & Developer Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <SkillList 
            title="Programming Languages" 
            skills={portfolioData.skills.programmingLanguages} 
          />
          <SkillList 
            title="Developer Tools" 
            skills={portfolioData.skills.developerTools} 
          />
        </div>

      </div>
    </section>
  );
}
