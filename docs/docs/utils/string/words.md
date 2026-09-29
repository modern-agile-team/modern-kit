# words

문자열을 단어 배열로 나누는 함수입니다. 공백과 구두점을 구분자로 취급하며, `camelCase` 와 `PascalCase` 의 낱말 경계와 연속된 대문자(약어)도 인식합니다.

<br />

한글·한자·가나처럼 대소문자가 없는 글자는 소문자와 같은 자리에서 취급되므로, 뒤에 이어지는 소문자 알파벳과는 끊기지 않습니다. (`'번개장터bunjangApp'` → `['번개장터bunjang', 'App']`)

<br />

이모지는 앞뒤 글자와 끊어져 각각 하나의 단어가 되며, 국기·키캡·피부색·ZWJ 조합 이모지도 한 단어로 유지됩니다. 반대로 이모지가 아닌 기호(`₩`, `⇒` 등)는 단어를 끊지 않고 글자처럼 붙습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/words/index.ts)

<br />

## Interface
```ts title="typescript"
function words(str: string): string[];
```

<br />

## Remarks

:::caution 주의사항

- 유니코드 속성 이스케이프(`\p{...}`)를 사용하므로 Chrome 64 / Safari 11.1 미만 엔진에서는 동작하지 않습니다.
  - 정규 표현식은 `words` 를 처음 호출할 때 생성되므로, 모듈을 import 하는 것만으로는 예외가 발생하지 않습니다.
:::

<br />

## Usage

### 기본 사용법
```ts title="typescript"
import { words } from '@modern-kit/utils';

words('fred, barney, & pebbles'); // ['fred', 'barney', 'pebbles']
words('camelCaseHTTPRequest'); // ['camel', 'Case', 'HTTP', 'Request']
words('foo_bar-baz qux'); // ['foo', 'bar', 'baz', 'qux']
words('Lunedì 18 Set'); // ['Lunedì', '18', 'Set']
words("it's the 1st time"); // ["it's", 'the', '1st', 'time']
```

<br />

### 한글
```ts title="typescript"
words('상품12개'); // ['상품', '12', '개']
words('번개장터Bunjang'); // ['번개장터', 'Bunjang']
words('번개장터bunjangApp'); // ['번개장터bunjang', 'App']
```

<br />

### 기호와 이모지
```ts title="typescript"
// 이모지가 아닌 기호는 단어를 끊지 않습니다
words('정가₩1000'); // ['정가₩', '1000']

// 이모지는 앞뒤 글자와 끊어집니다
words('알람⏰설정'); // ['알람', '⏰', '설정']

// ZWJ 로 이어진 이모지는 한 단어로 유지됩니다
words('가족 👨‍👩‍👧'); // ['가족', '👨‍👩‍👧']
```

<br />

### ASCII 가 아닌 숫자
```ts title="typescript"
// ASCII 가 아닌 숫자는 글자로 취급합니다
words('상품 １２ 개'); // ['상품', '１２', '개']
```
