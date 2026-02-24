/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Industrial palette
        slate: {
          950: '#0a0e14',
        },
        command: {
          bg: '#0f1419',
          header: '#1a1f2e',
          panel: '#f5f5f0',
          'panel-dark': '#e8e8e3',
          surface: '#161b26',
          border: '#2a3040',
          'border-light': '#d4d4cf',
          text: '#f0f0eb',
          'text-muted': '#8a8f9a',
          accent: '#3b82f6',
        },
        status: {
          green: '#22c55e',
          amber: '#f59e0b',
          red: '#ef4444',
          'green-bg': 'rgba(34, 197, 94, 0.1)',
          'amber-bg': 'rgba(245, 158, 11, 0.1)',
          'red-bg': 'rgba(239, 68, 68, 0.1)',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'sm': '2px',
        DEFAULT: '3px',
        'md': '4px',
      },
    },
  },
  plugins: [],
};
