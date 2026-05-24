import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1140px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Lora', 'Georgia', 'serif'],
        sans: ['Roboto Condensed', 'Inter', 'sans-serif'],
        condensed: ['Roboto Condensed', 'sans-serif'],
        script: ['Allura', 'cursive'],
      },
      colors: {
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
        "teal-deep": "hsl(var(--teal-deep))",
        teal: "hsl(var(--teal))",
        "teal-mid": "hsl(var(--teal-mid))",
        "teal-lit": "hsl(var(--teal-lit))",
        "teal-pale": "hsl(var(--teal-pale))",
        copper: "hsl(var(--copper))",
        "copper-dark": "hsl(var(--copper-dark))",
        "copper-pale": "hsl(var(--copper-pale))",
        cream: "hsl(var(--cream))",
        "cream-dark": "hsl(var(--cream-dark))",
        "ilex-green": "hsl(var(--green))",
        "green-pale": "hsl(var(--green-pale))",
        "ilex-red": "hsl(var(--red))",
        "red-pale": "hsl(var(--red-pale))",
        "fb-blue": "hsl(var(--fb-blue))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'ilex-sm': 'var(--shadow-sm)',
        'ilex-md': 'var(--shadow-md)',
        'ilex-lg': 'var(--shadow-lg)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
