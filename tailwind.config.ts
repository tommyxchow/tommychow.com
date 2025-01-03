import typography from '@tailwindcss/typography';
import { type Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: 'selector',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-sans)',
          {
            fontFeatureSettings: '"ss01", "ss02", "ss05", "ss06", "ss08"',
          },
        ],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [typography, animate],
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
