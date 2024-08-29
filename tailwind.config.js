/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        tall: { raw: "((min-height: 750px) and (min-width: 425px))" },
      },
      filter: ["hover", "focus"],
    },
  },
  plugins: [require("flowbite/plugin")],
  corePlugins: {
    preflight: true,
  },
};
