import { ArrayWithReadonly } from '@modern-kit/types';

export const contain = <T>(
  arr: ArrayWithReadonly<T>,
  value: unknown,
  comparator: (x: any, y: any) => boolean = Object.is
): value is T => {
  return arr.some((item) => comparator(item, value));
};
