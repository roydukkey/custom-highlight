import { vi } from 'vitest';

vi.stubGlobal('Highlight', function (...ranges: AbstractRange[]) {
	const set = new Set();

	ranges.forEach((range) => {
		set.add(range);
	});

	return set;
});

vi.stubGlobal('CSS', {
	highlights: new Map<string, Highlight>(),
});
