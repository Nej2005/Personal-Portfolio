import React, { useState, useEffect } from 'react';
import SideDots from './components/SideDots';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/ai/AIAssistant';

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleScroll = () => {
      const footerEl = document.querySelector('footer');
      if (!footerEl) return;
      const rect = footerEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight) {
        const visibleFooterHeight = windowHeight - rect.top;
        setBottomOffset(visibleFooterHeight + 24);
      } else {
        setBottomOffset(24);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D0D0D] text-portfolio-primary dark:text-[#EDEDED] flex flex-col relative selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors duration-300">
      
      {/* Dark / Light Mode Toggle Button (Top Right) */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      {/* Side Dots Quick Access Navigation */}
      <SideDots />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Popup AI Chatbox */}
      <AIAssistant 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
        bottomOffset={bottomOffset}
      />

      {/* Floating Circular AI Assistant Trigger Button (Bottom Right) */}
      <div 
        className="fixed right-3.5 sm:right-6 z-40 transition-[bottom] duration-150 ease-out"
        style={{ bottom: `${bottomOffset}px` }}
      >
        <button
          onClick={() => setIsAIOpen(!isAIOpen)}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white dark:bg-[#181818] text-[#111111] dark:text-white shadow-2xl hover:shadow-subtle-hover flex items-center justify-center relative hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#111111] dark:border-[#444444] group focus:outline-none p-1 sm:p-1.5 overflow-visible cursor-pointer"
          aria-label={isAIOpen ? "Close AI Assistant" : "Open AI Assistant"}
        >
          {/* Avatar Container with Hover Effect */}
          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative pointer-events-none bg-[#F7F7F5] dark:bg-[#222222]">
            {/* Light Mode: Black Pixel Art */}
            <img
              src="/images/chatbot-initial.png"
              alt="Jenny AI"
              className="w-full h-full object-contain p-1 transition-all duration-200 group-hover:opacity-0 group-hover:scale-90 absolute inset-0 dark:hidden"
            />
            <img
              src="/images/chatbot-hover.png"
              alt="Jenny AI Waving"
              className="w-full h-full object-contain p-0.5 transition-all duration-200 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 absolute inset-0 dark:hidden"
            />

            {/* Dark Mode: White Pixel Art */}
            <img
              src="/images/chatbot-initial-dark.png"
              alt="Jenny AI"
              className="w-full h-full object-contain p-1 transition-all duration-200 group-hover:opacity-0 group-hover:scale-90 absolute inset-0 hidden dark:block"
            />
            <img
              src="/images/chatbot-hover-dark.png"
              alt="Jenny AI Waving"
              className="w-full h-full object-contain p-0.5 transition-all duration-200 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 absolute inset-0 hidden dark:block"
            />
          </div>

          {/* Green Online Status Dot */}
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#181818] absolute bottom-0 right-0 shadow-sm ring-1 ring-black/10 z-10" />
        </button>
      </div>

    </div>
  );
}
