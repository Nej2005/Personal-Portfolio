import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div className="fixed top-3.5 right-3.5 sm:top-5 sm:right-6 md:top-6 md:right-8 z-50">
      <button
        onClick={toggleTheme}
        className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white dark:bg-[#181818] text-[#111111] dark:text-[#EDEDED] border border-[#E8E8E3] dark:border-[#2C2C2C] shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group focus:outline-none cursor-pointer"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#F5A623] transition-transform duration-200 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#333333] group-hover:text-black transition-transform duration-200 group-hover:-rotate-12" />
        )}
      </button>
    </div>
  );
}
