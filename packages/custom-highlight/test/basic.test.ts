import { test } from 'vitest';
import { mount } from '@vue/test-utils';
import { defaultCustomHighlightName } from '../src/directive.js';

test('noop empty token', ({ expect, basicComponent }) => {
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[['']],
			],
		},
	});

	const highlight = CSS.highlights.get(defaultCustomHighlightName);

	expect(highlight).toBeUndefined();
	expect(CSS.highlights.size).toBe(0);

	wrapper.unmount();
});

test('one single-instance token', ({ expect, basicComponent, contents }) => {
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				['flamingo'],
			],
		},
	});

	const highlight = CSS.highlights.get(defaultCustomHighlightName);
	const ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('flamingo');
	expect(contents(ranges.next().value)).toBeNull();

	wrapper.unmount();

	expect(highlight!.size).toBe(0);
	expect(CSS.highlights.size).toBe(0);
});

test('two single-instance tokens', ({ expect, basicComponent, contents }) => {
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[['flamingo', 'knitted']],
			],
		},
	});

	const highlight = CSS.highlights.get(defaultCustomHighlightName);
	const ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('flamingo');
	expect(contents(ranges.next().value)).toEqual('knitted');
	expect(contents(ranges.next().value)).toBeNull();

	wrapper.unmount();

	expect(highlight!.size).toBe(0);
	expect(CSS.highlights.size).toBe(0);
});

test('two multiple-instance tokens', ({ expect, basicComponent, contents }) => {
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[['be', 'of']],
			],
		},
	});

	const highlight = CSS.highlights.get(defaultCustomHighlightName);
	const ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('be');
	expect(contents(ranges.next().value)).toEqual('of');
	expect(contents(ranges.next().value)).toEqual('of');
	expect(contents(ranges.next().value)).toEqual('be');
	expect(contents(ranges.next().value)).toEqual('be');
	expect(contents(ranges.next().value)).toEqual('of');
	expect(contents(ranges.next().value)).toBeNull();

	wrapper.unmount();

	expect(highlight!.size).toBe(0);
	expect(CSS.highlights.size).toBe(0);
});

test('after prop update, find new and remove old matches', async ({ expect, basicComponent, contents }) => {
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				['flamingo'],
			],
		},
	});

	let highlight = CSS.highlights.get(defaultCustomHighlightName);
	let ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('flamingo');
	expect(contents(ranges.next().value)).toBeNull();

	await wrapper.setProps({
		searches: [
			['faucet'],
		],
	});

	highlight = CSS.highlights.get(defaultCustomHighlightName);
	ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('faucet');
	expect(contents(ranges.next().value)).toBeNull();

	wrapper.unmount();

	expect(highlight!.size).toBe(0);
	expect(CSS.highlights.size).toBe(0);
});
