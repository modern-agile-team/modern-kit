export type ExtendOmittedProperties<
  T extends Record<PropertyKey, any>,
  E extends Record<PropertyKey, any>
> = Omit<T, keyof E> & E;
