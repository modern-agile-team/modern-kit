import { isReference } from '../isReference';

export function isPlainObject(
  value: unknown
): value is Record<PropertyKey, any> {
  return isReference(value) && value.constructor === Object;
}
