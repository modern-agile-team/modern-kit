export const isFunction = <T extends (...args: any[]) => any>(
  arg: unknown
): arg is T => {
  return arg instanceof Function;
};
