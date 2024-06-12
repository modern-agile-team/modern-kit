import { hasProperty } from '../../validator';

const defaultKeyTransformer = <V, TK extends PropertyKey>(value: V) => {
  return value as unknown as TK;
};

export const invert = <
  K extends PropertyKey,
  V,
  TK extends PropertyKey = V extends PropertyKey ? V : PropertyKey
>(
  obj: Record<K, V>,
  keyTransformer: (value: V) => TK = defaultKeyTransformer<V, TK>
) => {
  const invertedObj = {} as Record<TK, K>;

  for (const key in obj) {
    if (hasProperty(obj, key)) {
      const value = obj[key];
      const transformedKey = keyTransformer(value);

      invertedObj[transformedKey] = key;
    }
  }

  return invertedObj;
};
