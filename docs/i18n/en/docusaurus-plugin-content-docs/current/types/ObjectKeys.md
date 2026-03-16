# ObjectKeys

Can be used to clearly define the return type of the `Object.keys` function. Keys of type `symbol` are excluded.

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

### Type Extraction Case

```ts title="typescript"
import { ObjectKeys } from '@modern-kit/types';

type MyObject = { a: string; b: number };
type MyKeys = ObjectKeys<MyObject>; // 'a' | 'b'
```

<br />

### Object.keys Type Assertion Case

```ts title="typescript"
import { ObjectKeys } from '@modern-kit/types';

const obj = { a: 1, b: 2, c: 3 } as const;
const keys = Object.keys(obj) as ObjectKeys<typeof obj>[]; // ('a' | 'b' | 'c')[]
```
