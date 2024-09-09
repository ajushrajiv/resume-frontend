import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        glegoo: ['Glegoo', 'serif'], 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-blue': 'rgb(27, 26, 85)',
        'icon-color':'rgb(151,219,174)',
        'text-blue':'rgb(83, 92, 145)',
        'text-foreground':'rgb(155, 236, 0)',//green
        'button-blue':'rgb(146, 144, 195)',
        'title-blue':'rgb(83, 92, 145)',
        'from-navbar':'rgb(205, 245, 253)',
        'to-navbar':'rgb(234, 253, 252)',
        'to-background':'rgb(160, 228, 255)',
        'from-background':'rgb(160, 199, 255)',
        'highlight-match':'rgb(201, 233, 203)'
      },
    },
  },
  plugins: [],
};
export default config;
