import { Primitive } from '@modern-kit/types';

export function isPrimitive(value: unknown): value is Primitive {
  return Object(value) !== value;
}
