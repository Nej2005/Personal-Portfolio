import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ResumeLoader from './ResumeLoader';

const ENTER_DURATION = 1100;
const EXIT_DURATION = 1000;
const REVEAL_DURATION = 300;

export default function ResumeModal({ isOpen, onClose }) {
  const [stage, setStage] = useState('closed');
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    clearTimers();
    if (isOpen) {
      setStage('entering');
      document.body.style.overflow = 'hidden';

      timers.current = [
        setTimeout(() => setStage('revealing'), ENTER_DURATION),
        setTimeout(() => setStage('viewing'), ENTER_DURATION + REVEAL_DURATION),
      ];
    } else {
      setStage('closed');
      document.body.style.overflow = '';
    }
    return clearTimers;
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && stage !== 'exiting' && stage !== 'closed') {
        handleBackToPortfolio();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage]);

  const handleBackToPortfolio = () => {
    if (stage === 'exiting') return;
    clearTimers();
    setStage('exiting');

    timers.current = [
      setTimeout(() => {
        onClose();
        setStage('closed');
        document.body.style.overflow = '';
      }, EXIT_DURATION),
    ];
  };

  if (stage === 'closed') return null;

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#F5F5F0] dark:bg-[#0D0D0D] flex flex-col text-[#111111] dark:text-white selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors duration-300 overflow-hidden">
      {(stage === 'entering' || stage === 'revealing') && (
        <ResumeLoader mode="entering" duration={ENTER_DURATION} leaving={stage === 'revealing'} />
      )}
      {stage === 'exiting' && <ResumeLoader mode="exiting" duration={EXIT_DURATION} />}

      <header className="px-4 sm:px-8 py-3 bg-[#FFFFFF] dark:bg-[#141414] border-b border-[#E2E2DC] dark:border-[#242424] flex items-center justify-between gap-4 z-40 shadow-xs transition-colors duration-300">
        <button
          onClick={handleBackToPortfolio}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7F7F3] dark:bg-white/10 hover:bg-[#EDEDE8] dark:hover:bg-white/20 text-[#111111] dark:text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-95 border border-[#DCDCD5] dark:border-white/10 shadow-2xs group"
          aria-label="Back to Portfolio"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Portfolio</span>
        </button>

        <div className="hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F5F0] dark:bg-[#202020] border border-[#E5E5DF] dark:border-[#2E2E2E] text-xs text-[#555555] dark:text-[#CCCCCC] font-medium">
          <FileText className="w-3.5 h-3.5 text-[#111111] dark:text-white" />
          <span className="font-semibold text-[#111111] dark:text-white">{portfolioData.personal.name}</span>
          <span className="text-[#888888] dark:text-[#777777]">• Official Resume</span>
        </div>

        <a
          href="/Jenny_Hernandez_Resume.pdf"
          download="Jenny_Hernandez_Resume.pdf"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-[#2A2A2A] dark:hover:bg-neutral-200 text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
          title="Download PDF Version"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </a>
      </header>

      <main className="flex-1 w-full h-full bg-[#323639] dark:bg-[#181818] relative transition-colors duration-300">
        <iframe
          src="/Jenny_Hernandez_Resume.pdf#toolbar=0&navpanes=0&view=Fit&zoom=page-fit"
          className="w-full h-full border-none"
          title="Jenny Hernandez Resume PDF"
        />
      </main>
    </div>
  );
}
