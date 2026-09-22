import React from 'react';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Experience() {
  const experiences = portfolioData.experience || [];

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 bg-[#F7F7F3] dark:bg-[#121212] border-y border-[#E8E8E3] dark:border-[#242424] transition-colors duration-300">
      <div className="section-container">
        
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="mb-6 sm:mb-8 border-b border-[#E8E8E3] dark:border-[#242424] pb-5">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="pixel-badge">
                WORK EXPERIENCE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111111] dark:text-white">
              Professional Experience
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id || index} animation="fade-up" delay={100}>
              <div className="relative card-minimal p-5 sm:p-6 md:p-7 bg-white dark:bg-[#141414] rounded-xl border border-[#E8E8E3] dark:border-[#242424] shadow-xs hover:shadow-lg dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:border-[#111111]/40 dark:hover:border-white/40 transition-all duration-300 ease-out group overflow-hidden">
                
                {/* Subtle Left Accent Highlight Indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#111111] dark:bg-white rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Header: Company Initials, Role, Company & Metadata, Period */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#EFEFEA] dark:border-[#222222]">
                  <div className="flex items-center gap-3.5">
                    {/* Company Initials Badge */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] flex items-center justify-center font-extrabold text-xs sm:text-sm tracking-wider flex-shrink-0 shadow-2xs group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                      {exp.companyInitials || exp.initials || "CC"}
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#111111] dark:text-white tracking-tight leading-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                        {exp.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#666666] dark:text-[#A0A0A0] mt-1">
                        <span className="font-semibold text-[#111111] dark:text-[#EDEDED]">
                          {exp.company}
                        </span>
                        <span>•</span>
                        <span>{exp.employmentType}</span>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="self-start sm:self-center">
                    <span className="inline-block text-xs font-mono font-medium text-[#444444] dark:text-[#CCCCCC] bg-[#F7F7F3] dark:bg-[#1C1C1C] px-3 py-1 rounded-full border border-[#E2E2DC] dark:border-[#2C2C2C] group-hover:border-[#111111]/30 dark:group-hover:border-white/30 transition-colors duration-300">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Concise Summary */}
                <p className="text-xs sm:text-sm text-[#555555] dark:text-[#A8A8A8] mt-3.5 leading-relaxed">
                  {exp.summary}
                </p>

                {/* Concise Key Focus Points */}
                <div className="mt-4 pt-4 border-t border-[#EFEFEA] dark:border-[#222222]">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-[13px] text-[#333333] dark:text-[#D5D5D5]">
                    {(exp.highlights || []).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-white shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compact Tech Badges */}
                <div className="mt-4 pt-3 border-t border-[#EFEFEA] dark:border-[#222222] flex flex-wrap gap-1.5">
                  {(exp.technologies || []).map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#F7F7F3] dark:bg-[#1C1C1C] text-[#444444] dark:text-[#CCCCCC] border border-[#E5E5DE] dark:border-[#2E2E2E] group-hover:border-[#CCCCCC] dark:group-hover:border-[#444444] transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
