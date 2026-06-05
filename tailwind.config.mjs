/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#00C2C7',
          soft: '#33D1D5',
          dim: '#0A8A8D',
        },
        bg: '#0d0d0d',
        surface: '#1a1a1a',
        'surface-2': '#222222',
        line: '#2a2a2a',
        ink: '#f5f5f5',
        'ink-soft': '#b4b4b4',
        'ink-dim': '#7a7a7a',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
        narrow: '760px',
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(0, 194, 199, 0.35)',
      },
    },
  },
  plugins: [],
};
