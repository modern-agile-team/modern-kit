/** 라틴 영역의 비문자(제어·기호·구두점) 범위입니다. 단어 구분자로 사용합니다. */
const rNonCharLatin = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\xd7\\xf7';

/** 결합 문자(`\p{M}`)를 붙여 하나의 글자로 취급하는 대문자/소문자입니다. */
const rUnicodeUpper = '(?:\\p{Lu}\\p{M}*)';
const rUnicodeLower = '(?:\\p{Ll}\\p{M}*)';

/**
 * 이모지로 취급할 문자입니다. 이모지 표현이 기본인 문자(`⏰` `⚽` `🚀`)와 그림 문자
 * (`☀` `❤` `™`)를 모두 포함하며, 두 곳에서 같은 기준으로 쓰입니다.
 *
 * - `rMisc` 에서 제외해, 이모지가 앞뒤 글자에 붙지 않고 따로 떨어지게 합니다.
 * - `rEmojiAtom` 의 본체가 되어, 변형 선택자·피부색·태그까지 한 덩어리로 묶습니다.
 */
const rEmojiPict = '(?:\\p{Emoji_Presentation}|\\p{Extended_Pictographic})';

/**
 * 대소문자 구분이 없는 글자입니다. 소문자와 같은 자리에서 취급됩니다.
 *
 * - 수식 문자(`\p{Lm}`), 한글·한자·가나(`\p{Lo}`), 타이틀케이스(`\p{Lt}`)
 * - 단어를 끊지 않는 숫자·기호(`\p{N}` `\p{S}`): 로마 숫자 `Ⅳ`, 전각 숫자 `１`,
 *   아랍-인도 숫자 `١`, 통화 기호 `₩`, 화살표 `⇒` 등
 *
 * 숫자·기호 중 라틴 비문자(`©` `°` `±`)는 단어 구분자라서 제외하고, ASCII 숫자와
 * 이모지는 각자 전용 규칙에서 따로 처리하므로 제외합니다.
 */
const rMisc = `(?:(?:[\\p{Lm}\\p{Lo}\\p{Lt}]|(?![${rNonCharLatin}0-9]|${rEmojiPict})[\\p{N}\\p{S}])\\p{M}*)`;

/** ASCII 숫자 한 글자입니다. 그 밖의 숫자는 `rMisc` 에서 글자로 취급합니다. */
const rNumber = '\\d';

/** 아포스트로피 축약형입니다. `don't` 가 `don` + `t` 로 쪼개지지 않게 합니다. */
const rUnicodeOptContrLower = "(?:['’](?:d|ll|m|re|s|t|ve))?";
const rUnicodeOptContrUpper = "(?:['’](?:D|LL|M|RE|S|T|VE))?";

/** 단어 경계로 볼 문자(공백·구두점·라틴 비문자)입니다. */
const rUnicodeBreak = `[\\p{Z}\\p{P}${rNonCharLatin}]`;

const rUnicodeMiscUpper = `(?:${rUnicodeUpper}|${rMisc})`;
const rUnicodeMiscLower = `(?:${rUnicodeLower}|${rMisc})`;

/** 이모지 뒤에 붙는 변형 선택자(`U+FE0F`)와 피부색 수정자입니다. */
const rEmojiMod = '\\uFE0F?\\p{Emoji_Modifier}?';

/** 태그 시퀀스입니다. 잉글랜드 깃발(`🏴󠁧󠁢󠁥󠁮󠁧󠁿`) 같은 하위 지역 깃발에 쓰입니다. */
const rEmojiTag = '[\\u{E0020}-\\u{E007F}]*';

/**
 * 이모지 한 덩어리입니다.
 *
 * - 지역 표시 문자 두 개로 이뤄진 국기 (`🇰🇷`)
 * - 키캡 (`1️⃣` `#️⃣`)
 * - 그 밖의 이모지와 뒤에 붙는 변형 선택자·피부색·태그 (`☀️` `👋🏽`)
 */
const rEmojiAtom =
  '(?:' +
  [
    '\\p{Regional_Indicator}{2}',
    `[${rNumber}#*]\\uFE0F?\\u20E3`,
    `${rEmojiPict}${rEmojiMod}${rEmojiTag}`,
  ].join('|') +
  ')';

/** ZWJ(`U+200D`)로 이어진 이모지 시퀀스입니다. `👨‍👩‍👧` 가 한 단어로 유지됩니다. */
const rEmojiSeq = `${rEmojiAtom}(?:\\u200D${rEmojiAtom})*`;

let rUnicodeWord: RegExp | undefined;

/**
 * @description 문자열을 단어 단위로 끊는 정규 표현식을 생성합니다.
 *
 * 다음 경우를 하나의 단어로 인식합니다.
 * - 대문자 하나 + 소문자 여러 개 + 축약형 (`camelCase`)
 * - 뒤에 소문자가 오지 않는 대문자 연속 (`HTTPRequest` 의 `HTTP`)
 * - 대소문자가 없는 글자와 단어를 끊지 않는 숫자·기호 (한글·한자·`Ⅳ`·`₩`)
 * - 서수 표기 (`1st`, `2nd`, `3rd`, `4th`)
 * - 이모지 시퀀스 (국기·키캡·피부색·ZWJ 조합 포함)
 * - ASCII 숫자 연속
 *
 * 이모지는 앞뒤 글자와 끊어져 각각 하나의 단어가 됩니다. (`'알람⏰설정'` → `['알람', '⏰', '설정']`)
 * 이모지가 아닌 기호는 반대로 단어를 끊지 않고 글자처럼 붙습니다. (`'정가₩1000'` → `['정가₩', '1000']`)
 *
 * 이모지 규칙이 글자 규칙보다 뒤에 있어도 안전합니다.
 * 이모지는 `rMisc` 에서 빠져 있어 앞 규칙에 먹히지 않습니다. 다만 키캡(`1️⃣`)이 숫자로 쪼개지지 않으려면 숫자 규칙보다는 앞에 있어야 합니다.
 *
 * 결합 문자(`\p{M}`)는 앞 글자에 붙어서 처리되므로, NFD 로 분해된 `é` 도 두 단어가 아닌 한 글자로 취급됩니다.
 *
 * 유니코드 속성 이스케이프를 쓰기 때문에 Chrome 64 / Safari 11.1 미만 엔진은 이 패턴을 파싱하지 못합니다.
 * 문자열을 조립해서 만들므로 트랜스파일러도 다시 쓸 수 없어, 지연 생성합니다.
 * 즉 모듈을 import 하는 것만으로는 예외가 발생하지 않고 `words` 를 호출할 때 비로소 엔진 지원이 필요합니다.
 *
 * @example
 * const matches = 'camelCaseHTTPRequest🚀'.match(getUnicodeWordPattern());
 * // matches: ['camel', 'Case', 'HTTP', 'Request', '🚀']
 */
function getUnicodeWordPattern(): RegExp {
  if (rUnicodeWord == null) {
    rUnicodeWord = RegExp(
      [
        `${rUnicodeUpper}?${rUnicodeLower}+${rUnicodeOptContrLower}(?=${rUnicodeBreak}|${rUnicodeUpper}|$)`,

        `${rUnicodeMiscUpper}+${rUnicodeOptContrUpper}(?=${rUnicodeBreak}|${rUnicodeUpper}${rUnicodeMiscLower}|$)`,

        `${rUnicodeUpper}?${rUnicodeMiscLower}+${rUnicodeOptContrLower}`,

        `${rUnicodeUpper}+${rUnicodeOptContrUpper}`,

        `${rNumber}*(?:1ST|2ND|3RD|(?![123])${rNumber}TH)(?=\\b|[a-z_])`,

        `${rNumber}*(?:1st|2nd|3rd|(?![123])${rNumber}th)(?=\\b|[A-Z_])`,

        rEmojiSeq,

        `${rNumber}+`,
      ].join('|'),
      'gu'
    );
  }
  return rUnicodeWord;
}

/**
 * @description 문자열을 단어 배열로 나누는 함수입니다. 공백과 구두점을 구분자로 취급하며,
 * `camelCase` 와 `PascalCase` 의 낱말 경계도 인식합니다.
 *
 * 한글·한자·가나처럼 대소문자가 없는 글자는 소문자와 같은 자리에서 취급되므로, 뒤에
 * 이어지는 소문자 알파벳과는 끊기지 않습니다. (`'번개장터bunjangApp'` → `['번개장터bunjang', 'App']`)
 *
 * @param {string} str - 나눌 문자열입니다.
 * @returns {string[]} 문자열에서 뽑아낸 단어 배열입니다. 단어가 없으면 빈 배열을 반환합니다.
 *
 * @example
 * words('fred, barney, & pebbles'); // ['fred', 'barney', 'pebbles']
 *
 * @example
 * words('camelCaseHTTPRequest🚀'); // ['camel', 'Case', 'HTTP', 'Request', '🚀']
 *
 * @example
 * words('Lunedì 18 Set'); // ['Lunedì', '18', 'Set']
 *
 * @example
 * words("it's the 1st time"); // ["it's", 'the', '1st', 'time']
 *
 * @example
 * // 이모지가 아닌 기호는 단어를 끊지 않습니다.
 * words('정가₩1000'); // ['정가₩', '1000']
 *
 * @example
 * // 이모지는 앞뒤 글자와 끊어집니다.
 * words('알람⏰설정'); // ['알람', '⏰', '설정']
 *
 * @example
 * // ZWJ 로 이어진 이모지는 한 단어로 유지됩니다.
 * words('가족 👨‍👩‍👧'); // ['가족', '👨‍👩‍👧']
 *
 * @example
 * // ASCII 가 아닌 숫자는 글자로 취급합니다.
 * words('상품 １２ 개'); // ['상품', '１２', '개']
 */
export function words(str: string): string[] {
  return Array.from(str.match(getUnicodeWordPattern()) ?? []);
}
