import { defineConfig, mergeConfig } from 'vitepress';
import autoprefixer from 'autoprefixer';
// @ts-expect-error there are not typings for `markdown-it-deflist`
import markdownDeflist from 'markdown-it-deflist';
import pkg from 'custom-highlight/package.json' with { type: 'json' };
import type { UserConfig, UserConfigFn, DefaultTheme } from 'vitepress';

const copyrightRange = [...new Set([2025, new Date().getFullYear()])].join('-');

// https://vitepress.dev/reference/site-config
const configInit: UserConfigFn<DefaultTheme.Config> = ({ mode }) => {
	const sass = {
		api: 'modern-compiler' as const,
		additionalData: `$MODE: '${mode}'\n`,
	};

	const config: UserConfig = {
		title: 'custom-highlight',
		description: 'A set of lifecycle hooks for styling arbitrary text within elements using the CSS Custom Highlight API',

		srcDir: './src',

		themeConfig: {
			// https://vitepress.dev/reference/default-theme-config
			nav: [
				{ text: 'Getting Started', link: '/' },
				{ text: 'Lifecycle Hooks', link: '/guide/lifecycle-hooks' },
				{ text: 'Features', link: '/features/basic-search', activeMatch: '/features' },
				{
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
					text: pkg.version,
					items: [
						{
							text: 'Changelog',
							link: 'https://github.com/roydukkey/custom-highlight/blob/master/CHANGELOG.md',
						},
					],
				},
			],

			footer: {
				message: 'Released under the MIT License.',
				copyright: `Copyright © ${copyrightRange} roydukkey`,
			},

			sidebar: [
				{
					text: 'Introduction',
					items: [
						{ text: 'Getting Started', link: '/' },
						{ text: 'Lifecycle Hooks', link: '/guide/lifecycle-hooks' },
					],
				},
				{
					text: 'Recipes',
					items: [
						{ text: 'Vue Directive', link: '/recipes/vue' },
						{ text: 'Web Component', link: '/recipes/web-component' },
					],
				},
				{
					text: 'Features',
					items: [
						{ text: 'Basic Search', link: '/features/basic-search' },
						{ text: 'Advanced Search', link: '/features/advanced-search' },
						{ text: 'Case-Insensitivity', link: '/features/case-insensitive' },
						{ text: 'Highlight Groups', link: '/features/grouping' },
						{ text: 'Deep Updates', link: '/features/deep-observation' },
					],
				},
			],

			socialLinks: [
				{ icon: 'github', link: 'https://github.com/roydukkey/custom-highlight' },
			],
		},

		vite: {
			css: {
				preprocessorOptions: {
					sass,
					scss: sass,
				},
				postcss: {
					plugins: [
						autoprefixer,
					],
				},
			},
		},

		vue: {
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.startsWith('custom-'),
				},
			},
		},

		markdown: {
			config: (md) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				md.use(markdownDeflist);
			},
		},
	};

	return defineConfig(mode === 'development'
		? mergeConfig(config, {
				vite: {
					resolve: {
						alias: {
							'custom-highlight': 'custom-highlight/src/main.ts',
						},
					},
					optimizeDeps: {
						exclude: [
							'custom-highlight',
						],
					},
				},
			})
		: config,
	);
};

export default configInit;
