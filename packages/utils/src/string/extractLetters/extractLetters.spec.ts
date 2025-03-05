import { describe, it, expect } from 'vitest';
import { extractLetters } from '.';

describe('extractLetters', () => {
  const str = 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300! 😄';

  it('옵션 인자가 정의되지 않은 경우 기본적으로 문자만 포함된 문자열을 반환해야 합니다.', () => {
    const letterOnly = extractLetters(str);

    expect(letterOnly).toBe('Hello世界안녕하세요こんにちは');
  });

  it('숫자만 포함한 문자열을 반환해야 합니다.', () => {
    const numbersOnly = extractLetters(str, {
      numbers: true,
    });

    expect(numbersOnly).toBe('123100200300');
  });

  it('특수문자만 포함한 문자열을 반환해야 합니다.', () => {
    const specialCharactersOnly = extractLetters(str, {
      specialCharacters: true,
    });

    expect(specialCharactersOnly).toBe(',!$+=!😄');
  });

  it('문자와 공백을 포함한 문자열을 반환해야 합니다.', () => {
    const lettersAndWhiteSpace = extractLetters(str, {
      letters: true,
      whiteSpace: true,
    });

    expect(lettersAndWhiteSpace).toBe(
      'Hello 世界 안녕하세요  こんにちは      '
    );
  });

  it('문자와 숫자를 포함한 문자열을 반환해야 합니다.', () => {
    const lettersAndNumbers = extractLetters(str, {
      letters: true,
      numbers: true,
    });

    expect(lettersAndNumbers).toBe('Hello世界안녕하세요123こんにちは100200300');
  });

  it('숫자와 특수문자를 포함한 문자열을 반환해야 합니다.', () => {
    const numbersAndSpecialCharacters = extractLetters(str, {
      numbers: true,
      specialCharacters: true,
    });

    expect(numbersAndSpecialCharacters).toBe(',!123$100+200=300!😄');
  });

  it('모든 옵션을 주면 문자열을 그대로 반환해야 합니다.', () => {
    const allCharacters = extractLetters(str, {
      letters: true,
      numbers: true,
      specialCharacters: true,
      whiteSpace: true,
    });

    expect(allCharacters).toBe(str);
  });
});
