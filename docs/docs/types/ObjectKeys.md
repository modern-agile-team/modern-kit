# ObjectKeys

`Object.keys` 함수의 반환 타입을 명확하게 정의하기 위해 사용할 수 있습니다. `symbol` 타입의 키는 제외됩니다.

<br />

## Interface

```ts title="typescript"
type ObjectKeys<T extends Record<PropertyKey, any>> = Exclude<
  keyof T,
  symbol
>;
```

<br />

## Usage

### 타입 추출 케이스

```ts title="typescript"
import { ObjectKeys } from '@modern-kit/types';

type MyObject = { a: string; b: number };
type MyKeys = ObjectKeys<MyObject>; // 'a' | 'b'
```

<br />

### Object.keys 타입 단언 케이스

```ts title="typescript"
import { ObjectKeys } from '@modern-kit/types';

const obj = { a: 1, b: 2, c: 3 } as const;
const keys = Object.keys(obj) as ObjectKeys<typeof obj>[]; // ('a' | 'b' | 'c')[]
```
