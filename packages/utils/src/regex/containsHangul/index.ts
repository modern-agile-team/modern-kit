import { containsHangulSyllables } from '../containsHangulSyllables';
import { containsHangulConsonantsAndVowel } from '../containsHangulConsonantsAndVowel';

export const containsHangul = (string: string) => {
  return (
    containsHangulConsonantsAndVowel(string) || containsHangulSyllables(string)
  );
};
