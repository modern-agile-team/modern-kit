export const isFloat = (value: unknown): value is number => {
  return Number.isFinite(value) && !Number.isInteger(value);
};
