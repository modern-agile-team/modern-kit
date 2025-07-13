# capitalize

문자열의 첫 글자를 대문자로 변환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/capitalize/index.ts)

## Interface
```ts title="typescript"
function capitalize<T extends string>(str: T): Capitalize<T>
```

## Usage
```ts title="typescript"
import { capitalize } from '@modern-kit/utils';

capitalize('hello'); // 'Hello'
capitalize('123'); // '123'
```