import { describe, it, expect } from 'vitest';
import { extractChars } from '.';

describe('extractChars', () => {
  const str = 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300! 😄';

  it('옵션 인자가 정의되지 않은 경우 기본적으로 문자만 포함된 문자열을 반환해야 합니다.', () => {
    const letterOnly = extractChars(str);
    expect(letterOnly).toBe('Hello世界안녕하세요こんにちは');
  });

  it('숫자만 포함한 문자열을 반환해야 합니다.', () => {
    const numbersOnly = extractChars(str, {
      numbers: true,
    });
    expect(numbersOnly).toBe('123100200300');
  });

  it('특수문자만 포함한 문자열을 반환해야 합니다.', () => {
    const specialCharactersOnly = extractChars(str, {
      specialCharacters: true,
    });
    expect(specialCharactersOnly).toBe(',!$+=!😄');
  });

  it('문자와 공백을 포함한 문자열을 반환해야 합니다.', () => {
    const lettersAndWhiteSpace = extractChars(str, {
      letters: true,
      whiteSpace: true,
    });
    expect(lettersAndWhiteSpace).toBe(
      'Hello 世界 안녕하세요  こんにちは      '
    );
  });

  it('문자와 숫자를 포함한 문자열을 반환해야 합니다.', () => {
    const lettersAndNumbers = extractChars(str, {
      letters: true,
      numbers: true,
    });

    expect(lettersAndNumbers).toBe('Hello世界안녕하세요123こんにちは100200300');
  });

  it('숫자와 특수문자를 포함한 문자열을 반환해야 합니다.', () => {
    const numbersAndSpecialCharacters = extractChars(str, {
      numbers: true,
      specialCharacters: true,
    });
    expect(numbersAndSpecialCharacters).toBe(',!123$100+200=300!😄');
  });

  it('모든 옵션을 주면 문자열을 그대로 반환해야 합니다.', () => {
    const allCharacters = extractChars(str, {
      letters: true,
      numbers: true,
      specialCharacters: true,
      whiteSpace: true,
    });
    expect(allCharacters).toBe(str);
  });

  describe('결합 문자 / 이모지 시퀀스', () => {
    const ZWJ = '\u200D'; // Zero Width Joiner
    const VS16 = '\uFE0F'; // Variation Selector-16 (이모지 표현)
    const FAMILY = `\u{1F468}${ZWJ}\u{1F469}${ZWJ}\u{1F467}`; // 👨‍👩‍👧
    const HEART = `\u2764${VS16}`; // ❤️

    it('NFD 정규화된 문자열에서 결합 악센트를 문자와 함께 보존해야 합니다.', () => {
      const nfd = 'José'.normalize('NFD');

      expect(extractChars(nfd, { letters: true })).toBe(nfd);
    });

    it('결합 악센트만 남기고 문자를 제거하지 않아야 합니다.', () => {
      const nfd = 'José'.normalize('NFD');

      expect(extractChars(nfd, { numbers: true })).toBe('');
    });

    it('NFD 정규화된 한글 자모를 문자로 취급해야 합니다.', () => {
      const nfd = '안녕'.normalize('NFD');

      expect(extractChars(nfd, { letters: true })).toBe(nfd);
    });

    it('ZWJ 로 이어진 이모지 시퀀스를 분해하지 않아야 합니다.', () => {
      expect(extractChars(FAMILY, { specialCharacters: true })).toBe(FAMILY);
    });

    it('이모지 변형 선택자를 보존해야 합니다.', () => {
      expect(extractChars(HEART, { specialCharacters: true })).toBe(HEART);
    });

    it('문자만 추출할 때 이모지 결합 문자는 남기지 않아야 합니다.', () => {
      expect(extractChars(`a${FAMILY}b`, { letters: true })).toBe('ab');
    });

    it('모든 옵션을 주면 결합 문자가 섞인 문자열도 그대로 반환해야 합니다.', () => {
      const mixed = `a1 !${HEART}${FAMILY}${'José'.normalize('NFD')}`;

      expect(
        extractChars(mixed, {
          letters: true,
          numbers: true,
          specialCharacters: true,
          whiteSpace: true,
        })
      ).toBe(mixed);
    });

    it('표시를 왜곡하는 제어 문자는 옵션과 무관하게 제거해야 합니다.', () => {
      const RLO = '\u202E'; // Right-to-Left Override
      const ZWSP = '\u200B'; // Zero Width Space

      expect(
        extractChars(`a${RLO}b${ZWSP}c`, {
          letters: true,
          numbers: true,
          specialCharacters: true,
          whiteSpace: true,
        })
      ).toBe('abc');
    });

    it('BOM 은 JS 정규식의 \\s 에 포함되므로 공백 옵션을 따라야 합니다.', () => {
      const BOM = '\uFEFF'; // ZWNBSP — JS 명세상 공백 문자

      expect(extractChars(`a${BOM}b`, { letters: true })).toBe('ab');
      expect(
        extractChars(`a${BOM}b`, { letters: true, whiteSpace: true })
      ).toBe(`a${BOM}b`);
    });
  });
});
