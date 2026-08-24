import React from 'react';
import { Loader2, Volume2, Bot } from 'lucide-react';

export default function AIStatus({ status }) {
  if (!status) return null;

  let label = 'Thinking...';
  if (status === 'generating') label = 'Formulating response...';
  if (status === 'speaking') label = 'Playing voice response...';
  if (status === 'error') label = 'Voice playback temporarily unavailable.';

  return (
    <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-[#F7F7F3] border border-[#E8E8E3] text-xs text-[#555555] w-fit animate-fadeIn">
      {status === 'speaking' ? (
        <Volume2 className="w-3.5 h-3.5 text-[#111111] animate-pulse" />
      ) : (
        <Loader2 className="w-3.5 h-3.5 text-[#111111] animate-spin" />
      )}
      <span className="font-medium">{label}</span>
    </div>
  );
}
