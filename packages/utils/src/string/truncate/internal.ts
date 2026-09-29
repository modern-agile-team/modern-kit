/**
 * `Intl.Segmenter` 를 거쳐야 하는 문자열인지 가리는 패턴입니다.
 *
 * 두 조각의 뜻은 이렇습니다.
 *
 * 1. `[\u0080-\uffff]` — ASCII 바깥 코드 유닛이 하나라도 있는지 판별합니다.
 * 2. `|\r` — CR 이 있는지 판별합니다.
 *
 * 매치되지 않으면 코드 유닛 하나가 곧 한 글자이므로 바로 자릅니다.
 *
 * ```
 * // 매치 X → slice 안전 (코드 유닛 = 글자)
 * 'hello'        유닛 5 / 글자 5
 * 'a-b_c 123!'     유닛 10 / 글자 10
 *
 * // 매치 O → 분절 필요
 * 'café' (NFD)   유닛 5 / 글자 4
 * '👨‍👩‍👧'          유닛 8 / 글자 1
 * ```
 */
const rNeedsSegmenter = /[\u0080-\uffff]|\r/;

let segmenter: Intl.Segmenter | undefined;

/**
 * @description 문자열 앞에서부터, 사용자가 한 글자로 인식하는 단위(그래핌 클러스터)를 최대 `count` 개까지만 끊어 옵니다.
 * `count` 를 주지 않으면 문자열 전체를 끊습니다.
 *
 * `[...str]` 이나 `Array.from(str)` 로는 안 되는 이유가 있습니다.
 * 그것들은 코드 포인트 단위로 나누는데, 화면에 한 글자로 보이는 것이 코드 포인트 여러 개일 수 있습니다. 코드 포인트로 세면 다음이 전부 중간에서 쪼개집니다.
 * 그래서 `Intl.Segmenter` 로 끊습니다. 필요한 개수만 끊고 멈추므로, 긴 문자열을 짧게 자를 때 전체를 훑지 않습니다.
 *
 * | 문자열            | 코드 유닛 | 코드 포인트 | 사람이 보는 글자 |
 * | ----------------- | --------- | ----------- | ---------------- |
 * | `'😀'`             | 2         | 1           | 1                |
 * | `'👨‍👩‍👧'` (ZWJ 조합)  | 8         | 5           | 1                |
 * | `'🇰🇷'` (국기)       | 4         | 2           | 1                |
 * | `'👋🏽'` (피부색)     | 4         | 2           | 1                |
 * | `'1️⃣'` (키캡)       | 3         | 3           | 1                |
 * | `'é'` (NFD 분해형) | 2         | 2           | 1                |
 *
 * @note `Intl.Segmenter` 는 Node 16+, Chrome 87+, Safari 14.1+, Firefox 125+ 에만 있습니다. 없는 엔진에서는 코드 포인트로 폴백합니다.
 * 이때 서로게이트 페어는 안전하지만, 위 표의 나머지는 여러 글자로 세어집니다.
 */
export function takeGraphemes(
  str: string,
  count: number = Number.POSITIVE_INFINITY
): string[] {
  const graphemes: string[] = [];

  if (count <= 0) {
    return graphemes;
  }

  // 분절 비용을 아낄 수 있는 문자열은 코드 유닛으로 그냥 자릅니다
  if (!rNeedsSegmenter.test(str)) {
    return str.slice(0, count).split('');
  }

  if (typeof Intl.Segmenter === 'undefined') {
    for (const codePoint of str) {
      graphemes.push(codePoint);

      if (graphemes.length >= count) {
        break;
      }
    }

    return graphemes;
  }

  segmenter ??= new Intl.Segmenter(undefined, { granularity: 'grapheme' });

  for (const { segment } of segmenter.segment(str)) {
    graphemes.push(segment);

    if (graphemes.length >= count) {
      break;
    }
  }

  return graphemes;
}

/**
 * @description 전달받은 정규 표현식을 건드리지 않고, 문자열 전체를 훑을 수 있는 사본을 만듭니다.
 *
 * 사본을 쓰는 이유는 호출자의 정규식을 오염시키지 않기 위해서입니다.
 *
 * `g` 플래그가 붙은 정규식은 `exec` 가 `lastIndex` 를 바꿔 놓기 때문에,
 * 원본을 그대로 쓰면 호출자가 다음에 그 정규식을 쓸 때 엉뚱한 위치부터 매치됩니다.
 *
 * 플래그는 두 가지를 손봅니다.
 * - `g` 가 없으면 붙입니다. `exec` 를 반복해 마지막 매치까지 가려면 필요합니다.
 * - `y` 가 있으면 뗍니다. 매치를 `lastIndex` 자리에 고정해 훑기를 막습니다.
 */
function toGlobalRegExp(separator: RegExp): RegExp {
  const flags = separator.flags.replace('y', '');

  return new RegExp(separator.source, separator.global ? flags : `${flags}g`);
}

/**
 * @description `index` 자리에서 구분자가 시작하는지 확인합니다.
 *
 * 자를 지점이 이미 구분자 경계라면 애초에 단어를 끊지 않았으므로, 뒤로 되돌리면 멀쩡한 단어를 잃습니다.
 * 그 경우를 걸러내기 위한 검사입니다.
 *
 * @example
 * // 'abc def' 다음 글자가 공백이라, 되돌리지 않아야 'def' 를 지킵니다
 * truncate('abc def ghi', { length: 10, separator: ' ' });
 * // 검사 있음: 'abc def...'  /  검사 없음: 'abc...'
 */
export function isSeparatorAt(
  str: string,
  index: number,
  separator: string | RegExp
): boolean {
  return typeof separator === 'string'
    ? str.startsWith(separator, index)
    : str.slice(index).search(separator) === 0;
}

/**
 * @description 문자열에서 구분자가 마지막으로 나타나는 위치를 찾습니다.
 *
 * 문자열 구분자를 정규식으로 만들지 않고 `lastIndexOf` 로 찾는 것이 중요합니다.
 * 정규식 소스에 끼워 넣으면 `'.'` `'|'` 같은 글자가 패턴으로 해석되고, `'('` `'+'`
 * 처럼 홀로 설 수 없는 글자는 `SyntaxError` 로 터집니다.
 *
 * @returns {number} 마지막 구분자가 시작하는 인덱스입니다. 구분자가 없으면 `-1` 입니다.
 */
export function lastSeparatorIndex(
  str: string,
  separator: string | RegExp
): number {
  if (typeof separator === 'string') {
    return str.lastIndexOf(separator);
  }

  const pattern = toGlobalRegExp(separator);
  let index = -1;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(str)) != null) {
    index = match.index;

    if (match[0].length === 0) {
      pattern.lastIndex += 1;
    }
  }

  return index;
}
