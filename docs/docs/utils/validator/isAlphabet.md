# isAlphabet

주어진 문자열이 `알파벳`으로만 구성되어 있는지 확인하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isAlphabet/index.ts)

## Interface
```ts title="typescript"
const isAlphabet: (value: string) => boolean
```

## Usage
```ts title="typescript"
import { isAlphabet } from '@modern-kit/utils';

isAlphabet('abc'); // true

isAlphabet('안녕하세요'); // false
isAlphabet('123'); // false
isAlphabet('!@#'); // false
isAlphabet(''); // false
```