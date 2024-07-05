import { Reference } from '@modern-kit/types';
import { isPrimitive } from '../isPrimitive';

export const isReference = (value: unknown): value is Reference => {
  return !isPrimitive(value);
};
