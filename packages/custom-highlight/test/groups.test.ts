import { test } from 'vitest';
import { mount } from '@vue/test-utils';

test('token by argument', ({ expect, basicComponent, contents }) => {
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				['flamingo', 'animate'],
				['books', 'inanimate'],
			],
		},
	});

	let highlight = CSS.highlights.get('animate');
	let ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('flamingo');
	expect(contents(ranges.next().value)).toBeNull();

	highlight = CSS.highlights.get('inanimate');
	ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('books');
	expect(contents(ranges.next().value)).toBeNull();

	wrapper.unmount();

	expect(highlight!.size).toBe(0);
	expect(CSS.highlights.size).toBe(0);
});

test('pattern by capture name', ({ expect, basicComponent, contents }) => {
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[/((?<animate>flamingo)|(?<inanimate>books))/],
			],
		},
	});

	let highlight = CSS.highlights.get('animate');
	let ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('flamingo');
	expect(contents(ranges.next().value)).toBeNull();

	highlight = CSS.highlights.get('inanimate');
	ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('books');
	expect(contents(ranges.next().value)).toBeNull();

	wrapper.unmount();

	expect(highlight!.size).toBe(0);
	expect(CSS.highlights.size).toBe(0);
});
