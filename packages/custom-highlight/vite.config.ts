import { resolve } from 'node:path';
import { defineConfig, coverageConfigDefaults } from 'vitest/config';

const entry = resolve(import.meta.dirname, 'src', 'main.ts');

export default defineConfig({
	build: {
		lib: {
			entry,
			name: 'CustomHighlight',
			fileName: 'main',
			formats: ['es', 'iife'],
		},
		rollupOptions: {
			output: {
				exports: 'named',
			},
		},
	},
	test: {
		environment: 'jsdom',
		setupFiles: resolve(import.meta.dirname, 'test', 'setup', 'index.ts'),
		watch: false,
		reporters: ['verbose'],
		coverage: {
			enabled: true,
			reporter: 'text',
			exclude: [
				...coverageConfigDefaults.exclude,
				resolve(import.meta.dirname, 'clean-package.config.cjs'),
			],
		},
	},
});
