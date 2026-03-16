# isHangul

주어진 문자열이 `한글`으로만 구성되어 있는지 확인하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isHangul/index.ts)

## Interface
```ts title="typescript"
const isHangul: (value: string) => boolean
```

<br />

## Usage
```ts title="typescript"
import { isHangul } from '@modern-kit/utils';

isHangul('안녕하세요'); // true

isHangul('Hello'); // false
isHangul('123'); // false
isHangul('!@#'); // false
isHangul(''); // false
```
