/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6B35",
          "orange-dark": "#E55A28",
          "orange-light": "#FF8C5A",
          green: "#27C476",
          "green-dark": "#1DA560",
          yellow: "#FFD60A",
          red: "#FF3B30",
          purple: "#7B61FF",
        },
      },
    },
  },
  plugins: [],
};
