const defaultKeyTransformer = <V, TK extends PropertyKey>(value: V) => {
  return value as unknown as TK;
};

export function invert<
  K extends PropertyKey,
  V,
  TK extends PropertyKey = V extends PropertyKey ? V : PropertyKey
>(
  obj: Record<K, V>,
  keyTransformer: (value: V) => TK = defaultKeyTransformer<V, TK>
) {
  const invertedObj = {} as Record<TK, Exclude<K, symbol>>;
  const keys = Object.keys(obj) as Exclude<K, symbol>[];

  keys.forEach((key) => {
    const value = obj[key];
    const transformedKey = keyTransformer(value);

    invertedObj[transformedKey] = key;
  });

  return invertedObj;
}
