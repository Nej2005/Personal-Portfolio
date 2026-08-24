import React, { useState, useEffect } from 'react';
import { Menu, X, Bot, FileText, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ onOpenAI }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Me', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-[#E8E8E3] py-3.5 shadow-sm' 
        : 'bg-white py-5 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Initials Logo */}
        <a 
          href="#home" 
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm tracking-wider transition-transform duration-200 group-hover:scale-105">
            {portfolioData.personal.initials}
          </div>
          <span className="hidden sm:inline-block font-semibold text-sm tracking-tight text-[#111111]">
            {portfolioData.personal.name}
          </span>
        </a>

        {/* Right: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#444444] hover:text-[#111111] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#111111] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
            >
              {link.name}
            </a>
          ))}

          {/* Resume Pill */}
          <a
            href={portfolioData.personal.resumeUrl || "/Jenny_Hernandez_Resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-[#D5D5CF] text-[#333333] hover:text-black hover:border-black hover:bg-neutral-50 transition-all shadow-2xs active:scale-95 group"
            title="View Jenny's Resume in a new tab"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-600" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-500 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          
          {/* AI Assistant Nav Pill */}
          <button
            onClick={onOpenAI}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#111111] text-white hover:bg-neutral-800 transition-all shadow-sm active:scale-95 cursor-pointer"
            aria-label="Open AI Assistant"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Assistant</span>
          </button>
        </nav>

        {/* Mobile Menu Button & Mobile AI Assistant Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenAI}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#111111] text-white cursor-pointer"
            aria-label="AI Assistant"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI</span>
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#111111] hover:bg-[#F2F2EC] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8E8E3] px-5 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#222222] hover:text-black py-2.5 border-b border-neutral-100 last:border-b-0"
            >
              {link.name}
            </a>
          ))}
          <a
            href={portfolioData.personal.resumeUrl || "/Jenny_Hernandez_Resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-base font-semibold text-[#111111] py-2.5 border-t border-neutral-100 mt-2"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-600" />
              <span>Resume</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-500 opacity-80" />
          </a>
        </div>
      )}
    </header>
  );
}
