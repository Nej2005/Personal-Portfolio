import React, { useState } from 'react';

export default function RobotAvatar({ className = "w-8 h-8", hasOnlineDot = true }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-flex items-center justify-center flex-shrink-0 cursor-pointer"
    >
      <div className={`rounded-full bg-[#F7F7F5] dark:bg-[#222222] border border-[#E8E8E3] dark:border-[#333333] overflow-hidden flex items-center justify-center shadow-xs p-1 ${className}`}>
        {/* Light Mode Avatar */}
        <img
          src={isHovered ? "/images/chatbot-hover.png" : "/images/chatbot-initial.png"}
          alt="Jenny AI Avatar"
          className="w-full h-full object-contain transition-all duration-200 dark:hidden"
        />
        {/* Dark Mode Avatar (White Artwork) */}
        <img
          src={isHovered ? "/images/chatbot-hover-dark.png" : "/images/chatbot-initial-dark.png"}
          alt="Jenny AI Avatar"
          className="w-full h-full object-contain transition-all duration-200 hidden dark:block"
        />
      </div>
      {hasOnlineDot && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#222222] ring-0" />
      )}
    </div>
  );
}
