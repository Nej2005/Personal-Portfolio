import React from 'react';
import { portfolioData } from '../data/portfolioData';
import Achievements from './Achievements';
import SoftSkills from './SoftSkills';
import ScrollReveal from './ScrollReveal';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 bg-white dark:bg-[#0D0D0D] transition-colors duration-300">
      <div className="section-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10">
          
          <ScrollReveal animation="slide-right" delay={0} className="lg:col-span-5 flex flex-col justify-start space-y-4 sm:space-y-5">
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
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150} className="lg:col-span-4">
            <Achievements />
          </ScrollReveal>

          <ScrollReveal animation="slide-left" delay={300} className="lg:col-span-3">
            <SoftSkills />
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
