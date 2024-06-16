import { ArrayWithReadonly } from '@modern-kit/types';

export const excludeElements = <T, U extends T>(
  array: ArrayWithReadonly<T>,
  ...args: ArrayWithReadonly<U>
) => {
  const excludeSet = new Set(args.map((arg) => JSON.stringify(arg)));

  return array.filter((element) => !excludeSet.has(JSON.stringify(element)));
};
