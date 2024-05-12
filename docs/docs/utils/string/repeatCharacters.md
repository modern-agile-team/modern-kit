# repeatCharacters

주어진 문자열의 각 문자를 주어진 반복 횟수만큼 반복해서 새로운 문자열을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/repeatCharacters/index.ts)

## Interface
```ts title="typescript"
const repeatCharacters: (value: string, repeatCount: number) => string
```

## Usage
```ts title="typescript"
import { repeatCharacters } from '@modern-kit/utils';

const str1 = 'A!B@C';
const repeatedStr1 = repeatCharacters(str1, 2); // 'AA!!BB@@CC'

const str2 = 'Hello';
const repeatedStr2 = repeatCharacters(str2, 3); // 'HHHeeelllooo'
```