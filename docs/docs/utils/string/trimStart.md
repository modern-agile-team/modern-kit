# trimStart

문자열에서 `선행 공백` 또는 `지정된 문자`를 앞에서 제거한 문자열을 반환하는 함수입니다.

chars 매개변수가 주어지지 않으면 모든 선행 공백을 제거합니다. (`String.prototype.trimStart`와 동일하게 동작합니다.)

chars가 문자열인 경우 해당 문자열을 각 문자로 나누고 문자열 시작 부분에서 이를 찾아 제거합니다.
- ex: `'+-*' -> ['+', '-', '*']`

chars가 배열인 경우 배열 내 문자열을 각 문자로 나누고 문자열 시작 부분에서 이를 찾아 제거합니다.
- ex: `['+*', '-'] -> ['+', '*', '-']`

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/trimStart/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/trimStart | 5,821,607.44 | 0.0001 | `fastest` |
| lodash/trimStart | 765,539.13 | 0.0012 | `slowest` |

- **modern-kit/trimStart**
  - `7.60x` faster than lodash/trimStart

<br />

## Interface
```ts title="typescript"
function trimStart(str: string): string;

function trimStart(str: string, chars: string | string[]): string;
```

<br />

## Usage
```ts title="typescript"
import { trimStart } from '@modern-kit/utils';

// chars가 주어지지 않은 경우
const str1 = trimStart('  abc'); // 'abc'

// chars가 문자열인 경우
const str2 = trimStart('--abc', '-'); // 'abc'
const str3 = trimStart('+-*abc', '+-*'); // 'abc'

// 매칭되는 문자가 없는 경우 케이스
const str4 = trimStart('--abc', '+'); // '--abc'

// chars가 배열인 경우
const str5 = trimStart('-_-abc', ['_', '-']); // 'abc'
const str6 = trimStart('+-*abc', ['+*', '-']); // 'abc'
```
