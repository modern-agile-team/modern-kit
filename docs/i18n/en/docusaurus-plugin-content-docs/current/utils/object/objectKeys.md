# objectKeys

Works the same as `Object.keys()` but preserves the `key` type.
Note that `symbol` properties are excluded since they are not enumerable.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/objectKeys/index.ts)

<br />

## Interface
```ts title="typescript"
type ObjectKeys<T extends Record<PropertyKey, any>> = Exclude<
  keyof T,
  symbol
>;

function objectKeys<T extends Record<PropertyKey, any>>(
  obj: T
): ObjectKeys<T>[];
```

<br />

## Usage
```ts title="typescript"
import { objectKeys } from '@modern-kit/utils';

const symbol = Symbol('d');
const obj = {
  a: 1,
  b: 2,
  c: 3,
  [symbol]: 4,
} as const;

 /**
  * type: ("a" | "b" | "c")[]
  * value: ["a", "b", "c"]
  */
const keys = objectKeys(obj);
```

## Note
- [Object.keys() - MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
