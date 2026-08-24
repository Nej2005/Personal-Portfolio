import React from 'react';
import { portfolioData } from '../data/portfolioData';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-20 md:py-32 bg-white dark:bg-[#0D0D0D] transition-colors duration-300">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 border-b border-[#E8E8E3] dark:border-[#242424] pb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="pixel-badge">
              PROJECTS & SYSTEM BUILDS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111111] dark:text-white">
            Featured Systems & Applications
          </h2>
          <p className="text-xs sm:text-base text-[#666666] dark:text-[#A0A0A0] mt-2 sm:mt-3 leading-relaxed max-w-3xl">
            A showcase of web systems, database architectures, and practical software engineering projects.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>

      </div>
    </section>
  );
}
