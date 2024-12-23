export type ObjectKeys<T extends Record<PropertyKey, any>> = Exclude<
  keyof T,
  symbol
>;
