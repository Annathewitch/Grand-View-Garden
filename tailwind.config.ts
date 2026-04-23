import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'daguan-bg': '#F8F7F2',
        'daguan-red': '#8B2B2B',
        'daguan-blue': '#2B4B8B',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
