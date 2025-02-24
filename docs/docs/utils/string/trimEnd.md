# trimEnd

문자열에서 `후행 공백` 또는 `지정된 문자`를 뒤에서 제거한 문자열을 반환하는 함수입니다.

chars 매개변수가 주어지지 않으면 모든 후행 공백을 제거합니다. (String.prototype.trimEnd와 동일하게 동작합니다.)

chars 매개변수가 주어지면 해당 문자 목록에 포함된 문자를 문자열 뒷부분에서 제거합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/trimEnd/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/trimEnd|5,487,666.27|0.0002|`fastest`|
|lodash/trimEnd|1,131,381.14|0.0009|`slowest`|

- **modern-kit/trimEnd**
  - `4.85x` faster than lodash/trimEnd

## Interface
```ts title="typescript"
const trimEnd: (str: string, chars?: string | string[]) => string
```

## Usage
```ts title="typescript"
import { trimEnd } from '@modern-kit/utils';

// 기본 케이스
const str1 = trimEnd('abc  '); // 'abc', 후행 공백 모두 제거
const str2 = trimEnd('abc--', '-'); // 'abc', '-'를 모두 제거
const str3 = trimEnd('abc+-*', '+-*'); // 'abc', 문자열의 각 문자인 '+', '-', '*'를 모두 제거

// 매칭되는 문자가 없는 경우 케이스
const str4 = trimEnd('--abc  ', '+'); // '--abc  ', '+'가 문자열에 없으므로 원본 문자열을 그대로 반환

// 배열 케이스
const str5 = trimEnd('-_-abc-_-', ['_', '-']); // '-_-abc', 후행에서 배열 요소인 '-'와 '_'를 모두 제거
```
