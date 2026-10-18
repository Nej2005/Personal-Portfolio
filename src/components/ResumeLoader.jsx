import React, { useEffect, useState } from 'react';
import { portfolioData } from '../data/portfolioData';

const STEPS = {
  entering: ['Fetching document', 'Rendering pages', 'Almost there'],
  exiting: ['Closing resume', 'Restoring portfolio', 'Welcome back'],
};

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function ResumeLoader({ mode = 'entering', duration = 1100, leaving = false }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setElapsed(t);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mode, duration]);

  const progress = easeOutCubic(elapsed) * 100;
  const steps = STEPS[mode];
  const stepIndex = Math.min(Math.floor(elapsed * steps.length), steps.length - 1);
  const isExiting = mode === 'exiting';

  return (
    <div
      className={`resume-loader fixed inset-0 z-50 flex items-center justify-center bg-[#F5F5F0] dark:bg-[#0D0D0D] transition-opacity duration-300 ${
        leaving ? 'opacity-0 pointer-events-none' : 'opacity-100 loader-fade-in'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,#F5F5F0_75%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_30%,#0D0D0D_75%)]" />

      <div className="relative flex flex-col items-center px-4 loader-rise">
        <div className="relative mb-9 loader-float">
          <div className="absolute inset-x-3 -bottom-3 h-full rounded-xl bg-white/60 dark:bg-[#141414]/60 border border-[#E2E2DC] dark:border-[#242424] rotate-[-4deg]" />

          <div className="relative w-32 h-40 rounded-xl bg-white dark:bg-[#141414] border border-[#E2E2DC] dark:border-[#2A2A2A] shadow-panel dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] p-3.5 overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-[#111111] dark:bg-white flex-shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-3/4 rounded-full bg-[#111111] dark:bg-white loader-line" style={{ animationDelay: '0ms', animationDirection: isExiting ? 'reverse' : 'normal' }} />
                <div className="h-1 w-1/2 rounded-full bg-[#CFCFC8] dark:bg-[#3A3A3A] loader-line" style={{ animationDelay: '80ms', animationDirection: isExiting ? 'reverse' : 'normal' }} />
              </div>
            </div>

            {[100, 85, 92, 0, 70, 95, 60].map((w, i) =>
              w === 0 ? (
                <div key={i} className="h-px w-full bg-[#ECECE6] dark:bg-[#262626] my-2.5" />
              ) : (
                <div
                  key={i}
                  className="h-1 rounded-full bg-[#DCDCD5] dark:bg-[#333333] mb-1.5 loader-line"
                  style={{ width: `${w}%`, animationDelay: `${160 + i * 70}ms`, animationDirection: isExiting ? 'reverse' : 'normal' }}
                />
              )
            )}

            <div className="absolute inset-x-0 h-10 loader-scan bg-gradient-to-b from-transparent via-[#111111]/[0.06] to-transparent dark:via-white/[0.07]" />
          </div>

          <div className="absolute -right-5 -bottom-5 w-14 h-14 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full loader-orbit text-[#111111] dark:text-white" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="26" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1.5" />
              <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="40 124" />
            </svg>
            <div className="w-10 h-10 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-display font-extrabold text-sm flex items-center justify-center shadow-lg ring-4 ring-[#F5F5F0] dark:ring-[#0D0D0D]">
              {portfolioData.personal.initials}
            </div>
          </div>
        </div>

        <span className="pixel-badge mb-3">{isExiting ? 'Portfolio' : 'Resume'}</span>

        <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#111111] dark:text-white">
          {isExiting ? 'Returning to Portfolio' : 'Opening Resume'}
          <span className="loader-caret inline-block w-[2px] h-[1em] ml-1 align-[-0.12em] bg-[#111111] dark:bg-white" />
        </h2>

        <p key={steps[stepIndex]} className="mt-1.5 h-4 text-[11px] font-mono text-[#6B6B6B] dark:text-[#999999] loader-step">
          {steps[stepIndex]}…
        </p>

        <div className="mt-6 w-56 sm:w-64">
          <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono uppercase tracking-widest text-[#888888] dark:text-[#666666]">
            <span>{isExiting ? 'home' : 'jenny_hernandez_resume.pdf'}</span>
            <span className="tabular-nums text-[#111111] dark:text-white">{Math.round(progress)}%</span>
          </div>
          <div className="relative h-[3px] rounded-full bg-[#DCDCD5] dark:bg-[#262626] overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#111111] dark:bg-white"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-y-0 w-10 loader-shimmer bg-gradient-to-r from-transparent via-white/70 dark:via-black/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
