export const isArray = <T>(value: unknown): value is T[] | readonly T[] => {
  return Array.isArray(value);
};
