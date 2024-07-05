import { isReference } from '../isReference';

export const isPlainObject = (
  value: unknown
): value is Record<PropertyKey, any> => {
  return isReference(value) && value.constructor === Object;
};
