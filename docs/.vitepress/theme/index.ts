import { h } from 'vue';
import defaultTheme from 'vitepress/theme';
import BaselineStatus from '../../src/components/BaselineStatus.vue';
import PreviewContainer from '../../src/components/PreviewContainer.vue';
import type { Theme } from 'vitepress';
import './style.sass';

// https://vitepress.dev/guide/custom-theme
export default {
	extends: defaultTheme,

	Layout: () => h(defaultTheme.Layout, null, {
		// https://vitepress.dev/guide/extending-default-theme#layout-slots
	}),

	async enhanceApp({ app }) {
		app.component('baseline-status', BaselineStatus)
			.component('preview-container', PreviewContainer);

		if (!import.meta.env.SSR) {
			const { CustomHighlightZone } = await import('../../src/examples/WebComponentRecipe.js');
			customElements.define('custom-highlight-zone', CustomHighlightZone);
		}
	},
} satisfies Theme;
