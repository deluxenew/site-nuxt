/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    screens: {
      mobile: '320px',
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
    spacing: {
      '1': '4px',
      '2': '8px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '48px',
    },
    extend: {},
  },
  plugins: [],
}
