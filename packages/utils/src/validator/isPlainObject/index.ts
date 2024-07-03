import { isReference } from '../isReference';

export const isPlainObject = (value: unknown): value is object => {
  return isReference(value) && value.constructor === Object;
};
