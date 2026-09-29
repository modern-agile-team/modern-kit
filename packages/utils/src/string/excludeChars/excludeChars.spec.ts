import { describe, it, expect } from 'vitest';
import { excludeChars } from '.';

describe('excludeChars', () => {
  const str = 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300! 😄';

  it('옵션 인자가 정의되지 않은 경우 기본적으로 문자를 제외한 모든 문자열을 반환해야 합니다.', () => {
    const withoutLetters = excludeChars(str);
    expect(withoutLetters).toBe(', !  123  $100 + 200 = 300! 😄');
  });

  it('숫자를 제외한 문자열을 반환해야 합니다.', () => {
    const withoutNumbers = excludeChars(str, {
      numbers: true,
    });
    expect(withoutNumbers).toBe(
      'Hello, 世界! 안녕하세요  こんにちは $ +  = ! 😄'
    );
  });

  it('특수문자를 제외한 문자열을 반환해야 합니다.', () => {
    const withoutSpecialCharacters = excludeChars(str, {
      specialCharacters: true,
    });
    expect(withoutSpecialCharacters).toBe(
      'Hello 世界 안녕하세요 123 こんにちは 100  200  300 '
    );
  });

  it('문자와 공백을 제외한 문자열을 반환해야 합니다.', () => {
    const withoutLettersAndWhiteSpace = excludeChars(str, {
      letters: true,
      whiteSpace: true,
    });
    expect(withoutLettersAndWhiteSpace).toBe(',!123$100+200=300!😄');
  });

  it('문자와 숫자를 제외한 문자열을 반환해야 합니다.', () => {
    const withoutLettersAndNumbers = excludeChars(str, {
      letters: true,
      numbers: true,
    });
    expect(withoutLettersAndNumbers).toBe(', !    $ +  = ! 😄');
  });

  it('숫자와 특수문자를 제외한 문자열을 반환해야 합니다.', () => {
    const withoutNumbersAndSpecialCharacters = excludeChars(str, {
      numbers: true,
      specialCharacters: true,
    });
    expect(withoutNumbersAndSpecialCharacters).toBe(
      'Hello 世界 안녕하세요  こんにちは      '
    );
  });

  it('모든 옵션을 주면 빈 문자열을 반환해야 합니다.', () => {
    const withoutAllCharacters = excludeChars(str, {
      letters: true,
      numbers: true,
      specialCharacters: true,
      whiteSpace: true,
    });
    expect(withoutAllCharacters).toBe('');
  });

  describe('결합 문자 / 이모지 시퀀스', () => {
    it('숫자만 제거할 때 결합 악센트를 잃지 않아야 합니다.', () => {
      const nfd = 'José'.normalize('NFD');

      expect(excludeChars(nfd, { numbers: true })).toBe(nfd);
    });

    it('숫자만 제거할 때 이모지 시퀀스를 분해하지 않아야 합니다.', () => {
      const family = '\u{1F468}\u200D\u{1F469}\u200D\u{1F467}'; // 👨‍👩‍👧

      expect(excludeChars(family, { numbers: true })).toBe(family);
    });
  });
});
