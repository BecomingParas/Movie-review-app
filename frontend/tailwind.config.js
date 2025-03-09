/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      colors: {
        primary: {
          DEFAULT: "#E50914",
          dark: "#B81D24",
          light: "#F40612",
        },
        secondary: "#141414",
        background: {
          DEFAULT: "#000000",
          alt: "#141414",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["Open Sans", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-delay": "fadeIn 0.5s ease-in-out 0.2s",
        "fade-in-delay-2": "fadeIn 0.5s ease-in-out 0.4s",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
