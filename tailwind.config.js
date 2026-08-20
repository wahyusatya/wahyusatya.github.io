/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#07090e',
          deep: '#0b0f17',
          surface: '#111723',
          elevated: '#182030',
        },
        cyan: {
          primary: '#06b6d4',
          glow: '#22d3ee',
          subtle: 'rgba(6, 182, 212, 0.15)',
        },
        violet: {
          primary: '#8b5cf6',
          glow: '#a78bfa',
          subtle: 'rgba(139, 92, 246, 0.15)',
        },
        emerald: {
          primary: '#10b981',
          subtle: 'rgba(16, 185, 129, 0.15)',
        },
        amber: {
          primary: '#f59e0b',
          subtle: 'rgba(245, 158, 11, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(6, 182, 212, 0.25)',
        'violet-glow': '0 0 25px rgba(139, 92, 246, 0.25)',
        'elevated': '0 16px 36px -6px rgba(0, 0, 0, 0.75)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
