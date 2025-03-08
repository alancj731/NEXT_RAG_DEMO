import type { Config } from 'tailwindcss' with { 'resolution-mode': 'import' };

const config: Config = {
  theme: {
    extend: {
      keyframes: {
        loading: {
          "0%": { clipPath: "inset(0 3ch 0 0)" },
          "100%": { clipPath: "inset(0)" },
        },
      },
      animation: {
        loading: "loading 1s steps(4, jump-none) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
