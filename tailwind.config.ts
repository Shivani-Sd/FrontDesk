import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import themes from "./src/app/_themes";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: themes
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-small": {
          fontSize: "10px",
          lineHeight: "1rem",
        },
        ".text-medium": {
          fontSize: "12px",
          lineHeight: "1.25rem",
        },
      });
    }),
  ],
};
export default config;
