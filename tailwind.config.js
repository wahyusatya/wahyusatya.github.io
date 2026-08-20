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
          dark: '#090a0d',
          ground: '#0d0f14',
          surface: '#12151c',
          elevated: '#171a23',
        },
        accent: {
          primary: '#3b82f6',
          muted: 'rgba(59, 130, 246, 0.12)',
          hover: '#2563eb',
        },
        slate: {
          text: '#f3f4f6',
          muted: '#9ca3af',
          dim: '#6b7280',
        }
      },
      fontFamily: {
        sans: ['Archivo', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderColor: {
        hairline: 'rgba(255, 255, 255, 0.08)',
        subtle: 'rgba(255, 255, 255, 0.14)',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
