import React from 'react';

export const techSvgMap = {
  javascript: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth="1.8" />
      <path d="M10 9v5.5a2.5 2.5 0 0 1-4.5 1.5" />
      <path d="M17.5 10c-.8-.7-2.2-.7-3 0a1.3 1.3 0 0 0 0 2c.8.7 2.2.7 3 0a1.3 1.3 0 0 1 0 2c-.8.7-2.2.7-3 0" />
    </svg>
  ),
  typescript: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth="1.8" />
      <path d="M7 9h4M9 9v7" />
      <path d="M17.5 10c-.8-.7-2.2-.7-3 0a1.3 1.3 0 0 0 0 2c.8.7 2.2.7 3 0a1.3 1.3 0 0 1 0 2c-.8.7-2.2.7-3 0" />
    </svg>
  ),
  react: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="12" rx="8.5" ry="3.2" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="8.5" ry="3.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="8.5" ry="3.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  nodejs: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2.5L3.5 7.4v9.2L12 21.5l8.5-4.9V7.4L12 2.5z" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 7.5v9" />
    </svg>
  ),
  nextjs: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8v8" />
      <path d="M15 8v8" />
      <path d="M9 8l6 8" strokeWidth="2" />
    </svg>
  ),
  express: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="M6.5 10h3.5M6.5 14h3.5M6.5 12h2.5" />
      <path d="M14 9.5l3.5 5M17.5 9.5l-3.5 5" />
    </svg>
  ),
  html5: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 3l1.5 15.5L12 21l6.5-2.5L20 3H4z" />
      <path d="M16 7.5H8l.5 4h7l-.5 4.5-3 1-3-1-.2-2" />
    </svg>
  ),
  css3: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 3l1.5 15.5L12 21l6.5-2.5L20 3H4z" />
      <path d="M16 7.5H8l.5 4h7l-.5 4.5-3 1-3-1" />
    </svg>
  ),
  tailwindcss: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.5.8 2.2 1.6C13.6 11.8 15 13 18 13c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.5-.8-2.2-1.6C16.4 7.2 15 6 12 6zM6 13c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.5.8 2.2 1.6C7.6 18.8 9 20 12 20c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.5-.8-2.2-1.6C10.4 14.2 9 13 6 13z" />
    </svg>
  ),
  postgresql: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="7" rx="8" ry="4" />
      <path d="M4 7v10c0 2.2 3.6 4 8 4s8-1.8 8-4V7" />
      <path d="M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4" />
    </svg>
  ),
  sql: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="6" rx="8" ry="3.5" />
      <path d="M4 6v6c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5V6" />
      <path d="M4 12v6c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5v-6" />
    </svg>
  ),
  php: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="12" rx="9.5" ry="6" />
      <path d="M7 10h2.5a1.5 1.5 0 0 1 0 3H7v2" />
      <path d="M12 10v5M12 12.5h2" />
      <path d="M15 10h2.5a1.5 1.5 0 0 1 0 3H15v2" />
    </svg>
  ),
  java: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
      <path d="M6 2c.5 1.5-1 2.5 0 4M10 2c.5 1.5-1 2.5 0 4M14 2c.5 1.5-1 2.5 0 4" />
    </svg>
  )
};
