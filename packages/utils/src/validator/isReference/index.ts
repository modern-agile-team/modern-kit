import { Reference } from '@modern-kit/types';
import { isPrimitive } from '../isPrimitive';

export function isReference(value: unknown): value is Reference {
  return !isPrimitive(value);
}
