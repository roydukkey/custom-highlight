import globals from 'globals';
import { config } from 'typescript-eslint';
import roydukkeyConfig from '@roydukkey/eslint-config';

export default config(
	...roydukkeyConfig({
		project: ['./tsconfig.json', './src/tsconfig.json', './test/tsconfig.json'],
		tsconfigRootDir: import.meta.dirname,
	}),

	{
		files: [
			'*.@(j|t)s',
		],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},

	{
		files: [
			'test/**/*.@(j|t)s',
		],
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'off',
		},
	},
);
