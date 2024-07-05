import { isPrimitive } from '../isPrimitive';

export const isReference = (
  value: unknown
): value is Record<PropertyKey, any> => {
  return !isPrimitive(value);
};
