export const isNullish = <T>(
  val: T | undefined | null
): val is undefined | null => {
  return val == null;
};
