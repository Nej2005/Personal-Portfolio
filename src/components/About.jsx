import React from 'react';
import { portfolioData } from '../data/portfolioData';
import Achievements from './Achievements';
import SoftSkills from './SoftSkills';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 bg-[#F7F7F3] dark:bg-[#121212] border-y border-[#E8E8E3] dark:border-[#242424] transition-colors duration-300">
      <div className="section-container">
        
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10">
          
          {/* Left Column: About Me Bio */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="pixel-badge">
                {portfolioData.about.sectionLabel}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111111] dark:text-white leading-tight">
              {portfolioData.about.heading}
            </h2>

            <p className="text-sm sm:text-base text-[#555555] dark:text-[#A0A0A0] leading-relaxed text-justify">
              {portfolioData.about.paragraph}
            </p>
          </div>

          {/* Middle Column: Achievements */}
          <div className="lg:col-span-4">
            <Achievements />
          </div>

          {/* Right Column: Soft Skills */}
          <div className="lg:col-span-3">
            <SoftSkills />
          </div>

        </div>

      </div>
    </section>
  );
}
