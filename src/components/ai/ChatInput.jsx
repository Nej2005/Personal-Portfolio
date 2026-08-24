import React, { useState, useRef } from 'react';

export default function ChatInput({ onSendMessage, disabled }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question..."
        disabled={disabled}
        className="w-full pl-3.5 sm:pl-4 pr-10 sm:pr-11 py-2.5 sm:py-3 bg-white dark:bg-[#1A1A1A] border border-[#E8E8E3] dark:border-[#2C2C2C] rounded-xl sm:rounded-2xl text-base sm:text-xs text-[#111111] dark:text-white placeholder:text-[#999999] dark:placeholder:text-[#666666] focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors disabled:opacity-50 shadow-2xs"
      />

      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-[#111111] dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all active:scale-90"
        aria-label="Send message"
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-4 h-4"
        >
          <path d="m3 3 3 9-3 9 19-9Z" />
          <path d="M6 12h16" />
        </svg>
      </button>
    </form>
  );
}
