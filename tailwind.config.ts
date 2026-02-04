import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cinzel", "Georgia", "serif"],
        body: ["Crimson Text", "Georgia", "serif"],
        fantasy: ["MedievalSharp", "cursive"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      colors: {
        parchment: {
          50: '#faf6f0',
          100: '#f0e6d3',
          200: '#e0cba7',
          300: '#d4a574',
          400: '#c4854a',
          500: '#b8860b',
          600: '#8b6914',
          700: '#5c4a0a',
          800: '#3e2f20',
          900: '#1f1810',
          950: '#0f0a05'
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#daa520',
          600: '#b8860b',
          700: '#8b6914',
          800: '#5c4a0a',
          900: '#3d2e0a'
        },
        blood: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#c41e3a',
          600: '#991b1b',
          700: '#7f1d1d',
          800: '#5c0000',
          900: '#3b0000'
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.25)",
        medieval: "0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 220, 180, 0.1)",
        glow: "0 0 20px rgba(184, 134, 11, 0.3)"
      },
      backgroundImage: {
        'parchment-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")"
      }
    }
  },
  plugins: []
} satisfies Config;
