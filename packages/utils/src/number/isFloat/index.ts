export const isFloat = (value: unknown) => {
  if (typeof value !== 'number' || !isFinite(value)) return false;

  return true;
};
