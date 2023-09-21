/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				darkTile: "#D18B47",
				lightTile: "#FFCE9E",
			},
			height: {
				tileHeight: "var(--tileSize)",
			},
			width: {
				tileWidth: "var(--tileSize)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--gradient-color-stops))",
			},
		},
	},
	plugins: [],
};
