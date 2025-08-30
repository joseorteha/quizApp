/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: 'var(--terminal-bg)',
          text: 'var(--terminal-text)',
          green: 'var(--terminal-green)',
          blue: 'var(--terminal-blue)',
          purple: 'var(--terminal-purple)',
          yellow: 'var(--terminal-yellow)',
          red: 'var(--terminal-red)',
          prompt: 'var(--terminal-prompt)',
          cursor: 'var(--terminal-cursor)',
          selection: 'var(--terminal-selection)',
          border: 'var(--terminal-border)',
          header: 'var(--terminal-header)',
        },
      },
      fontFamily: {
        mono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};