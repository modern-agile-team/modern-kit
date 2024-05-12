import { hasProperty, isArray } from '../../validator';

export const deleteFalsyProperties = <
  T extends Record<PropertyKey, any> = Record<PropertyKey, any>
>(
  source: Record<PropertyKey, any>
): T => {
  const copiedObj: Record<PropertyKey, any> = {};

  for (const key in source) {
    if (hasProperty(source, key)) {
      const value = source[key];

      if (value != null && typeof value === 'object') {
        // object
        if (!isArray(value)) {
          const newObj = deleteFalsyProperties(value);
          const isNonEmptyObj = !!Object.keys(newObj).length;

          if (isNonEmptyObj) {
            copiedObj[key] = newObj;
          }
          continue;
        }

        // array
        const newArray = value.reduce((acc: any[], cur: any) => {
          if (typeof cur !== 'object') {
            acc.push(cur);
            return acc;
          }
          const property = deleteFalsyProperties(cur);
          const isNonEmptyObj = !!Object.keys(property).length;

          if (isNonEmptyObj) acc.push(property);
          return acc;
        }, []);

        if (newArray.length) {
          copiedObj[key] = newArray;
        }
      } else if (
        value ||
        typeof value === 'number' ||
        typeof value === 'boolean'
      ) {
        copiedObj[key] = value;
      }
    }
  }

  return copiedObj as T;
};
