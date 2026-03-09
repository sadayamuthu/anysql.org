/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space:          '#050A14',
        surface:        '#0D1424',
        subtle:         '#1E2D4A',
        'accent-blue':  '#4F8EF7',
        'accent-cyan':  '#00D4FF',
        'text-primary': '#F0F6FF',
        'text-muted':   '#7A90B0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
