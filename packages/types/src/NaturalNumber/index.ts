import { Integer } from 'Integer';

export type NaturalNumber<T extends number> = Integer<T> extends never
  ? never
  : `${T}` extends `-${string}` | '0'
  ? never
  : T;
