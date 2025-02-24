# trimEnd

문자열에서 `후행 공백` 또는 `지정된 문자`를 뒤에서 제거한 문자열을 반환하는 함수입니다.

chars 매개변수가 주어지지 않으면 모든 공백 문자를 제거합니다. (String.prototype.trimEnd와 동일하게 동작합니다.)

chars 매개변수가 주어지면 해당 문자 목록에 포함된 문자를 문자열 뒷부분에서 제거합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/trimEnd/index.ts)

## Interface
```ts title="typescript"
const trimEnd: (str: string, chars?: string | string[]) => string
```

## Usage
```ts title="typescript"
import { trimEnd } from '@modern-kit/utils';

const str1 = trimEnd('  abc  '); // '  abc'
const str2 = trimEnd('  abc--', '-'); // '  abc'
const str3 = trimEnd('-_-abc-_-', ['-', '_', '-']); // '-_-abc'
const str4 = trimEnd('--abc  ', '+'); // '--abc  ' 
```