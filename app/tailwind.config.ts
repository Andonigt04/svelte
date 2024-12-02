import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        'background-light': '#fff',
        'background-dark': '#1a202c',
        'text-light': '#000',
        'text-dark': '#e2e8f0',
      },
    },

  },
  darkMode: 'class',
  plugins: [typography, forms, containerQueries],
} satisfies Config;
