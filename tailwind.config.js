/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // Colour, type and spacing come from the design tokens in src/index.css.
  // Tailwind is used here only for layout utilities (grid / flex / gap / responsive).
  corePlugins: {
    preflight: false,
  },
}
