import { test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defaultCustomHighlightName, instances } from '../src/directive.js';

test('after mutation, remove collapsed ranges', async ({ expect, deepComponent, contents }) => {
	const wrapper = mount(deepComponent, {
		props: {
			searches: [
				[/[aeiou]/, undefined, { deep: true }],
			],
			subject: 'World',
		},
	});

	let highlight = CSS.highlights.get(defaultCustomHighlightName);
	let ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('i');
	expect(contents(ranges.next().value)).toEqual('a');
	expect(contents(ranges.next().value)).toEqual('o');
	expect(contents(ranges.next().value)).toBeNull();

	const collapseSpy = vi.spyOn(Range.prototype, 'collapsed', 'get');

	await wrapper.find('button').trigger('click');

	expect(collapseSpy).toBeCalledTimes(3);
	expect(collapseSpy).nthReturnedWith(1, true);
	expect(collapseSpy).nthReturnedWith(2, true);
	expect(collapseSpy).nthReturnedWith(3, false);

	highlight = CSS.highlights.get(defaultCustomHighlightName);
	ranges = highlight!.values();

	expect(contents(ranges.next().value)).toEqual('o');
	expect(contents(ranges.next().value)).toEqual('i');
	expect(contents(ranges.next().value)).toBeNull();

	collapseSpy.mockRestore();

	wrapper.unmount();

	expect(highlight!.size).toBe(0);
	expect(CSS.highlights.size).toBe(0);
});

test('after prop update, stop mutation observer', async ({ expect, basicComponent }) => {
	const wrapper = mount(basicComponent, {
		props: {
			searches: [
				['flamingo', undefined, { deep: true }],
			],
		},
	});

	expect(wrapper.element).toBeInstanceOf(HTMLElement);

	const instance = instances.get(wrapper.element as HTMLElement);

	expect(instance).toBeDefined();

	const stopSpy = vi.spyOn(instance!, 'stop');

	await wrapper.setProps({
		searches: [
			['faucet', undefined, { deep: true }],
		],
	});

	expect(stopSpy).toBeCalledTimes(1);

	stopSpy.mockRestore();

	wrapper.unmount();
});
