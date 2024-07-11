export const reverseString = (value: string) => {
  if (!value) return '';

  return [...value].reverse().join('');
};
