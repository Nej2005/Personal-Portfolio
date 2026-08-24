import React, { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function SuggestedQuestions({ onSelectQuestion }) {
  // Pick 2 random distinct questions on every refresh / page load
  const randomQuestions = useMemo(() => {
    const pool = portfolioData.suggestedQuestions || [];
    if (pool.length <= 2) return pool;
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 2);
  }, []);

  return (
    <div className="space-y-2 pt-1 pb-1">
      {randomQuestions.map((q, idx) => (
        <button
          key={idx}
          onClick={() => onSelectQuestion(q)}
          className="w-full group text-left text-xs bg-white dark:bg-[#181818] text-[#222222] dark:text-[#EDEDED] hover:text-[#111111] dark:hover:text-white hover:bg-[#F9F9F7] dark:hover:bg-[#222222] border border-[#E8E8E3] dark:border-[#282828] hover:border-[#CCCCCC] dark:hover:border-[#3E3E3E] py-2.5 px-4 rounded-full transition-all duration-150 flex items-center justify-between shadow-xs active:scale-[0.99] cursor-pointer"
        >
          <span className="font-medium pr-2 truncate">{q}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#888888] dark:text-[#777777] group-hover:text-[#111111] dark:group-hover:text-white transition-colors flex-shrink-0" />
        </button>
      ))}
    </div>
  );
}
