# isArray

주어진 인자가 `배열`인지 검사하고, 맞다면 인자의 타입을 `Array`로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isArray/index.ts)

## Interface
```ts title="typescript"
const isArray: <T>(value: unknown) => value is T[] | readonly T[]
```

<br />

## Usage
```ts title="typescript"
import { isArray } from '@modern-kit/utils';

isArray([]); // true
isArray(() => {}); // false
isArray('123'); // false
isArray(123); // false
isArray({}); // false
```
