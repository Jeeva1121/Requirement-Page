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
                // VÉRA exact palette
                vera: {
                    dark: '#1E242C',
                    beige: '#D6CEC2',
                    cream: '#F4F3EF',
                    steel: '#6E7A85',
                    blue: '#A2B4C8',
                },
                // Derived shades
                navy: {
                    DEFAULT: '#1E242C',
                    50: '#F2F3F4',
                    100: '#E0E2E5',
                    200: '#C1C5CB',
                    300: '#8E95A0',
                    400: '#5A6370',
                    500: '#3A4350',
                    600: '#2D3440',
                    700: '#252B34',
                    800: '#1E242C',
                    900: '#161B22',
                },
                beige: {
                    DEFAULT: '#D6CEC2',
                    50: '#FAF9F7',
                    100: '#F4F2EE',
                    200: '#EBE7E0',
                    300: '#E0DAD0',
                    400: '#D6CEC2',
                    500: '#C4B9A8',
                    600: '#A99B86',
                    700: '#8A7D6A',
                    800: '#665D4F',
                    900: '#433E34',
                },
                cream: {
                    DEFAULT: '#F4F3EF',
                    50: '#FDFCFB',
                    100: '#F9F8F5',
                    200: '#F4F3EF',
                    300: '#ECEAE4',
                    400: '#E0DDD4',
                    500: '#D0CBC0',
                },
                steel: {
                    DEFAULT: '#6E7A85',
                    50: '#F3F4F6',
                    100: '#E4E7EA',
                    200: '#C9CFD5',
                    300: '#A2ADB8',
                    400: '#8A96A2',
                    500: '#6E7A85',
                    600: '#59656F',
                    700: '#48525A',
                    800: '#3A4249',
                    900: '#2D343A',
                },
                skyblue: {
                    DEFAULT: '#A2B4C8',
                    50: '#F5F7FA',
                    100: '#E8EDF3',
                    200: '#D5DEE8',
                    300: '#B8C8D8',
                    400: '#A2B4C8',
                    500: '#8AA0B8',
                    600: '#7289A0',
                    700: '#5D7185',
                    800: '#4B5B6B',
                    900: '#3A4756',
                },
                background: "#F4F3EF",
                foreground: "#1E242C",
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem',
                '6xl': '4rem',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
                serif: ['Playfair Display', 'Georgia', 'serif'],
            },
        },
    },
    plugins: [],
};
export default config;
