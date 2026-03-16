# ObjectEntries

Can be used to clearly define the return type of the `Object.entries` function.

Returns as a tuple in the form of `[key, value]`, and keys of type `symbol` are excluded.

<br />

## Interface

```ts title="typescript"
type ObjectEntries<T extends Record<PropertyKey, any>> = [
  ObjectKeys<T>,
  T[ObjectKeys<T>]
][];
```

<br />

## Usage

### Type Extraction Case

```ts title="typescript"
import { ObjectEntries } from '@modern-kit/types';

type MyObject = { a: string; b: number };
type MyEntries = ObjectEntries<MyObject>; // ['a' | 'b', string | number][]
```

<br />

### Object.entries Type Assertion Case

```ts title="typescript"
import { ObjectEntries } from '@modern-kit/types';

const obj = { a: 1, b: 2, c: 3 } as const;
const entries = Object.entries(obj) as ObjectEntries<typeof obj>;
// ["a" | "b" | "c", 1 | 2 | 3][]
```
