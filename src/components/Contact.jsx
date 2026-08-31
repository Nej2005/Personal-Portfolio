import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  ChevronDown,
  ExternalLink,
  ArrowUpRight,
  FileText,
  User
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function Contact({ onOpenResume }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  const [showGithubDropdown, setShowGithubDropdown] = useState(false);
  const githubDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (githubDropdownRef.current && !githubDropdownRef.current.contains(event.target)) {
        setShowGithubDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ submitting: false, submitted: false, error: 'Please fill in all required fields.' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ submitting: false, submitted: false, error: 'Please enter a valid email address.' });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${portfolioData.personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Contact Message from ${formData.name}`,
          _captcha: 'false'
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok || data.success === 'true' || data.success === true) {
        setStatus({
          submitting: false,
          submitted: true,
          error: null,
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message.');
      }
    } catch (err) {
      console.warn('Form submission fallback:', err);
      window.location.href = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent('Portfolio Contact from ' + formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
      
      setStatus({
        submitting: false,
        submitted: true,
        error: null,
      });
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-32 bg-[#F7F7F3] dark:bg-[#121212] border-t border-[#E8E8E3] dark:border-[#242424] transition-colors duration-300">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <ScrollReveal animation="slide-right" delay={0} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="pixel-badge">
                  GET IN TOUCH
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111111] dark:text-white leading-tight">
                Have a project in mind?
              </h2>

              <p className="text-xs sm:text-base text-[#555555] dark:text-[#A0A0A0] mt-2 sm:mt-4 leading-relaxed">
                I'm currently open to internship opportunities, collaborations, and interesting IT projects. Feel free to reach out and let's build something together.
              </p>

              <div className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-4">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="flex items-center gap-3 sm:gap-3.5 text-sm text-[#333333] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white transition-colors group min-w-0"
                >
                  <div className="w-9 h-9 rounded-full bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2C2C2C] flex items-center justify-center text-[#111111] dark:text-white group-hover:border-[#111111] dark:group-hover:border-white transition-colors flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] sm:text-[11px] uppercase font-bold text-[#888888] dark:text-[#777777]">Email</span>
                    <span className="font-medium text-xs sm:text-sm break-all sm:break-normal">{portfolioData.personal.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${portfolioData.personal.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 sm:gap-3.5 text-sm text-[#333333] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white transition-colors group min-w-0"
                  title="Call Primary Phone"
                >
                  <div className="w-9 h-9 rounded-full bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2C2C2C] flex items-center justify-center text-[#111111] dark:text-white group-hover:border-[#111111] dark:group-hover:border-white transition-colors flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] sm:text-[11px] uppercase font-bold text-[#888888] dark:text-[#777777]">
                      {portfolioData.personal.secondaryPhone ? 'Phone (Primary)' : 'Phone'}
                    </span>
                    <span className="font-medium text-xs sm:text-sm">{portfolioData.personal.phone}</span>
                  </div>
                </a>

                {portfolioData.personal.secondaryPhone && (
                  <a
                    href={`tel:${portfolioData.personal.secondaryPhone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 sm:gap-3.5 text-sm text-[#333333] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white transition-colors group min-w-0"
                    title="Call Secondary Phone"
                  >
                    <div className="w-9 h-9 rounded-full bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2C2C2C] flex items-center justify-center text-[#111111] dark:text-white group-hover:border-[#111111] dark:group-hover:border-white transition-colors flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] sm:text-[11px] uppercase font-bold text-[#888888] dark:text-[#777777]">
                        Phone (Secondary)
                      </span>
                      <span className="font-medium text-xs sm:text-sm">{portfolioData.personal.secondaryPhone}</span>
                    </div>
                  </a>
                )}

                <div className="flex items-center gap-3 sm:gap-3.5 text-sm text-[#333333] dark:text-[#CCCCCC] min-w-0">
                  <div className="w-9 h-9 rounded-full bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2C2C2C] flex items-center justify-center text-[#111111] dark:text-white flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] sm:text-[11px] uppercase font-bold text-[#888888] dark:text-[#777777]">Location</span>
                    <span className="font-medium text-xs sm:text-sm">{portfolioData.personal.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-[#E8E8E3] dark:border-[#242424] mt-6 sm:mt-8 flex flex-col gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] dark:text-[#777777]">
                Profiles & Repositories
              </span>
              
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2C2C2C] text-xs font-semibold text-[#444444] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white hover:border-[#111111] dark:hover:border-white transition-all shadow-2xs group cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5] group-hover:scale-105 transition-transform" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </a>

                <div className="relative" ref={githubDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowGithubDropdown(!showGithubDropdown)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2C2C2C] text-xs font-semibold text-[#444444] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white hover:border-[#111111] dark:hover:border-white transition-all shadow-2xs cursor-pointer ${
                      showGithubDropdown ? 'border-[#111111] dark:border-white bg-[#F7F7F3] dark:bg-[#202020] text-[#111111] dark:text-white' : ''
                    }`}
                    aria-label="GitHub Profiles (Personal & School)"
                    aria-expanded={showGithubDropdown}
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Accounts</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showGithubDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showGithubDropdown && (
                    <div className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 bottom-full mb-2 w-72 sm:w-80 max-w-[calc(100vw-2.5rem)] bg-white dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2C2C2C] shadow-2xl rounded-2xl p-2 z-50 animate-scaleUp text-left">
                      <div className="px-3 py-1.5 border-b border-[#F0F0EB] dark:border-[#262626] mb-1 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] dark:text-[#777777]">
                          GitHub Profiles
                        </span>
                        <span className="text-[10px] text-[#999999] dark:text-[#666666]">
                          2 accounts
                        </span>
                      </div>

                      <a
                        href={portfolioData.personal.githubAccounts?.personal?.url || portfolioData.personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowGithubDropdown(false)}
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

                      <a
                        href={portfolioData.personal.githubAccounts?.school?.url || "https://github.com/jennyhernandez"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowGithubDropdown(false)}
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
                            {portfolioData.personal.githubAccounts?.school?.description || "Academic coursework & university projects"}
                          </p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-[#888888] group-hover/item:text-[#111111] dark:group-hover/item:text-white flex-shrink-0 mt-1" />
                      </a>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-xs group cursor-pointer"
                  title="View Jenny's Formal Resume"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-left" delay={150} className="lg:col-span-7">
            <div className="bg-white dark:bg-[#141414] p-4 sm:p-6 md:p-8 rounded-xl border border-[#E8E8E3] dark:border-[#262626] shadow-subtle">
              {status.submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] dark:text-white">Message Sent Successfully!</h3>
                  <p className="text-xs sm:text-sm text-[#666666] dark:text-[#AAAAAA] max-w-md mx-auto">
                    Thank you for reaching out. Jenny will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                    className="btn-secondary text-xs mt-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#555555] dark:text-[#AAAAAA] mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Smith"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F7F3] dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2E2E2E] text-xs sm:text-sm text-[#111111] dark:text-white placeholder-[#999999] focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#555555] dark:text-[#AAAAAA] mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F7F3] dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2E2E2E] text-xs sm:text-sm text-[#111111] dark:text-white placeholder-[#999999] focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#555555] dark:text-[#AAAAAA] mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Jenny, I'd like to talk about..."
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F7F3] dark:bg-[#181818] border border-[#E8E8E3] dark:border-[#2E2E2E] text-xs sm:text-sm text-[#111111] dark:text-white placeholder-[#999999] focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors resize-none"
                    />
                  </div>

                  {status.error && (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{status.error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="btn-primary w-full py-3 text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {status.submitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
