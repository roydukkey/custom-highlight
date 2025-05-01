// Seems to be a false positive, since without `D extends V`, `V` resolves to the return type of `defaultValue`, rather than the value type of `map`.
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const mapGetSafe = <K, V, D extends V>(map: K extends WeakKey ? WeakMap<K, V> : Map<K, V>, key: K, defaultValue: () => D) => {
	let value = map.get(key);

	if (!value) {
		map.set(key, value = defaultValue());
	}

	return value;
};

export const defaultValueArray = () => [];
