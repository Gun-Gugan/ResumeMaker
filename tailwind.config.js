/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f3f4f6",
          300: "#d1d5db",
          600: "#4b5563",
          700: "#374151",
        },
        blue: {
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        red: {
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        black: "#000000",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};

