import React, { useState } from 'react';
import { Bot, User, Copy, Check, ExternalLink } from 'lucide-react';
import VoiceButton from './VoiceButton';

export default function ChatMessage({
  message,
  onSpeak,
  isSpeaking,
  voiceEnabled,
  onNavigate
}) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderFormattedContent = (content) => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc my-1">
            <span dangerouslySetInnerHTML={{
              __html: line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} />
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={idx} className="my-1.5 font-medium">
            <span dangerouslySetInnerHTML={{
              __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} />
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="my-1">
          <span dangerouslySetInnerHTML={{
            __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }} />
        </p>
      );
    });
  };

  if (isUser) {
    return (
      <div className="flex justify-end gap-2.5 my-3">
        <div className="max-w-[85%] bg-[#111111] dark:bg-white text-white dark:text-[#111111] px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs shadow-sm">
          {message.content}
        </div>
        <div className="w-7 h-7 rounded-full bg-[#E8E8E3] dark:bg-[#2A2A2A] text-[#111111] dark:text-white flex items-center justify-center flex-shrink-0 text-xs font-semibold">
          <User className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 my-3.5">
      <div className="w-7 h-7 rounded-full bg-[#F7F7F5] dark:bg-[#222222] border border-[#E8E8E3] dark:border-[#333333] overflow-hidden flex items-center justify-center flex-shrink-0 mt-0.5 p-0.5 shadow-xs">
        <img
          src="/images/chatbot-hover.png"
          alt="Nini AI"
          className="w-full h-full object-contain dark:hidden"
        />
        <img
          src="/images/chatbot-hover-dark.png"
          alt="Nini AI"
          className="w-full h-full object-contain hidden dark:block"
        />
      </div>

      <div className="flex-1 max-w-[90%] bg-white dark:bg-[#1C1C1C] border border-[#E8E8E3] dark:border-[#2C2C2C] rounded-2xl rounded-tl-sm p-3.5 text-xs text-[#222222] dark:text-[#EDEDED] shadow-subtle">
        <div className="text-[10px] font-bold tracking-wider text-[#888888] dark:text-[#777777] uppercase mb-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[#111111] dark:text-white font-bold">Nini</span>
            <span className="text-[9px] px-1 py-0.2 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded font-mono">AI</span>
          </div>
          {message.model && (
            <span className="font-mono font-normal text-[9px] text-[#AAAAAA] dark:text-[#666666]">{message.model}</span>
          )}
        </div>

        <div className="text-xs leading-relaxed text-[#222222] dark:text-[#EDEDED]">
          {renderFormattedContent(message.content)}
        </div>

        {message.navLinks && message.navLinks.length > 0 && (
          <div className="mt-3 pt-2 border-t border-[#F0F0EB] dark:border-[#282828] flex flex-wrap gap-1.5">
            {message.navLinks.map((nav, i) => (
              <button
                key={i}
                onClick={() => onNavigate && onNavigate(nav.target)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F7F7F3] dark:bg-[#252525] hover:bg-[#EAEAE5] dark:hover:bg-[#303030] text-[11px] font-medium text-[#111111] dark:text-white border border-[#E8E8E3] dark:border-[#333333] transition-colors cursor-pointer"
              >
                <span>{nav.label}</span>
                <ExternalLink className="w-3 h-3 text-[#777777]" />
              </button>
            ))}
          </div>
        )}

        <div className="mt-2.5 pt-2 border-t border-[#F0F0EB] dark:border-[#282828] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <VoiceButton
              isSpeaking={isSpeaking}
              onToggle={() => onSpeak(message.content)}
            />
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-[11px] text-[#777777] dark:text-[#888888] hover:text-[#111111] dark:hover:text-white transition-colors p-1 cursor-pointer"
            title="Copy message text"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
