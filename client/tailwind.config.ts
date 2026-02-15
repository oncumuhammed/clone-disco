/**
 * Tailwind CSS configuration with Discord-inspired design system.
 * Defines custom color palette, spacing, and typography matching Discord UI.
 */
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5865F2',
        green: '#57F287',
        yellow: '#FEE75C',
        fuchsia: '#EB459E',
        red: '#ED4245',
        'bg-primary': '#313338',
        'bg-secondary': '#2B2D31',
        'bg-tertiary': '#1E1F22',
        'bg-modifier-hover': '#2E3035',
        'bg-modifier-selected': '#35373C',
        'text-normal': '#DBDEE1',
        'text-muted': '#949BA4',
        'text-link': '#00A8FC',
        sidebar: '#2B2D31',
        'server-list': '#1E1F22',
        'chat-area': '#313338',
        'input-bg': '#383A40',
        'scrollbar-thumb': '#1A1B1E',
        'scrollbar-track': 'transparent',
      },
      fontFamily: {
        sans: [
          'gg sans',
          'Noto Sans',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'discord': '4px',
      },
    },
  },
  plugins: [],
} satisfies Config;
