const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...defaultTheme,
  theme: {
    extend: {
      fontFamily: {
        ...defaultTheme.fontFamily,
        inter: "Inter-Variable",
        "kaisei-decol": "KaiseiDecol-Regular",
        "kaisei-decol-medium": "KaiseiDecol-Medium",
        "kaisei-decol-bold": "KaiseiDecol-Bold",
      },
      colors: {
        ...defaultTheme.colors,
        "persian-red": {
          50: "#fdf3f3",
          100: "#fce4e4",
          200: "#f9cfcf",
          300: "#f4adad",
          400: "#ec7e7d",
          500: "#e05453",
          600: "#ca3433",
          700: "#ab2b2a",
          800: "#8e2726",
          900: "#762726",
          950: "#400f0f",
        },
      },
    },
  },
};
