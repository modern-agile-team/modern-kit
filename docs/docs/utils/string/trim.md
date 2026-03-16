# trim

문자열의 시작과 끝에서 `공백` 또는 `지정된 문자`를 제거합니다.

chars 매개변수가 주어지지 않으면 모든 선행과 후행 공백을 제거합니다. (`String.prototype.trim`과 동일하게 동작합니다.)

chars가 문자열인 경우 해당 문자열을 각 문자로 나누고 문자열 시작과 끝 부분에서 이를 찾아 제거합니다.
- ex: `'+-*' -> ['+', '-', '*']`

chars가 배열인 경우 배열 내 문자열을 각 문자로 나누고 문자열 시작과 끝 부분에서 이를 찾아 제거합니다.
- ex: `['+*', '-'] -> ['+', '*', '-']`

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/trim/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/trim | 2,818,939.18 | 0.0011 | `fastest` |
| lodash/trim | 705,372.87 | 0.0012 | `slowest` |

- **modern-kit/trim**
  - `4.00x` faster than lodash/trim

<br />

## Interface
```ts title="typescript"
function trim(str: string): string;

function trim(str: string, chars: string | string[]): string;
```

<br />

## Usage
```ts title="typescript"
import { trim } from '@modern-kit/utils';

// chars가 주어지지 않은 경우
const str1 = trim('  abc  '); // 'abc'

// chars가 문자열인 경우
const str2 = trim('--abc--', '-'); // 'abc'
const str3 = trim('+-*abc', '+-*'); // 'abc'

// 매칭되는 문자가 없는 경우 케이스
const str4 = trim('--abc--', '+'); // '--abc--'

// chars가 배열인 경우
const str5 = trim('-_-abc-_-', ['_', '-']); // 'abc'
const str6 = trim('+-*abc+-*', ['+*', '-']); // 'abc'
```
