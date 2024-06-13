export const containsHangulConsonantsAndVowel = (string: string) => {
  return /[ㄱ-ㅎ|ㅏ-ㅣ]/.test(string);
};
