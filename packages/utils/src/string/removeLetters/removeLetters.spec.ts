import { describe, it, expect } from 'vitest';
import { removeLetters } from '.';

describe('removeLetters', () => {
  const str = 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300! 😄';

  it('옵션 인자가 정의되지 않은 경우 기본적으로 문자를 제외한 모든 문자열을 반환해야 합니다.', () => {
    const withoutLetters = removeLetters(str);
    expect(withoutLetters).toBe(', !  123  $100 + 200 = 300! 😄');
  });

  it('숫자를 제외한 문자열을 반환해야 합니다.', () => {
    const withoutNumbers = removeLetters(str, {
      numbers: true,
    });
    expect(withoutNumbers).toBe(
      'Hello, 世界! 안녕하세요  こんにちは $ +  = ! 😄'
    );
  });

  it('특수문자를 제외한 문자열을 반환해야 합니다.', () => {
    const withoutSpecialCharacters = removeLetters(str, {
      specialCharacters: true,
    });
    expect(withoutSpecialCharacters).toBe(
      'Hello 世界 안녕하세요 123 こんにちは 100  200  300 '
    );
  });

  it('문자와 공백을 제외한 문자열을 반환해야 합니다.', () => {
    const withoutLettersAndWhiteSpace = removeLetters(str, {
      letters: true,
      whiteSpace: true,
    });
    expect(withoutLettersAndWhiteSpace).toBe(',!123$100+200=300!😄');
  });

  it('문자와 숫자를 제외한 문자열을 반환해야 합니다.', () => {
    const withoutLettersAndNumbers = removeLetters(str, {
      letters: true,
      numbers: true,
    });
    expect(withoutLettersAndNumbers).toBe(', !    $ +  = ! 😄');
  });

  it('숫자와 특수문자를 제외한 문자열을 반환해야 합니다.', () => {
    const withoutNumbersAndSpecialCharacters = removeLetters(str, {
      numbers: true,
      specialCharacters: true,
    });
    expect(withoutNumbersAndSpecialCharacters).toBe(
      'Hello 世界 안녕하세요  こんにちは      '
    );
  });

  it('모든 옵션을 주면 빈 문자열을 반환해야 합니다.', () => {
    const withoutAllCharacters = removeLetters(str, {
      letters: true,
      numbers: true,
      specialCharacters: true,
      whiteSpace: true,
    });
    expect(withoutAllCharacters).toBe('');
  });
});
