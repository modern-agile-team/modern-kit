import { Primitive } from '@modern-kit/types';

export const isPrimitive = (value: unknown): value is Primitive => {
  return Object(value) !== value;
};
