export const isFloat = (value: unknown) => {
  return Number.isFinite(value) && !Number.isInteger(value);
};
