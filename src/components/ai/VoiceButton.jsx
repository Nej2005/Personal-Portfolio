import React from 'react';
import { Volume2, Square } from 'lucide-react';

export default function VoiceButton({ isSpeaking, onToggle, disabled }) {
  if (disabled) return null;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all cursor-pointer shadow-2xs active:scale-95 ${
        isSpeaking
          ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] border-[#111111] dark:border-white animate-pulse'
          : 'bg-[#F7F7F5] dark:bg-[#222222] text-[#444444] dark:text-[#CCCCCC] border-[#E8E8E3] dark:border-[#333333] hover:text-[#111111] dark:hover:text-white hover:border-[#111111] dark:hover:border-white'
      }`}
      aria-label={isSpeaking ? "Stop AI response audio" : "Read AI response aloud"}
      title={isSpeaking ? "Stop voice audio" : "Read response aloud"}
    >
      {isSpeaking ? (
        <>
          <Square className="w-3 h-3 fill-current" />
          <span>Stop Voice</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5" />
          <span>Read aloud</span>
        </>
      )}
    </button>
  );
}
