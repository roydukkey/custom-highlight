import globals from 'globals';
import { config } from 'typescript-eslint';
import roydukkeyConfig from '@roydukkey/eslint-config';

export default config(
	...roydukkeyConfig({
		project: ['./tsconfig.json', './.vitepress/tsconfig.json'],
		tsconfigRootDir: import.meta.dirname,
	}),
	{
		files: [
			'./src/**/*.@(?(m|c)@(j|t)s|@(j|t)sx|vue)',
			'.vitepress/theme/index.ts',
		],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
	{
		files: ['src/examples/*.ts'],
		rules: {
			'@stylistic/indent': ['error', 2],
			'@stylistic/padded-blocks': 'off',
		},
	},
	{
		files: ['src/examples/*.vue'],
		rules: {
			'@stylistic/indent': ['error', 2],
			'vue/html-indent': ['error', 2, {
				alignAttributesVertically: false,
			}],
			'vue/block-order': ['error', {
				order: [
					'script[setup]',
					'template',
					'style',
					'script:not([setup])',
				],
			}],
		},
	},
	{
		ignores: [
			'.vitepress/cache',
			'.vitepress/dist',
		],
	},
);
