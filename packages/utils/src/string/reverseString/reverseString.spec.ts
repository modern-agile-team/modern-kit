import { reverseString } from '.';

describe.concurrent('reverseString', () => {
  it('should return the empty string for a invalid value', () => {
    const reversedString = reverseString(undefined as unknown as string);

    expect(reversedString).toBe('');
  });

  it('should return the reversed string for a normal string', () => {
    const normalString = 'ABC가나다';
    const reversedString = reverseString(normalString);

    expect(reversedString).toBe('다나가CBA');
  });

  it('should return the reversed string for a string with special characters', () => {
    const stringWithSpecialCharacter = 'A!B@C';
    const reversedString = reverseString(stringWithSpecialCharacter);

    expect(reversedString).toBe('C@B!A');
  });

  it('should return the reversed string for a string with unicode characters', () => {
    const stringWithUnicodeCharacter = 'foo 𝌆 bar';
    const reversedString = reverseString(stringWithUnicodeCharacter);

    expect(reversedString).toBe('rab 𝌆 oof');
  });
});
