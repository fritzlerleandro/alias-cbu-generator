import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        bounceFromBottom: {
          '0%': { transform: 'translateY(100%)' },
          '60%': { transform: 'translateY(-10%)' }, // Overbounce effect
          '80%': { transform: 'translateY(5%)' },   // Settle back down
          '100%': { transform: 'translateY(0)' },   // Final position
        },
        bounceFromLeft: {
          '0%': { transform: 'translateX(-100%)' }, // Start from off-screen to the left
          '60%': { transform: 'translateX(10%)' },  // Slight overshoot
          '80%': { transform: 'translateX(-5%)' },  // Correct slightly
          '100%': { transform: 'translateX(0)' },   // Final position
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        bounceFromBottom: 'bounceFromBottom 1s ease-out',
        bounceFromLeft: 'bounceFromLeft 1s ease-out',
        shimmer: 'shimmer 1.5s infinite linear',
      },
    },
  },
  plugins: [],
};
export default config;
