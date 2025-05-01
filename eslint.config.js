import { config } from 'typescript-eslint';
import roydukkeyConfig from '@roydukkey/eslint-config';
import globals from 'globals';

export default config(
	...roydukkeyConfig({
		tsconfigRootDir: import.meta.dirname,
	}),
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	{
		ignores: ['docs', 'packages'],
	},
);
