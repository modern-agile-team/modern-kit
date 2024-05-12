export const isArray = <T>(value: unknown): value is Array<T> => {
  return Array.isArray(value);
};
