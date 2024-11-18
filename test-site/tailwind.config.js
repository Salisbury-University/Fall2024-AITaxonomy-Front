/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// tailwind.config.js
module.exports = {
  prefix: 'tw-',
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        'su-maroon': '#7C2025', // Salisbury University Maroon
        'su-gold': '#FDB913',   // Salisbury University Gold
        'discord-gray': '#36393F',
        'discord-dark': '#2F3136',
        'discord-blue': '#5865F2',
      },
      borderRadius: {
        'lg': '0.5rem',
      },
    },
  },
  plugins: [],
};



