import { test } from 'vitest';
import { mount } from '@vue/test-utils';
import { defaultCustomHighlightName } from '../src/directive.js';

test('token by modifier', ({ expect, basicComponent, contents }) => {
	const search = 'kl';
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[search, undefined, { i: true }],
			],
		},
	});

	const highlight = CSS.highlights.get(defaultCustomHighlightName);
	const ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('kl');
	expect(contents(ranges.next().value)).toEqual('Kl');
	expect(contents(ranges.next().value)).toBeNull();

	wrapper.unmount();
});

test('pattern by modifier', ({ expect, basicComponent, contents }) => {
	const search = /\bm\w*/g;
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[search, undefined, { i: true }],
			],
		},
	});

	const highlight = CSS.highlights.get(defaultCustomHighlightName);
	const ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('moonlight');
	expect(contents(ranges.next().value)).toEqual('Meanwhile');
	expect(contents(ranges.next().value)).toBeNull();

	wrapper.unmount();
});

test('pattern by flag', ({ expect, basicComponent, contents }) => {
	const search = /\bm\w*/gi;
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[search],
			],
		},
	});

	const highlight = CSS.highlights.get(defaultCustomHighlightName);
	const ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('moonlight');
	expect(contents(ranges.next().value)).toEqual('Meanwhile');
	expect(contents(ranges.next().value)).toBeNull();

	wrapper.unmount();
});
