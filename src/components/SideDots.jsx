import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'about', label: 'About Me' },
  { id: 'contact', label: 'Contact' },
];

export default function SideDots() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i].id);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Section navigation"
      className="hidden md:flex fixed left-3 md:left-5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-1 p-1.5 sm:p-2 rounded-full bg-white/80 dark:bg-[#181818]/80 backdrop-blur-md border border-[#E8E8E3] dark:border-[#2C2C2C] shadow-sm transition-all duration-300"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            aria-label={`Scroll to ${section.label}`}
            className="group relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 focus:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white rounded-full transition-all duration-200"
          >
            <span className="absolute inset-0 rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

            <span
              className={`block rounded-full transition-all duration-300 ease-out ${
                isActive
                  ? 'h-3.5 sm:h-4 w-1 sm:w-1.5 bg-[#111111] dark:bg-white shadow-xs'
                  : 'h-1.5 w-1.5 bg-neutral-400 dark:bg-neutral-500 group-hover:bg-neutral-800 dark:group-hover:bg-white group-hover:scale-125'
              }`}
            />

            <span className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-semibold tracking-wide text-[#111111] dark:text-white opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-200 ease-out pointer-events-none whitespace-nowrap z-40 bg-white/95 dark:bg-[#181818]/95 px-2.5 py-1 rounded-full border border-[#E8E8E3] dark:border-[#2C2C2C] shadow-md backdrop-blur-md">
              {section.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
