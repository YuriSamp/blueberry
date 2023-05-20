/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        creamWhite: 'bg-[#f9f5f2]',
        green: '#1AB778',
        blumine: {
          50: '#f3f7f8',
          100: '#e6eff1',
          200: '#c2d6dc',
          300: '#9dbdc6',
          400: '#538c9c',
          500: '#095B71',
          600: '#085266',
          700: '#074455',
          800: '#053744',
          900: '#042d37',
        },
      },
    },
  },
  plugins: [],
}
