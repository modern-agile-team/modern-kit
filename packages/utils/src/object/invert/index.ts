import { identity } from '../../common';

export const invert = (
  obj: Record<PropertyKey, any>,
  keyTransformer: (value: any) => PropertyKey = identity
) => {
  const invertedObj: Record<PropertyKey, any> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    invertedObj[keyTransformer(value)] = key;
  });

  return invertedObj;
};
