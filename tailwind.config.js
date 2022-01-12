module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#000000",
				secondary: "#383838",
				blue: {
					400: "#00B0EF",
				},
			},
			screens: {
				"3xl": "1920px",
			},
			animation: {
				glow: "glow 1.5s ease-in-out infinite alternate",
			},
			keyframes: {
				glow: {
					"0%": { "box-shadow": "none" },
					"100%": { "box-shadow": "0px 0px 35px 1px rgba(87, 160, 255, 0.7)" },
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
