export const containsConsecutiveCharacters = (
  string: string,
  maxRepeatCount: number
) => {
  if (!Number.isInteger(maxRepeatCount) || maxRepeatCount < 1) {
    throw new Error('Invalid maxRepeatCount value');
  }

  const regex = new RegExp(`(.)\\1{${maxRepeatCount - 1}}`);
  return regex.test(string);
};
