import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0D0D0D] border-t border-[#E8E8E3] dark:border-[#222222] py-6 sm:py-8 transition-colors duration-300">
      <div className="section-container flex items-center justify-center text-center">
        <p className="text-xs text-[#555555] dark:text-[#888888] leading-relaxed">
          Designed & Built by <span className="font-semibold text-[#111111] dark:text-[#EDEDED]">{portfolioData.personal.name}</span> © {currentYear}
        </p>
      </div>
    </footer>
  );
}
