import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#037971",
          50: "#E6F6F5",
          100: "#C3EAE7",
          200: "#9ADCD8",
          300: "#5ECCC5",
          400: "#2BBFB7",
          500: "#03B5AA",
          600: "#049A8F",
          700: "#037971",
          800: "#023436",
          900: "#01201F",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "#00BFB3",
          50: "#E6FFFC",
          100: "#C3FFF9",
          200: "#8AFFF5",
          300: "#42FFE9",
          400: "#0AFFE0",
          500: "#00BFB3",
          600: "#00A69B",
          700: "#008C83",
          800: "#00736B",
          900: "#005A53",
          foreground: "hsl(var(--accent-foreground))",
        },
        quaise: {
          teal: "#03B5AA",
          "teal-dark": "#037971",
          "teal-darkest": "#023436",
          "teal-light": "#00BFB3",
          "teal-medium": "#049A8F",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
