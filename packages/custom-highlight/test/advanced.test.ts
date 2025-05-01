import { test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defaultCustomHighlightName } from '../src/directive.js';

test('single pattern', ({ expect, basicComponent, contents }) => {
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[/(the)[\w']*/g],
			],
		},
	});

	const highlight = CSS.highlights.get(defaultCustomHighlightName);
	const ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('the');
	expect(contents(ranges.next().value)).toEqual('their');
	expect(contents(ranges.next().value)).toEqual('the');
	expect(contents(ranges.next().value)).toEqual('the');
	expect(contents(ranges.next().value)).toEqual('they\'d');
	expect(contents(ranges.next().value)).toBeNull();

	wrapper.unmount();

	expect(highlight!.size).toBe(0);
	expect(CSS.highlights.size).toBe(0);
});

test('pattern automatically assume `g` flag', ({ expect, basicComponent }) => {
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[/(the)[\w']*/],
			],
		},
	});

	const highlight = CSS.highlights.get(defaultCustomHighlightName);

	expect(highlight?.size).toEqual(5);

	wrapper.unmount();
});

test('warn of duplicate token or pattern', ({ expect, basicComponent }) => {
	const warnSpy = vi.spyOn(console, 'warn').mockImplementation((message: string) => message);

	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[['the', /the/, 'the']],
			],
		},
	});

	expect(warnSpy).toBeCalledTimes(2);
	expect(warnSpy).nthReturnedWith(1, '[custom-highlight]: Duplicate search token or pattern /the/.');
	expect(warnSpy).nthReturnedWith(2, '[custom-highlight]: Duplicate search token or pattern \'the\'.');

	warnSpy.mockRestore();

	const highlight = CSS.highlights.get(defaultCustomHighlightName);

	expect(highlight?.size).toEqual(5);

	wrapper.unmount();
});

test('warn but function with duplicate directive', ({ expect, basicComponent }) => {
	const warnSpy = vi.spyOn(console, 'warn').mockImplementation((message: string) => message);

	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[['the']],
				[['the']],
			],
		},
	});

	expect(warnSpy).toBeCalledTimes(1);
	expect(warnSpy).nthReturnedWith(1, '[custom-highlight]: Duplicate search token or pattern \'the\'.');

	warnSpy.mockRestore();

	const highlight = CSS.highlights.get(defaultCustomHighlightName);

	expect(highlight?.size).toEqual(5);

	wrapper.unmount();
});

test('break for-loop, when Highlight is modified externally', ({ expect, basicComponent, contents }) => {
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				[/flamingo|knitted/],
			],
		},
	});

	const highlight = CSS.highlights.get(defaultCustomHighlightName)!;
	const ranges = highlight.values();
	const keptRange = ranges.next().value;
	const removedRange = ranges.next().value;

	expect(contents(keptRange)).toEqual('flamingo');
	expect(contents(removedRange)).toEqual('knitted');
	expect(contents(ranges.next().value)).toBeNull();

	const deleteSpy = vi.spyOn(highlight, 'delete');

	if (removedRange) {
		highlight.delete(removedRange);
	}

	deleteSpy.mockClear();
	wrapper.unmount();

	expect(deleteSpy).toBeCalledTimes(1);
	expect(deleteSpy).nthCalledWith(1, keptRange);

	deleteSpy.mockRestore();

	expect(highlight.size).toBe(0);
	expect(CSS.highlights.size).toBe(0);
});
