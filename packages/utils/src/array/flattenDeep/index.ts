import { ExtractNestedArrayType } from '@modern-kit/types';
import { flatten } from '../../array';

export const flattenDeep = <T>(arr: T[] | readonly T[]) => {
  return flatten(arr, Infinity) as ExtractNestedArrayType<T>[];
};
