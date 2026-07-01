import { resolve } from 'node:path';
import { defineConfig, coverageConfigDefaults } from 'vitest/config';

const entry = resolve(import.meta.dirname, 'src', 'main.ts');

export default defineConfig(({ mode }) => {
	const isTestWatch = mode === 'test' && (process.argv.includes('watch') || process.argv.includes('dev'));

	return {
		build: {
			lib: {
				entry,
				name: 'CustomHighlight',
				fileName: 'main',
				formats: ['es', 'iife'],
			},
			rolldownOptions: {
				output: {
					exports: 'named',
				},
				experimental: {
					attachDebugInfo: 'none',
				},
			},
		},
		test: {
			environment: 'jsdom',
			setupFiles: resolve(import.meta.dirname, 'test', 'setup', 'index.ts'),
			watch: false,
			reporters: ['verbose'],
			coverage: {
				enabled: !isTestWatch,
				reporter: 'text',
				exclude: [
					...coverageConfigDefaults.exclude,
					resolve(import.meta.dirname, 'clean-package.config.cjs'),
				],
			},
		},
	};
});
