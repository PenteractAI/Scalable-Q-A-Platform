/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'mono': ['Rubik Mono One', 'monospace'],
				'sans': ['Rubik', 'serif-sans'],
			},
			colors: {
				'bright-green': {
					'50': '#f1ffe5',
					'100': '#deffc8',
					'200': '#bfff97',
					'300': '#95fb5b',
					'400': '#74f230', // Base
					'500': '#4ed80a',
					'600': '#39ad03',
					'700': '#2d8308',
					'800': '#28670d',
					'900': '#235710',
					'950': '#0d3102',
				},
				'malachite': {
					'50': '#effef4',
					'100': '#d9ffe5',
					'200': '#b6fccd',
					'300': '#7df8a8',
					'400': '#3eea7a',
					'500': '#1ae963', // Base
					'600': '#0aaf44',
					'700': '#0c8939',
					'800': '#0f6c31',
					'900': '#0f582b',
					'950': '#023114',
				},

				'cinnabar': {
					'50': '#fef2f2',
					'100': '#ffe1e1',
					'200': '#ffc9c9',
					'300': '#fea3a3',
					'400': '#fb6e6f',
					'500': '#f23031', // Base
					'600': '#e02223',
					'700': '#bd1819',
					'800': '#9c1819',
					'900': '#811b1c',
					'950': '#460909',
				},
				'starship': {
					'50': '#fbfde9',
					'100': '#f7fcc5',
					'200': '#f2f98f',
					'300': '#f1f64e',
					'400': '#f2f030', // Base
					'500': '#e1d611',
					'600': '#c2aa0c',
					'700': '#9b7c0d',
					'800': '#806213',
					'900': '#6d5016',
					'950': '#402b08',
				},
				'cerise-red': {
					'50': '#fff0f8',
					'100': '#ffe3f5',
					'200': '#ffc6ea',
					'300': '#ff98d7',
					'400': '#ff59bb',
					'500': '#ff289e',
					'600': '#ed016f', // Base
					'700': '#de005d',
					'800': '#b7004c',
					'900': '#980342',
					'950': '#5e0023',
				},
				'blush-pink': {
					'50': '#fef4ff',
					'100': '#fbe8ff',
					'200': '#f7d0fe',
					'300': '#f4abfc',
					'400': '#ed72f8', // Base
					'500': '#e047ee',
					'600': '#c827d2',
					'700': '#a81dae',
					'800': '#8c1a8e',
					'900': '#751a75',
					'950': '#4e044e',
				},


			},
		}
	},
	plugins: [
		// require('@tailwindcss/forms'),
	],
}
