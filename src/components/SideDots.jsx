import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
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
    handleScroll(); // initialize

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
      className="hidden md:flex fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 rounded-full bg-white/85 dark:bg-[#181818]/85 backdrop-blur-md border border-[#E8E8E3] dark:border-[#2C2C2C] shadow-sm transition-all duration-300"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            aria-label={`Scroll to ${section.label}`}
            className="group relative flex items-center justify-center p-1 sm:p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white rounded-full"
          >
            {/* Expanding Background Capsule on Hover */}
            <span className="absolute -left-1 -top-0.5 -bottom-0.5 w-full group-hover:w-28 sm:group-hover:w-32 rounded-full bg-white/95 dark:bg-[#181818]/95 border border-transparent group-hover:border-[#E8E8E3] dark:group-hover:border-[#2C2C2C] group-hover:shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out -z-10 pointer-events-none" />

            {/* Original Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ease-out ${
                isActive
                  ? 'h-5 sm:h-6 w-1.5 sm:w-2 bg-[#111111] dark:bg-white shadow-xs'
                  : 'h-1.5 sm:h-2 w-1.5 sm:w-2 bg-neutral-300 dark:bg-neutral-600 group-hover:bg-neutral-600 dark:group-hover:bg-neutral-300 group-hover:scale-125'
              }`}
            />

            <span className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-semibold tracking-wide text-[#111111] dark:text-white opacity-0 group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap z-10 bg-white/90 dark:bg-[#1C1C1C]/90 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 shadow-sm backdrop-blur-xs">
              {section.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
