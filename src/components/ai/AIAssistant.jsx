import React, { useState, useEffect, useRef } from 'react';
import { X, MoreHorizontal, RotateCcw, MoveDiagonal2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import RobotAvatar from './RobotAvatar';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';
import AIStatus from './AIStatus';
import { sendChatMessage, speakText, stopSpeaking } from '../../services/aiService';

export default function AIAssistant({ isOpen, onClose, bottomOffset = 24 }) {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState(null); // 'thinking' | 'generating' | 'speaking' | null
  const [speakingText, setSpeakingText] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);

  // Dynamic resizable dimensions (default: 380px x 540px)
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 640;
      return {
        width: isMobile ? Math.min(window.innerWidth - 24, 380) : 380,
        height: isMobile ? 480 : 540,
      };
    }
    return { width: 380, height: 540 };
  });
  const [isResizing, setIsResizing] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0, startWidth: 380, startHeight: 540 });

  const handleResizeStart = (clientX, clientY) => {
    setIsResizing(true);
    startPosRef.current = {
      x: clientX,
      y: clientY,
      startWidth: dimensions.width,
      startHeight: dimensions.height,
    };

    const handleMove = (currentX, currentY) => {
      const deltaX = startPosRef.current.x - currentX; // Dragging left increases width
      const deltaY = startPosRef.current.y - currentY; // Dragging up increases height

      const minWidth = Math.min(300, window.innerWidth - 24);
      const maxWidth = Math.min(750, window.innerWidth - 24);
      const minHeight = 380;
      const maxHeight = Math.min(850, window.innerHeight - 110);

      const nextWidth = Math.max(minWidth, Math.min(maxWidth, startPosRef.current.startWidth + deltaX));
      const nextHeight = Math.max(minHeight, Math.min(maxHeight, startPosRef.current.startHeight + deltaY));

      setDimensions({ width: nextWidth, height: nextHeight });
    };

    const onMouseMove = (e) => {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      setIsResizing(false);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, status, isOpen]);

  const handleClose = () => {
    stopSpeaking();
    setSpeakingText(null);
    setShowMenu(false);
    onClose();
  };

  const handleClear = () => {
    stopSpeaking();
    setSpeakingText(null);
    setMessages([]);
    setStatus(null);
    setShowMenu(false);
  };

  const handleSendMessage = async (userText) => {
    if (!userText.trim()) return;

    const newMsgList = [...messages, { role: 'user', content: userText }];
    setMessages(newMsgList);
    setStatus('generating');

    try {
      const response = await sendChatMessage(newMsgList, userText);
      
      const assistantMessage = {
        role: 'assistant',
        content: response.reply || "I couldn't process that query.",
        model: response.model,
        navLinks: response.navLinks
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setStatus(null);
    } catch (err) {
      console.error(err);
      setStatus(null);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I ran into an issue connecting to the AI service. Please try asking again in a moment.",
        }
      ]);
    }
  };

  const handleSpeak = (text) => {
    if (speakingText === text) {
      stopSpeaking();
      setSpeakingText(null);
      setStatus(null);
    } else {
      setSpeakingText(text);
      setStatus('speaking');
      speakText(
        text,
        () => setStatus('speaking'),
        () => {
          setSpeakingText(null);
          setStatus(null);
        },
        (err) => {
          console.warn(err);
          setSpeakingText(null);
          setStatus(null);
        }
      );
    }
  };

  const handleNavigate = (targetSelector) => {
    handleClose();
    setTimeout(() => {
      const el = document.querySelector(targetSelector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed right-3 left-3 sm:left-auto sm:right-6 z-50 transition-[bottom] duration-150 ease-out ${isResizing ? 'select-none pointer-events-auto' : ''}`}
      style={{ bottom: `${bottomOffset + 70}px` }}
    >
      <div 
        className="relative animate-scaleUp"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          maxWidth: 'calc(100vw - 24px)',
          maxHeight: 'calc(100vh - 100px)',
        }}
      >
        {/* Top-Left Corner Sleek Draggable Resize Handle */}
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            handleResizeStart(e.clientX, e.clientY);
          }}
          onTouchStart={(e) => {
            if (e.touches && e.touches[0]) {
              handleResizeStart(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          className={`absolute -top-2 -left-2 z-50 w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center cursor-nwse-resize select-none touch-none transition-all duration-150 shadow-sm border-2 border-white dark:border-[#141414] group/handle ${
            isResizing
              ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] scale-110'
              : 'bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:scale-110 active:scale-95'
          }`}
          title="Click & drag to resize chatbox"
          aria-label="Resize chat window"
        >
          <MoveDiagonal2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          
          {/* Floating Tooltip on hover */}
          <span className="absolute left-full ml-2 px-1.5 py-0.5 bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-[9px] font-medium rounded whitespace-nowrap opacity-0 group-hover/handle:opacity-100 transition-opacity pointer-events-none shadow-sm hidden sm:inline-block">
            resize
          </span>
        </div>

        {/* Main Chat Modal Container */}
        <div className="w-full h-full bg-white dark:bg-[#141414] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E8E8E3] dark:border-[#282828] overflow-hidden flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-[#F0F0EB] dark:border-[#222222] flex items-center justify-between bg-white dark:bg-[#141414] relative">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <RobotAvatar className="w-7 h-7 sm:w-8 sm:h-8" hasOnlineDot={true} />
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xs sm:text-sm font-bold text-[#111111] dark:text-white leading-none">
                    Nini
                  </h2>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full border border-neutral-200 dark:border-neutral-700">
                    AI
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-[#888888] dark:text-[#777777] font-medium mt-1 block leading-none">
                  Jenny's Assistant
                </span>
              </div>
            </div>

          {/* Header Controls */}
          <div className="flex items-center gap-1 relative">
            {/* Options Menu Button */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-full text-[#777777] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white hover:bg-[#F2F2EC] dark:hover:bg-[#222222] transition-colors cursor-pointer"
              aria-label="Options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-8 top-8 bg-white dark:bg-[#1C1C1C] border border-[#E8E8E3] dark:border-[#333333] shadow-lg rounded-xl py-1 w-36 z-30 animate-fadeIn text-xs">
                <button
                  onClick={handleClear}
                  className="w-full text-left px-3.5 py-2 hover:bg-[#F7F7F3] dark:hover:bg-[#282828] flex items-center gap-2 text-[#333333] dark:text-[#EDEDED] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Chat</span>
                </button>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full text-[#777777] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white hover:bg-[#F2F2EC] dark:hover:bg-[#222222] transition-colors cursor-pointer"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages / Suggested Questions Body */}
        <div className="flex-1 px-3.5 sm:px-5 py-3 sm:py-4 overflow-y-auto bg-white dark:bg-[#141414] space-y-3 sm:space-y-3.5">
          
          {/* Welcome Card */}
          <div className="p-4 rounded-2xl bg-[#F7F7F5] dark:bg-[#1C1C1C] border border-transparent space-y-1.5">
            <p className="text-xs text-[#333333] dark:text-[#EDEDED] leading-relaxed font-semibold">
              👋 Hi! I'm Nini, Jenny's AI assistant.
            </p>
            <p className="text-xs text-[#555555] dark:text-[#AAAAAA] leading-relaxed">
              Ask me anything about her systems, technical skills, certifications, or academic journey at PLP.
            </p>
          </div>

          {/* Suggested Questions List (Shown if no messages or at start) */}
          {messages.length === 0 && (
            <>
              <SuggestedQuestions onSelectQuestion={handleSendMessage} />

              {/* Divider: or ask anything */}
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-[#EDEDE8] dark:border-[#262626] w-full" />
                <span className="bg-white dark:bg-[#141414] px-3 text-[11px] text-[#999999] dark:text-[#666666] absolute font-medium">
                  or ask anything
                </span>
              </div>
            </>
          )}

          {/* Conversation Messages */}
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              isSpeaking={speakingText === msg.content}
              onSpeak={handleSpeak}
              onNavigate={handleNavigate}
            />
          ))}

          {/* AI Status Loader */}
          {status && <AIStatus status={status} />}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer Area: Clean Input */}
        <div className="p-3 sm:p-3.5 bg-white dark:bg-[#141414] border-t border-[#F0F0EB] dark:border-[#222222]">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={status === 'generating'} 
          />
        </div>

        </div>
      </div>
    </div>
  );
}
