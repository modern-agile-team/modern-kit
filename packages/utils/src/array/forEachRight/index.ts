export const forEachRight = <T>(
  array: T[] | readonly T[],
  callback: (currentValue: T, index: number, array: T[] | readonly T[]) => void
): void => {
  for (let i = array.length - 1; i >= 0; i--) {
    callback(array[i], i, array);
  }
};
