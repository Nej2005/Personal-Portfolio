import React, { useState, useRef } from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CertificationCard({ cert, onView }) {
  const isMulti = cert.isMultiSession && cert.sessions && cert.sessions.length > 0;
  const [activeIdx, setActiveIdx] = useState(0);

  // Touch gesture support for mobile swiping
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentItem = isMulti ? cert.sessions[activeIdx] : cert;
  const totalSessions = isMulti ? cert.sessions.length : 1;

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? totalSessions - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === totalSessions - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isMulti) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext({ stopPropagation: () => {} });
    }
    if (diff < -45) {
      handlePrev({ stopPropagation: () => {} });
    }
  };

  const handleCardClick = () => {
    if (isMulti) {
      onView({
        ...currentItem,
        badge: cert.badge,
        parentName: cert.name,
        sessions: cert.sessions,
        activeSessionIdx: activeIdx
      });
    } else {
      onView(cert);
    }
  };

  return (
    <div className="card-minimal bg-white dark:bg-[#141414] flex flex-col justify-between overflow-hidden group select-none">
      {/* Certificate Image Swiper Container */}
      <div 
        onClick={handleCardClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-44 sm:h-52 bg-[#F7F7F3] dark:bg-[#181818] border-b border-[#E8E8E3] dark:border-[#262626] overflow-hidden cursor-pointer"
      >
        <img
          key={currentItem.imagePreview}
          src={currentItem.imagePreview}
          alt={currentItem.title || currentItem.name}
          className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-105 animate-fadeIn"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Minimal Number Badge for Multi-Session */}
        {isMulti && (
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#111111]/85 dark:bg-white/90 text-white dark:text-[#111111] flex items-center justify-center font-mono font-bold text-[10px] sm:text-xs backdrop-blur-sm shadow-xs">
              {activeIdx + 1}
            </span>
          </div>
        )}

        {/* Swiper Arrow Buttons (for multi-session cards) */}
        {isMulti && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous certificate"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-[#181818]/90 hover:bg-white dark:hover:bg-[#252525] text-[#111111] dark:text-white shadow-md border border-[#E8E8E3] dark:border-[#333333] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-20 opacity-90 sm:opacity-80 hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next certificate"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 dark:bg-[#181818]/90 hover:bg-white dark:hover:bg-[#252525] text-[#111111] dark:text-white shadow-md border border-[#E8E8E3] dark:border-[#333333] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-20 opacity-90 sm:opacity-80 hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Slide Pagination Dots */}
            <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {cert.sessions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIdx(idx);
                  }}
                  aria-label={`Go to certificate ${idx + 1}`}
                  className={`rounded-full transition-all duration-200 ${
                    idx === activeIdx
                      ? 'w-4 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hover overlay hint */}
        {!isMulti && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 dark:bg-[#181818]/95 px-3 py-1.5 rounded-full shadow-md text-xs font-semibold text-[#111111] dark:text-white flex items-center gap-1.5 backdrop-blur-sm">
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header with Category Badge & Year */}
          <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
            {cert.badge ? (
              <span className="text-[10px] sm:text-[11px] font-medium font-mono text-[#555555] dark:text-[#AAAAAA] bg-[#F7F7F3] dark:bg-[#202020] px-2.5 py-0.5 rounded-full border border-[#E8E8E3] dark:border-[#2E2E2E]">
                {cert.badge}
              </span>
            ) : <span />}
            <span className="text-[11px] sm:text-xs text-[#888888] dark:text-[#777777] font-mono">
              {currentItem.year || cert.year}
            </span>
          </div>

          {/* Main Title */}
          <h3 className="text-sm sm:text-base font-bold text-[#111111] dark:text-white group-hover:text-black dark:group-hover:text-white leading-snug">
            {cert.name}
          </h3>

          {/* Subtitle / Session title if multi-session */}
          {isMulti ? (
            <p className="text-xs font-semibold text-[#222222] dark:text-[#EDEDED] mt-1 sm:mt-1.5">
              {currentItem.title}
            </p>
          ) : null}

          {/* Issuing Organization */}
          <p className="text-xs text-[#6B6B6B] dark:text-[#999999] mt-1 font-medium">
            {currentItem.issuer || cert.issuer}
          </p>
        </div>

        {/* Footer Action */}
        <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#F0F0EB] dark:border-[#222222] flex items-center justify-between">
          <button
            onClick={handleCardClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] dark:text-white hover:underline"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Certificate</span>
          </button>

          <span className="text-[10px] sm:text-[11px] text-[#888888] dark:text-[#666666] font-mono">
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}
