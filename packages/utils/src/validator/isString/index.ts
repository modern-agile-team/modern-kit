export const isString = (arg: unknown): arg is string => {
  return typeof arg === 'string';
};
