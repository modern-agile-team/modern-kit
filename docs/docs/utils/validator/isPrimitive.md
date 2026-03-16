# isPrimitive

주어진 인자가 `원시값`인지 검사하고, 맞다면 인자의 타입을 `Primitive`로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isPrimitive/index.ts)

## Interface
```ts title="typescript"
type Primitive =
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined;

const isPrimitive: (value: unknown) => value is Primitive
```

<br />

## Usage
```ts title="typescript"
import { isPrimitive } from '@modern-kit/utils';

isPrimitive(123); // true
isPrimitive('123'); // true
isPrimitive(true); // true
isPrimitive(Symbol()); // true
isPrimitive(null); // true
isPrimitive(undefined); // true

isPrimitive({}); // false
isPrimitive([]); // false
isPrimitive(new Set()); // false
isPrimitive(new Map()); // false
```
