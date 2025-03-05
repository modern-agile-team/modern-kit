import { isNil } from '../../validator/isNil';

export function invariant(value: boolean, message: string): asserts value;

export function invariant<T>(
  value: T | null | undefined,
  message: string
): asserts value is T;

export function invariant(value: unknown, message: string) {
  if (value === false || isNil(value)) {
    throw new Error(message);
  }
}
