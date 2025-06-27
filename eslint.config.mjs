import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.FlatConfig} */
const config = [
	{
		plugins: {
			react: eslintPluginReact,
			'@typescript-eslint': typescriptPlugin,
			prettier: eslintPluginPrettier,
		},
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
	},
	{
		files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
		rules: {
			'no-undef': 'off',
			'react/react-in-jsx-scope': 'off',
			'prettier/prettier': 'warn',
			'no-console': 'warn',
			'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		},
	},
];

export default config;
