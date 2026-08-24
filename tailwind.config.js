/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: '#FFFFFF',
          section: '#F7F7F3',
          card: '#FFFFFF',
          primary: '#111111',
          secondary: '#6B6B6B',
          muted: '#8E8E93',
          border: '#E8E8E3',
          'border-subtle': '#F0F0EB',
          badge: '#F2F2EC',
          hover: '#F5F5F0',
          dark: '#111111',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        pixel: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        silkscreen: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'subtle': '6px',
        'pixel': '2px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'subtle-hover': '0 6px 16px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03)',
        'panel': '0 20px 40px rgba(0,0,0,0.1)',
        'pixel': '3px 3px 0px 0px #111111',
        'pixel-sm': '2px 2px 0px 0px #111111',
        'pixel-dark': '3px 3px 0px 0px #EDEDED',
      }
    },
  },
  plugins: [],
}
