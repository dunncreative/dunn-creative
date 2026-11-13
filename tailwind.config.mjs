/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
          soft: 'rgb(var(--color-accent-soft-rgb) / <alpha-value>)',
          dim: 'rgb(var(--color-accent-dim-rgb) / <alpha-value>)',
        },
        bg: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
        'surface-2': 'rgb(var(--color-surface-2-rgb) / <alpha-value>)',
        line: 'rgb(var(--color-line-rgb) / <alpha-value>)',
        ink: 'rgb(var(--color-ink-rgb) / <alpha-value>)',
        'ink-soft': 'rgb(var(--color-ink-soft-rgb) / <alpha-value>)',
        'ink-dim': 'rgb(var(--color-ink-dim-rgb) / <alpha-value>)',
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
        // Teal glow retired (brand rule); neutral shadow keeps `shadow-glow` working.
        glow: 'var(--shadow-glow)',
      },
    },
  },
  plugins: [],
};
