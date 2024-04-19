export const isFunction = (arg: unknown): arg is Function => {
  return arg instanceof Function;
};
