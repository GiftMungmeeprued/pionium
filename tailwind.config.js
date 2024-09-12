/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      screens: {
        tall: { raw: "((min-height: 750px) and (min-width: 440px))" },
      },
      filter: ["hover", "focus"],
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("@tailwindcss/forms"),
    require("preline/plugin"),
  ],
  corePlugins: {
    preflight: true,
  },
};
