export class Collection<K, V> extends Map<K, V> {
	constructor(entries?: readonly (readonly [K, V])[] | null) {
		super(entries);
	};

	filter<T>(predicate: (value: V, key: K) => T): Collection<K, V> {
		const newCollection = new Collection<K, V>();

		this.forEach((value, key) => {
			if (predicate(value, key)) newCollection.set(key, value);
		});

		return newCollection;
	};
};