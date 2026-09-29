import { describe, expect, it } from 'vitest';
import { words } from '.';

describe('words', () => {
  it('쉼표와 공백으로 구분된 문자열을 단어 배열로 나눠야 합니다.', () => {
    expect(words('fred, barney, & pebbles')).toEqual([
      'fred',
      'barney',
      'pebbles',
    ]);
  });

  it('빈 문자열을 넣으면 빈 배열을 반환해야 합니다.', () => {
    expect(words('')).toEqual([]);
  });

  it('구분자만 있는 문자열을 넣으면 빈 배열을 반환해야 합니다.', () => {
    expect(words('  -- , !! ')).toEqual([]);
  });

  it('부호가 붙은 숫자에서 숫자만 뽑아내야 합니다.', () => {
    expect(words('+0 -3 +3 -4 +4')).toEqual(['0', '3', '3', '4', '4']);
  });

  it('공백으로 구분된 문자열을 단어 단위로 나눠야 합니다.', () => {
    expect(words('split these words')).toEqual(['split', 'these', 'words']);
  });

  it('camelCase 와 연속된 대문자(약어)의 경계를 인식해야 합니다.', () => {
    expect(words('camelCaseHTTPRequest')).toEqual([
      'camel',
      'Case',
      'HTTP',
      'Request',
    ]);
  });

  it('snake_case 와 kebab-case 의 구분자를 단어 경계로 취급해야 합니다.', () => {
    expect(words('foo_bar-baz qux')).toEqual(['foo', 'bar', 'baz', 'qux']);
  });

  it('악센트가 붙은 글자를 한 단어로 인식해야 합니다.', () => {
    expect(words('Lunedì 18 Set')).toEqual(['Lunedì', '18', 'Set']);
  });

  it('데바나가리 문자를 한 단어로 인식해야 합니다.', () => {
    expect(words('नमस्ते नमस्ते')).toEqual(['नमस्ते', 'नमस्ते']);
  });

  it('타이틀케이스 글자를 인식해야 합니다.', () => {
    expect(words('ǅ')).toEqual(['ǅ']);
    expect(words('ǅ ǈ ǋ ǲ')).toEqual(['ǅ', 'ǈ', 'ǋ', 'ǲ']);
    expect(words('fooǅBar')).toEqual(['fooǅ', 'Bar']);
  });

  it('서수 표기를 한 단어로 인식해야 합니다.', () => {
    expect(words('1st 2nd+3rd--4th@1ST*2ND-3RD_4TH')).toEqual([
      '1st',
      '2nd',
      '3rd',
      '4th',
      '1ST',
      '2ND',
      '3RD',
      '4TH',
    ]);
  });

  it('아포스트로피 축약형을 한 단어로 인식해야 합니다.', () => {
    expect(words("I don't+can't-won't-DON'T*THEY'RE-I'LL")).toEqual([
      'I',
      "don't",
      "can't",
      "won't",
      "DON'T",
      "THEY'RE",
      "I'LL",
    ]);
  });

  describe('한글', () => {
    it('공백으로 구분된 한글을 단어 단위로 나눠야 합니다.', () => {
      expect(words('안녕하세요 반갑습니다')).toEqual([
        '안녕하세요',
        '반갑습니다',
      ]);
    });

    it('한글과 숫자가 붙어 있으면 서로 다른 단어로 나눠야 합니다.', () => {
      expect(words('상품12개')).toEqual(['상품', '12', '개']);
    });

    it('한글은 대소문자가 없어 소문자와 같은 자리로 취급되므로, 뒤에 붙은 소문자와는 끊기지 않습니다.', () => {
      expect(words('번개장터bunjangApp')).toEqual(['번개장터bunjang', 'App']);
    });

    it('한글과 대문자로 시작하는 알파벳이 붙어 있으면 단어를 나눠야 합니다.', () => {
      expect(words('번개장터Bunjang')).toEqual(['번개장터', 'Bunjang']);
    });
  });

  describe('기호', () => {
    it('이모지가 아닌 기호는 단어를 끊지 않고 앞뒤 글자에 붙어야 합니다.', () => {
      expect(words('정가₩1000')).toEqual(['정가₩', '1000']);
      expect(words('a⇒b Link')).toEqual(['a⇒b', 'Link']);
      expect(words('악보𝄞제목')).toEqual(['악보𝄞제목']);
    });

    it('이모지로 쓰이는 기호는 앞뒤 글자와 끊어져야 합니다.', () => {
      expect(words('Bunjang™ Service')).toEqual(['Bunjang', '™', 'Service']);
      expect(words('Star★Rating')).toEqual(['Star', '★', 'Rating']);
      expect(words('알람⏰설정')).toEqual(['알람', '⏰', '설정']);
      expect(words('하트❤사랑')).toEqual(['하트', '❤', '사랑']);
      expect(words('© 2024')).toEqual(['©', '2024']);
    });

    it('단어 구분자로 쓰는 라틴-1 기호는 단어에서 빠져야 합니다.', () => {
      expect(words('100°C')).toEqual(['100', 'C']);
      expect(words('±3 ×4 ÷5')).toEqual(['3', '4', '5']);
    });

    it('변형 선택자가 붙은 기호는 선택자까지 한 단어로 유지해야 합니다.', () => {
      expect(words('별점★️후기')).toEqual(['별점', '★️', '후기']);
      expect(words('☀️ 맑음')).toEqual(['☀️', '맑음']);
    });
  });

  describe('이모지', () => {
    it('단일 코드포인트 이모지를 각각 하나의 단어로 인식해야 합니다.', () => {
      expect(words('example🚀with✨emojis💡and🔍special🌟characters')).toEqual([
        'example',
        '🚀',
        'with',
        '✨',
        'emojis',
        '💡',
        'and',
        '🔍',
        'special',
        '🌟',
        'characters',
      ]);
    });

    it('ZWJ 로 이어진 이모지 시퀀스를 한 단어로 유지해야 합니다.', () => {
      expect(words('가족 👨‍👩‍👧 끝')).toEqual(['가족', '👨‍👩‍👧', '끝']);
    });

    it('피부색 수정자가 붙은 이모지를 한 단어로 유지해야 합니다.', () => {
      expect(words('wave 👋🏽 end')).toEqual(['wave', '👋🏽', 'end']);
    });

    it('지역 표시 문자 두 개로 이뤄진 국기 이모지를 한 단어로 유지해야 합니다.', () => {
      expect(words('flag 🇰🇷 end')).toEqual(['flag', '🇰🇷', 'end']);
    });

    it('키캡 이모지를 숫자가 아닌 하나의 이모지로 인식해야 합니다.', () => {
      expect(words('1️⃣')).toEqual(['1️⃣']);
    });

    it('태그 시퀀스로 이뤄진 깃발 이모지를 한 단어로 유지해야 합니다.', () => {
      expect(words('영국 🏴󠁧󠁢󠁥󠁮󠁧󠁿 깃발')).toEqual(['영국', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '깃발']);
    });
  });

  describe('ASCII 가 아닌 숫자', () => {
    it('아랍-인도 숫자를 한 단어로 인식해야 합니다.', () => {
      expect(words('١٢٣')).toEqual(['١٢٣']);
      expect(words('٣ dogs')).toEqual(['٣', 'dogs']);
    });

    it('전각 숫자를 한 단어로 인식해야 합니다.', () => {
      expect(words('１２３')).toEqual(['１２３']);
      expect(words('상품 １２ 개')).toEqual(['상품', '１２', '개']);
    });

    it('ASCII 가 아닌 숫자는 글자로 취급되므로, 뒤에 붙은 소문자와 끊기지 않습니다.', () => {
      expect(words('٢nd')).toEqual(['٢nd']);
    });

    it('숫자형 글자(로마 숫자)를 단어로 인식해야 합니다.', () => {
      expect(words('ⅣⅤ')).toEqual(['ⅣⅤ']);
      expect(words('第Ⅳ章')).toEqual(['第Ⅳ章']);
    });
  });

  describe('결합 문자(유니코드 정규화)', () => {
    it('NFC 와 NFD 로 정규화한 문자열이 같은 단어를 반환해야 합니다.', () => {
      const str = 'café';
      const nfdStr = str.normalize('NFD'); // 'café', length: 5
      const nfcStr = str.normalize('NFC'); // 'café', length: 4

      expect(words(nfcStr)).toEqual([nfcStr]);
      expect(words(nfdStr)).toEqual([nfdStr]);
    });

    it('단어 중간에 결합 문자가 있어도 그 지점에서 단어를 나누지 않아야 합니다.', () => {
      const str = 'abćdef';
      const nfdStr = str.normalize('NFD'); // 'abćdef', length: 7
      const nfcStr = str.normalize('NFC'); // 'abćdef', length: 6

      expect(words(nfcStr)).toEqual([nfcStr]);
      expect(words(nfdStr)).toEqual([nfdStr]);
    });
  });
});
