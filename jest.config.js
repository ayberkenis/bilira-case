module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest", // Handles TypeScript files
		"^.+\\.(js|jsx)$": "babel-jest", // Handles JavaScript files
	},
	moduleNameMapper: {
		"\\.(css|less|scss|svg|jpg|jpeg|png)$": "identity-obj-proxy", // Mocks static file imports
	},
	transformIgnorePatterns: [
		"node_modules/(?!axios)", // Ensures that axios and other modules are transformed
	],
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"], // Optional, adds useful matchers
};
