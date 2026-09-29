import { describe, expect, it } from 'vitest';
import { truncate } from '.';

describe('truncate', () => {
  const str = 'hi-diddly-ho there, neighborino'; // 31자

  it('옵션을 주지 않으면 30자로 자르고 뒤에 생략 기호를 붙여야 합니다.', () => {
    expect(truncate(str)).toBe('hi-diddly-ho there, neighbo...');
  });

  it('생략 기호를 포함한 길이가 length 를 넘지 않아야 합니다.', () => {
    expect(truncate(str, { length: 24 })).toBe('hi-diddly-ho there, n...');
    expect(truncate(str, { length: 24 })).toHaveLength(24);
  });

  it('문자열이 length 이하면 원본을 그대로 반환해야 합니다.', () => {
    expect(truncate(str, { length: 31 })).toBe(str);
    expect(truncate('')).toBe('');
  });

  it('omission 으로 생략 기호를 바꿀 수 있어야 합니다.', () => {
    expect(truncate(str, { omission: ' [...]' })).toBe(
      'hi-diddly-ho there, neig [...]'
    );
  });

  it('omission 에 undefined 를 넘기면 기본값을 써야 합니다.', () => {
    expect(truncate(str, { omission: undefined })).toBe(
      'hi-diddly-ho there, neighbo...'
    );
  });

  it('length 가 omission 의 길이보다 짧으면 omission 만 반환해야 합니다.', () => {
    expect(truncate('hello', { length: 4 })).toBe('h...');
    expect(truncate('hello', { length: 3 })).toBe('...');
  });

  describe('separator', () => {
    it('마지막 구분자까지만 남겨 단어를 끊지 않아야 합니다.', () => {
      expect(truncate(str, { length: 24, separator: ' ' })).toBe(
        'hi-diddly-ho there,...'
      );
      expect(truncate(str, { length: 24, separator: /,? +/ })).toBe(
        'hi-diddly-ho there...'
      );
    });

    it('잘리는 지점이 이미 구분자라면 뒤로 되돌리지 않아야 합니다.', () => {
      // 'abc def' 다음 글자가 공백이라 단어를 끊지 않았습니다.
      expect(truncate('abc def ghi', { length: 10, separator: ' ' })).toBe(
        'abc def...'
      );
      expect(truncate('abc def ghi', { length: 10, separator: /\s/ })).toBe(
        'abc def...'
      );
    });

    it('구분자가 없으면 length 지점에서 그대로 잘라야 합니다.', () => {
      expect(truncate('abcdefghij', { length: 8, separator: ' ' })).toBe(
        'abcde...'
      );
    });

    it('정규식 특수문자가 든 문자열 separator 를 문자 그대로 다뤄야 합니다.', () => {
      expect(truncate('a.b.c.d.e.f', { length: 9, separator: '.' })).toBe(
        'a.b.c...'
      );
      expect(truncate('a(b(c(d(e', { length: 7, separator: '(' })).toBe(
        'a(b...'
      );
    });

    it('줄바꿈이 있어도 마지막 구분자를 찾아야 합니다.', () => {
      expect(
        truncate('aa bb\ncc dd ee ff', { length: 14, separator: ' ' })
      ).toBe('aa bb\ncc dd...');
    });

    it('길이가 0 인 매치를 만들어내는 정규 표현식에도 멈추지 않아야 합니다.', () => {
      expect(truncate('abc def', { length: 6, separator: /\b/ })).toBe(
        'abc...'
      );
    });

    it('전달한 정규 표현식의 lastIndex 를 건드리지 않아야 합니다.', () => {
      const separator = / /g;

      truncate(str, { length: 24, separator });

      expect(separator.lastIndex).toBe(0);
    });
  });

  describe('글자 수 세기', () => {
    it('한글을 글자 수 기준으로 잘라야 합니다.', () => {
      expect(truncate('상품명이 아주 긴 번개장터 상품', { length: 10 })).toBe(
        '상품명이 아주...'
      );
    });

    it('여러 코드 포인트로 이뤄진 이모지를 한 글자로 세고 쪼개지 않아야 합니다.', () => {
      expect(truncate('😀😀😀😀😀', { length: 4 })).toBe('😀...'); // 서로게이트 페어
      expect(truncate('가족은 👨‍👩‍👧 입니다', { length: 8 })).toBe('가족은 👨‍👩‍👧...'); // ZWJ 시퀀스
      expect(truncate('국기 🇰🇷 입니다', { length: 7 })).toBe('국기 🇰🇷...'); // 지역 표시 문자
      expect(truncate('wave 👋🏽 end', { length: 9 })).toBe('wave 👋🏽...'); // 피부색 수정자
      expect(truncate('1️⃣2️⃣3️⃣4️⃣5️⃣', { length: 4 })).toBe('1️⃣...'); // 키캡
    });

    it('NFD 로 분해된 결합 문자를 앞 글자와 함께 남겨야 합니다.', () => {
      const nfd = 'José Álvarez'.normalize('NFD'); // 12글자(코드 유닛 14)

      expect(truncate(nfd, { length: 12 })).toBe(nfd);
      expect(truncate(nfd, { length: 7 })).toBe(
        `${'José'.normalize('NFD')}...`
      );
    });
  });
});
