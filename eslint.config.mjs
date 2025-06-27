// eslint.config.mjs
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'

/** @type {import('eslint').Linter.FlatConfig} */
const config = [
	{
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			plugins: {
				react: eslintPluginReact,
				'@typescript-eslint': typescriptPlugin,
				prettier: eslintPluginPrettier,
			},
		},
	},
	{
		files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
		rules: {
			'no-undef': 'off',
			'react/react-in-jsx-scope': 'off',
			'prettier/prettier': 'warn', // Попереджувати про порушення Prettier
			'no-console': 'warn', // Попереджувати про використання console.log
			'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Підсвічувати невикористані змінні, ігнорувати аргументи, що починаються з _
		},
	},
]

// Експортуємо конфігурацію
export default config
