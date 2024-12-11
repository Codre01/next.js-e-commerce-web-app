import type { Config } from "tailwindcss";
import {content,plugin} from "flowbite-react/tailwind";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
     "./node_modules/flowbite/**/*.js",
     content(),
  ],
  theme: {
    extend: {
      colors: {
        primarydark: '#78350f',
        primary: '#b45309',
        primarylight: '#d97706',
        gray: '#78716c',
        graylight: '#e7e5e4',
        dark: {
          100: '#0a0a0a',
          80: '#262626',
          60: '#525252',
          50: '#737373',
          40: '#a3a3a3',
          30: '#d4d4d4',
          20: '#e5e5e5',
          10: '#f5f5f5',
          5: '#fafafa',
        },
        red: '#dc2626',
        blue: '#1d4ed8',
        green: '#16a34a',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    plugin(),
],
} satisfies Config;
