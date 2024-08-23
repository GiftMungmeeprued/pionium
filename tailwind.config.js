/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        tall: { raw: "((min-height: 750px) and (min-width: 425px))" },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
