/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#084ec5", // BiLira Primary/Accent Color
				neutral: "#23272e", // BiLira Neutral Color
			},
		},
	},
	plugins: [],
};
