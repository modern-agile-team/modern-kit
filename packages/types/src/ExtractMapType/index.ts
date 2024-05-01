export type ExtractMapType<T> = T extends Map<infer K, infer V>
  ? [K, V]
  : never;
