/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        tertiary: '#6F9940',
        primary: '#4C9231',
        secondary: '#386B25',
        primarylight: '#7CCB5E',
        primarydark: '#254519',
        darkbg: '#111827',
        lightbg: '#1F2937',
      },

      width: {
        30: '8.5rem',
        50: '12.5rem',
        80: '20rem',
        88: '22rem',
        102: '26rem',
        100: '25rem',
        120: '30rem',
      },
      height: {
        18: '4.5rem',
        25: '6.25rem',
        30: '8.5rem',
      },
    },
  },
  plugins: [],
}

