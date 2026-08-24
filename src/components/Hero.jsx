import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, MapPin, GraduationCap, User, ExternalLink, ChevronDown, FileText, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const [showGithubMenu, setShowGithubMenu] = useState(false);
  const githubMenuRef = useRef(null);

  // Close GitHub menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (githubMenuRef.current && !githubMenuRef.current.contains(e.target)) {
        setShowGithubMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section id="home" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-32 bg-white dark:bg-[#0D0D0D] transition-colors duration-300">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Greeting, Headline, Actions, Socials */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 sm:space-y-7">
            
            {/* Small greeting */}
            <div className="inline-flex items-center gap-2">
              <span className="pixel-badge">
                WELCOME
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] dark:text-white leading-[1.15]">
              I'm {portfolioData.personal.name}
            </h1>

            {/* Paragraph / Bio description */}
            <p className="text-sm sm:text-lg text-[#555555] dark:text-[#A0A0A0] max-w-2xl leading-relaxed font-normal">
              {portfolioData.personal.headline}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 sm:pt-2">
              <a
                href="#projects"
                className="btn-primary flex items-center gap-2 group"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={portfolioData.personal.resumeUrl || "/Jenny_Hernandez_Resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F7F7F3] dark:bg-[#181818] text-[#111111] dark:text-[#EDEDED] border border-[#D5D5CF] dark:border-[#333333] text-sm font-medium rounded-full transition-all duration-200 hover:border-[#111111] dark:hover:border-white hover:bg-neutral-100 dark:hover:bg-[#222222] active:scale-[0.98] shadow-2xs group"
                aria-label="View Resume"
                title="View Jenny's Formal Resume in a new tab"
              >
                <FileText className="w-4 h-4 text-[#555555] dark:text-[#AAAAAA] group-hover:text-[#111111] dark:group-hover:text-white transition-colors" />
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Social Icons & Dual GitHub Profile Switcher */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
              
              {/* Interactive GitHub Dual Account Popover */}
              <div className="relative" ref={githubMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowGithubMenu(!showGithubMenu)}
                  className={`h-9 sm:h-10 px-3 rounded-full border border-[#E8E8E3] dark:border-[#2C2C2C] flex items-center gap-1.5 text-[#444444] dark:text-[#CCCCCC] hover:text-[#111111] dark:hover:text-white hover:border-[#111111] dark:hover:border-white hover:bg-[#F7F7F3] dark:hover:bg-[#181818] transition-all text-xs font-medium cursor-pointer ${
                    showGithubMenu ? 'border-[#111111] dark:border-white bg-[#F7F7F3] dark:bg-[#181818] text-[#111111] dark:text-white' : ''
                  }`}
                  aria-label="GitHub Profiles (Personal & School)"
                  aria-expanded={showGithubMenu}
                  title="View Personal & School GitHub Accounts"
                >
                  <Github className="w-4 h-4" />
                  <span className="font-semibold">GitHub</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showGithubMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showGithubMenu && (
                  <div className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2.5rem)] bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2C2C2C] shadow-2xl rounded-2xl p-2 z-50 animate-scaleUp text-left">
                    <div className="px-3 py-1.5 border-b border-[#F0F0EB] dark:border-[#262626] mb-1 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] dark:text-[#777777]">
                        GitHub Profiles
                      </span>
                      <span className="text-[10px] text-[#999999] dark:text-[#666666]">
                        2 accounts
                      </span>
                    </div>

                    {/* Personal GitHub */}
                    <a
                      href={portfolioData.personal.githubAccounts?.personal?.url || portfolioData.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowGithubMenu(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F7F3] dark:hover:bg-[#222222] transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F7F7F3] dark:bg-[#252525] border border-[#E8E8E3] dark:border-[#333333] flex items-center justify-center text-[#111111] dark:text-white flex-shrink-0 group-hover/item:border-[#111111] dark:group-hover/item:border-white transition-colors mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#111111] dark:text-white">
                            {portfolioData.personal.githubAccounts?.personal?.label || "Personal GitHub"}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-300">
                            @{portfolioData.personal.githubAccounts?.personal?.username || "Nej2005"}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#666666] dark:text-[#999999] mt-0.5 leading-snug">
                          {portfolioData.personal.githubAccounts?.personal?.description || "Personal builds, experiments & AI projects"}
                        </p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#888888] group-hover/item:text-[#111111] dark:group-hover/item:text-white flex-shrink-0 mt-1" />
                    </a>

                    {/* School / Academic GitHub */}
                    <a
                      href={portfolioData.personal.githubAccounts?.school?.url || "https://github.com/jennyhernandez"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowGithubMenu(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F7F3] dark:hover:bg-[#222222] transition-colors group/item mt-0.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F7F7F3] dark:bg-[#252525] border border-[#E8E8E3] dark:border-[#333333] flex items-center justify-center text-[#111111] dark:text-white flex-shrink-0 group-hover/item:border-[#111111] dark:group-hover/item:border-white transition-colors mt-0.5">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#111111] dark:text-white">
                            {portfolioData.personal.githubAccounts?.school?.label || "School GitHub"}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-300">
                            @{portfolioData.personal.githubAccounts?.school?.username || "jennyhernandez"}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#666666] dark:text-[#999999] mt-0.5 leading-snug">
                          {portfolioData.personal.githubAccounts?.school?.description || "Academic coursework, capstone & team repos"}
                        </p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#888888] group-hover/item:text-[#111111] dark:group-hover/item:text-white flex-shrink-0 mt-1" />
                    </a>
                  </div>
                )}
              </div>

              {/* LinkedIn */}
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E8E8E3] dark:border-[#2C2C2C] flex items-center justify-center text-[#444444] dark:text-[#CCCCCC] hover:text-[#111111] dark:hover:text-white hover:border-[#111111] dark:hover:border-white hover:bg-[#F7F7F3] dark:hover:bg-[#181818] transition-all"
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Email */}
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E8E8E3] dark:border-[#2C2C2C] flex items-center justify-center text-[#444444] dark:text-[#CCCCCC] hover:text-[#111111] dark:hover:text-white hover:border-[#111111] dark:hover:border-white hover:bg-[#F7F7F3] dark:hover:bg-[#181818] transition-all"
                aria-label="Email Address"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Circular Profile Image and Location Badge */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center pt-8 lg:pt-0">
            <div className="flex flex-col items-center">
              
              {/* Circular profile frame */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full p-2 bg-[#F7F7F3] dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2C2C2C] shadow-subtle group">
                <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center relative">
                  <img
                    src={portfolioData.personal.profileImage}
                    alt={portfolioData.personal.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = `
                        <div class="w-full h-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] flex items-center justify-center text-5xl font-bold tracking-wider">
                          ${portfolioData.personal.initials}
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>

              {/* Location badge */}
              <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F7F3] dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2C2C2C] text-xs text-[#555555] dark:text-[#AAAAAA]">
                <MapPin className="w-3.5 h-3.5 text-[#111111] dark:text-[#EDEDED]" />
                <span className="font-medium text-xs text-[#222222] dark:text-[#EDEDED]">{portfolioData.personal.location}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
