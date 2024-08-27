/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        tall: { raw: "((min-height: 750px) and (min-width: 425px))" },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme("fontSize.2xl"),
          fontWeight: theme("fontWeight.bold"),
        },
        h2: {
          fontSize: theme("fontSize.xl"),
          fontWeight: theme("fontWeight.bold"),
        },
        h3: {
          fontSize: theme("fontSize.lg"),
          fontWeight: theme("fontWeight.bold"),
        },
      });
    }),
  ],
  corePlugins: {
    preflight: true,
  },
};
