const defaultTheme = require("tailwindcss/defaultTheme");
const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        ...defaultTheme.fontFamily,
        // inter: "Inter-Variable",
        // "kaisei-decol": "KaiseiDecol-Regular",
        // "kaisei-decol-medium": "KaiseiDecol-Medium",
        // "kaisei-decol-bold": "KaiseiDecol-Bold",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
