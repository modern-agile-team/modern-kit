export const isArray = <T extends readonly any[]>(
  value: unknown
): value is T => {
  return Array.isArray(value);
};
