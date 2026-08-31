import React, { useState, useEffect } from 'react';
import { X, Download, Award, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CertificateModal({ certificate, onClose }) {
  const isMulti = certificate && certificate.sessions && certificate.sessions.length > 0;
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (certificate && certificate.activeSessionIdx !== undefined) {
      setActiveIdx(certificate.activeSessionIdx);
    } else {
      setActiveIdx(0);
    }
  }, [certificate]);

  if (!certificate) return null;

  const currentItem = isMulti ? certificate.sessions[activeIdx] : certificate;
  const totalSessions = isMulti ? certificate.sessions.length : 1;

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? totalSessions - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === totalSessions - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-[#141414] rounded-xl max-w-3xl w-full max-h-[92vh] border border-[#E8E8E3] dark:border-[#2C2C2C] shadow-2xl overflow-hidden animate-scaleUp flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3.5 sm:p-5 border-b border-[#E8E8E3] dark:border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-full bg-[#F7F7F3] dark:bg-[#222222] border border-[#E8E8E3] dark:border-[#333333] flex items-center justify-center text-[#111111] dark:text-white flex-shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[#111111] dark:text-white leading-tight truncate">
                {currentItem.title || currentItem.name || certificate.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#666666] dark:text-[#999999] mt-0.5 truncate">
                Issued by {currentItem.issuer || certificate.issuer} • {currentItem.year || certificate.year}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#666666] dark:text-[#999999] hover:text-black dark:hover:text-white hover:bg-[#F2F2EC] dark:hover:bg-[#222222] transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative p-3 sm:p-6 bg-[#F9F9F6] dark:bg-[#101010] min-h-[220px] max-h-[50vh] sm:max-h-[62vh] overflow-hidden flex flex-col items-center justify-center text-center">
          {currentItem.imagePreview ? (
            <img
              key={currentItem.imagePreview}
              src={currentItem.imagePreview}
              alt={currentItem.title || currentItem.name || certificate.name}
              className="max-h-[45vh] sm:max-h-[55vh] w-auto rounded-lg shadow-sm border border-[#E8E8E3] dark:border-[#2A2A2A] object-contain animate-fadeIn"
            />
          ) : (
            <div className="p-6 sm:p-8 max-w-md bg-white dark:bg-[#181818] rounded-lg border border-[#E8E8E3] dark:border-[#2C2C2C] shadow-sm">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-[#111111] dark:text-white mx-auto mb-3" />
              <h4 className="text-sm sm:text-base font-semibold text-[#111111] dark:text-white">{currentItem.title || currentItem.name}</h4>
              <p className="text-xs text-[#666666] dark:text-[#999999] mt-1">{currentItem.issuer}</p>
              <div className="mt-3 sm:mt-4 inline-block px-3 py-1 bg-[#F7F7F3] dark:bg-[#222222] rounded text-xs font-mono font-medium border border-[#E8E8E3] dark:border-[#333333]">
                Official Credential Verified
              </div>
            </div>
          )}

          {isMulti && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous certificate"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 dark:bg-[#202020]/95 text-[#111111] dark:text-white shadow-lg border border-[#E8E8E3] dark:border-[#333333] flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next certificate"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 dark:bg-[#202020]/95 text-[#111111] dark:text-white shadow-lg border border-[#E8E8E3] dark:border-[#333333] flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-20"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20 bg-black/50 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                {certificate.sessions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`Go to certificate ${idx + 1}`}
                    className={`rounded-full transition-all duration-200 ${
                      idx === activeIdx
                        ? 'w-4 sm:w-5 h-1.5 sm:h-2 bg-white'
                        : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-3.5 sm:p-4 border-t border-[#E8E8E3] dark:border-[#262626] bg-white dark:bg-[#141414] flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#777777] dark:text-[#888888] font-medium">
              Category: <strong className="text-[#222222] dark:text-[#EDEDED]">{certificate.badge || 'Professional Credential'}</strong>
            </span>
            {isMulti && (
              <span className="text-xs text-[#888888] dark:text-[#777777] font-mono ml-2 border-l border-[#E8E8E3] dark:border-[#2C2C2C] pl-2">
                Session {activeIdx + 1} of {totalSessions}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {currentItem.fileUrl && currentItem.fileUrl !== '#' && (
              <a
                href={currentItem.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs inline-flex items-center gap-1.5 py-1.5 px-3.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Open File</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="btn-primary text-xs py-1.5 px-4"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
