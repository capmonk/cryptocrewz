module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#1f1f1f",
				secondary: "#383838",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
