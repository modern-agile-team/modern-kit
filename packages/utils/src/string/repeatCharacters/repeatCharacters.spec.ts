import { describe, it, expect } from 'vitest';
import { repeatCharacters } from '.';

describe('repeatCharacters', () => {
  it('should return a new string with each character repeated the repetition count times', () => {
    const str1 = 'A!B@C';
    const repeatedStr1 = repeatCharacters(str1, 2);

    expect(repeatedStr1).toBe('AA!!BB@@CC');

    const str2 = 'Grace';
    const repeatedStr2 = repeatCharacters(str2, 3);

    expect(repeatedStr2).toBe('GGGrrraaaccceee');
  });

  it('should return the input value if the repetition count is equal to or less than 1', () => {
    const str1 = 'Hello';
    const repeatedStr1 = repeatCharacters(str1, 1);

    expect(repeatedStr1).toBe(str1);

    const str2 = 'Test';
    const repeatedStr2 = repeatCharacters(str2, 0);

    expect(repeatedStr2).toBe(str2);

    const str3 = 'Test';
    const repeatedStr3 = repeatCharacters(str2, -1);

    expect(repeatedStr3).toBe(str3);
  });

  it('should return an empty string if the input string is empty', () => {
    const str = '';
    const repeatedStr = repeatCharacters(str, 3);

    expect(repeatedStr).toBe('');
  });
});
