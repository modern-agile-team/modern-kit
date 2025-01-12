import { describe, it, expect } from 'vitest';
import { reverseString } from '.';

describe('reverseString', () => {
  it('주어진 문자열에 대해 반전된 문자열을 반환해야 합니다.', () => {
    const normalString = 'ABC가나다';
    const reversedString = reverseString(normalString);

    expect(reversedString).toBe('다나가CBA');
  });

  it('빈 문자열에 대해 빈 문자열을 반환해야 합니다.', () => {
    const emptyString = '';
    const reversedString = reverseString(emptyString);

    expect(reversedString).toBe('');
  });

  it('특수 문자가 포함된 문자열에 대해 반전된 문자열을 반환해야 합니다.', () => {
    const stringWithSpecialCharacter = 'A!B@C';
    const reversedString = reverseString(stringWithSpecialCharacter);

    expect(reversedString).toBe('C@B!A');
  });

  it('유니코드 문자가 포함된 문자열에 대해 반전된 문자열을 반환해야 합니다.', () => {
    const stringWithUnicodeCharacter = 'foo 𝌆 bar';
    const reversedString = reverseString(stringWithUnicodeCharacter);

    expect(reversedString).toBe('rab 𝌆 oof');
  });
});
