/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "4sm": "320px",
        "3sm": "375px",
        "2sm": "425px",
      },
    },
    rotate: {
      45: "45deg",
      90: "90deg",
      135: "135deg",
      180: "180deg",
      225: "225deg",
      270: "270deg",
      315: "315deg",
    },
  },
  plugins: [],
};
