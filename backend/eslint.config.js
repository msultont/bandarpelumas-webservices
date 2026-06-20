const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = [
	{
		ignores: ["dist/**", "node_modules/**"],
	},
	js.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
				project: "./tsconfig.json",
			},
		},
		rules: {
			"no-unused-vars": "warn",
			"@typescript-eslint/no-unused-vars": "error",
			"@typescript-eslint/no-explicit-any": "error",
		},
	},
];
