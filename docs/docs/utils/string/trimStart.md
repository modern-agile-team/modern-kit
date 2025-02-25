# trimStart

문자열에서 `선행 공백` 또는 `지정된 문자`를 앞에서 제거한 문자열을 반환하는 함수입니다.

chars 매개변수가 주어지지 않으면 모든 선행 공백을 제거합니다. (String.prototype.trimStart와 동일하게 동작합니다.)

chars 매개변수가 주어지면 해당 문자 또는 문자들의 조합을 문자열 시작 부분에서 찾아 제거합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/trimStart/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/trimStart|5,821,607.44|0.0001|`fastest`|
|lodash/trimStart|765,539.13|0.0012|`slowest`|

- **modern-kit/trimStart**
  - `7.60x` faster than lodash/trimStart

## Interface
```ts title="typescript"
const trimStart: (str: string, chars?: string | string[]) => string
```

## Usage
```ts title="typescript"
import { trimStart } from '@modern-kit/utils';

// 기본 케이스
const str1 = trimStart('  abc'); // 'abc', 선행 공백 모두 제거
const str2 = trimStart('--abc', '-'); // 'abc', '-'를 모두 제거
const str3 = trimStart('+-*abc', '+-*'); // 'abc', 문자열의 각 문자인 '+', '-', '*'를 모두 제거

// 매칭되는 문자가 없는 경우 케이스
const str4 = trimStart('--abc', '+'); // '--abc', '+'가 문자열에 없으므로 원본 문자열을 그대로 반환

// 배열 케이스
const str5 = trimStart('-_-abc-_-', ['_', '-']); // 'abc', 선행에서 배열 요소인 '-'와 '_'를 모두 제거
const str6 = trimStart('+-*abc-_-', ['+*', '-']); // 'abc', 각 문자열 요소는 개별 문자로 나누고('+', '*', '-') 제거
```
