import { Integer } from 'Integer';

export type WholeNumber<T extends number> = Integer<T> extends never
  ? never
  : `${T}` extends `-${string}`
  ? never
  : T;
