/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {}
	},
	darkMode: 'class',
	plugins: [
		nextui({
			prefix: 'nextui', // prefix for themes variables
			addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
			// defaultTheme: 'main', // default theme from the themes object
			defaultExtendTheme: 'light', // default theme to extend on custom themes
			layout: {}, // common layout tokens (applied to all themes)
			themes: {
				light: {
					layout: {}, // light theme layout tokens
					colors: {} // light theme colors
				},
				dark: {
					layout: {}, // dark theme layout tokens
					colors: {} // dark theme colors
				},
				main: {
					extend: 'light',
					layout: {},
					colors: {
						background: '#F3F1F4',
						content1: '#FCF2F3',
						// content2: ColorScale;
						// content3: ColorScale;
						// content4: ColorScale;
						primary: {
							50: '#e2ecff',
							100: '#b2c7ff',
							200: '#81a2fe',
							300: '#507dfb',
							400: '#2058f9',
							500: '#063fdf',
							600: '#0131af',
							700: '#00237e',
							800: '#00154e',
							900: '#000720',

							DEFAULT: '#0947F8',
							foreground: '#F3F1F4'
						}
						// secondary: {
						// 	50: '#ffefe0',
						// 	100: '#f8d5b9',
						// 	200: '#efbb90',
						// 	300: '#e7a064',
						// 	400: '#df8439',
						// 	500: '#c66b21',
						// 	600: '#9b5318',
						// 	700: '#6f3b10',
						// 	800: '#442305',
						// 	900: '#1c0a00',
						// 	DEFAULT: '#955017',
						// 	foreground: '#ffffff'
						// },
						// danger: {
						// 	50: '#ffe6e3',
						// 	100: '#fcbeb9',
						// 	200: '#f4958c',
						// 	300: '#ed6b5e',
						// 	400: '#e74232',
						// 	500: '#cd2818',
						// 	600: '#a11e12',
						// 	700: '#73140b',
						// 	800: '#470904',
						// 	900: '#1f0000',
						// 	DEFAULT: '#e95243',
						// 	foreground: '#000000'
						// },
						// warning: {
						// 	50: '#fff3db',
						// 	100: '#ffdcaf',
						// 	200: '#fdc680',
						// 	300: '#fcaf50',
						// 	400: '#fa981f',
						// 	500: '#e07e05',
						// 	600: '#ae6201',
						// 	700: '#7d4600',
						// 	800: '#4d2900',
						// 	900: '#1e0c00',
						// 	DEFAULT: '#F98D08',
						// 	foreground: '#000000'
						// }
					}
				}
			}
		})
	]
}
