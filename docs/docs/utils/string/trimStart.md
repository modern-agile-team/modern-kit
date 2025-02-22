# trimStart

문자열에서 `선행 공백` 또는 `지정된 문자`를 앞에서 제거한 문자열을 반환하는 함수입니다.

chars 매개변수가 주어지지 않으면 모든 공백 문자를 제거합니다.

chars 매개변수가 주어지면 해당 문자 또는 문자들의 조합을 문자열 시작 부분에서 찾아 제거합니다.
<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/trimStart/index.ts)

## Interface
```ts title="typescript"
const trimStart: (str: string, chars?: string | string[]) => string
```

## Usage
```ts title="typescript"
import { trimStart } from '@modern-kit/utils';

const str1 = trimStart('  abc  '); // 'abc  '
const str2 = trimStart('--abc  ', '-'); // 'abc  '
const str3 = trimStart('--abc  ', '+'); // '--abc  '
const str4 = trimStart('-_-abc-_-', ['-', '_', '-']); // 'abc-_-'
```