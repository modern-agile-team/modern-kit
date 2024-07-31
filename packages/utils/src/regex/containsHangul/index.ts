import { containsHangulSyllables } from '../containsHangulSyllables';
import { containsHangulConsonantsAndVowel } from '../containsHangulConsonantsAndVowel';

export function containsHangul(string: string) {
  return (
    containsHangulConsonantsAndVowel(string) || containsHangulSyllables(string)
  );
}
