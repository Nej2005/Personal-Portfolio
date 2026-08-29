import React from 'react';

export default function RobotAvatar({ className = "w-8 h-8", hasOnlineDot = true }) {
  return (
    <div className="relative inline-flex items-center justify-center flex-shrink-0 cursor-pointer">
      <div className={`rounded-full bg-[#F7F7F5] dark:bg-[#222222] border border-[#E8E8E3] dark:border-[#333333] overflow-hidden flex items-center justify-center shadow-xs p-0.5 ${className}`}>
        {/* Light Mode Avatar */}
        <img
          src="/images/chatbot-hover.png"
          alt="Jenny AI Avatar"
          className="w-full h-full object-contain dark:hidden"
        />
        {/* Dark Mode Avatar (White Artwork) */}
        <img
          src="/images/chatbot-hover-dark.png"
          alt="Jenny AI Avatar"
          className="w-full h-full object-contain hidden dark:block"
        />
      </div>
      {hasOnlineDot && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#222222] ring-0" />
      )}
    </div>
  );
}
