/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        load: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        blink: {
          "0%": { opacity: 0 },
          "40%": { opacity: 20 },
          "600%": { opacity: 0 },
          "100%": { opacity: 20 },
        },
      },
      animation: {
        load: "load 2s ease-in-out",
        blink: "blink 2s ease-in-out infinite",
        caload: "load 0.5s ease-in-out",
      },
    },
    colors: {
      white: "#ffffff",
      midnight: "#f0f8ff",
      marker: "#97E1FF",
      btnCol: "rgba(0,0,0,0.7)",
    },
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
