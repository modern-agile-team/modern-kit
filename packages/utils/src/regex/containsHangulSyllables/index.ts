export const containsHangulSyllables = (string: string) => {
  return /[가-힣]/.test(string);
};
