import React from 'react';
import { ExternalLink, Github, GraduationCap, User } from 'lucide-react';

export default function ProjectCard({ project, index = 1 }) {
  const isSchool = project.accountType === 'school';

  return (
    <div className="card-minimal flex flex-col overflow-hidden group bg-white dark:bg-[#141414]">
      {/* Numerical Thumbnail Header */}
      <div className="relative w-full h-32 sm:h-40 bg-[#F7F7F5] dark:bg-[#181818] border-b border-[#E8E8E3] dark:border-[#262626] flex items-center justify-between px-5 sm:px-7 overflow-hidden transition-colors">
        
        {/* Thumbnail Image Background if available */}
        {project.image && (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover blur-[1px] scale-105 group-hover:scale-108 group-hover:blur-none transition-all duration-500 opacity-75 dark:opacity-65"
            />
            <div className="absolute inset-0 bg-white/30 dark:bg-black/35 transition-colors" />
          </>
        )}

        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111111] dark:text-white leading-none">
              {String(index).padStart(2, '0')}
            </span>
          </div>

          {/* School / Personal Account Badge */}
          <div>
            {isSchool ? (
              <span className="pixel-chip inline-flex items-center gap-1.5 shadow-2xs">
                <GraduationCap className="w-3 h-3 text-[#111111] dark:text-white" />
                <span>School Project</span>
              </span>
            ) : (
              <span className="pixel-chip inline-flex items-center gap-1.5 shadow-2xs">
                <User className="w-3 h-3 text-[#111111] dark:text-white" />
                <span>Personal Build</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-[#111111] dark:text-white group-hover:text-black dark:group-hover:text-white tracking-tight leading-snug">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#666666] dark:text-[#A0A0A0] mt-2 sm:mt-2.5 leading-relaxed">
            {project.description}
          </p>

          {/* Role / Contribution if specified */}
          {project.role && (
            <p className="text-[11px] sm:text-xs font-medium text-[#777777] dark:text-[#888888] mt-2">
              <span className="font-semibold text-[#444444] dark:text-[#CCCCCC]">Role:</span> {project.role}
            </p>
          )}
        </div>

        {/* Technology Pill Tags & Links */}
        <div className="pt-4 sm:pt-5 mt-auto">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3.5 sm:mb-4">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="tag-pill">
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#F0F0EB] dark:border-[#222222] text-xs font-medium flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#555555] dark:text-[#AAAAAA] hover:text-[#111111] dark:hover:text-white transition-colors group/link"
                  aria-label={`${project.title} GitHub Source (${project.githubAccount || 'GitHub'})`}
                  title={`View repository on ${project.githubAccount || 'GitHub'}`}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#555555] dark:text-[#AAAAAA] hover:text-[#111111] dark:hover:text-white transition-colors"
                  aria-label={`${project.title} Live Preview`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </a>
              )}
            </div>

            <span className="text-[10px] sm:text-[11px] text-[#999999] dark:text-[#666666] uppercase tracking-wider font-mono">
              Web System
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
