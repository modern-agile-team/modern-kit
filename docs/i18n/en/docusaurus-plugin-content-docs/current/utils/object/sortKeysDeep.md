# sortKeysDeep

Returns a new object with the keys of the given object and all nested plain objects sorted.

Plain objects inside arrays are sorted as well, while the order of array elements is preserved. Non-plain values such as `Date`, `Map`, `Set` and class instances are kept as-is, and the original object is not mutated.

The `comparator` is applied at every depth. If omitted, keys are sorted in the default `Array.prototype.sort` order (UTF-16 code units).

:::note
JS objects always list integer-like keys (`'1'`, `'10'`) first in ascending order, so integer keys come before string keys regardless of the `comparator`.
:::

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/sortKeysDeep/index.ts)

## Interface
```ts title="typescript"
function sortKeysDeep<T extends Record<PropertyKey, any>>(
  obj: T,
  comparator?: (a: string, b: string) => number
): T;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { sortKeysDeep } from '@modern-kit/utils';

sortKeysDeep({ b: { y: 1, x: 2 }, a: [{ d: 1, c: 2 }] });
// { a: [{ c: 2, d: 1 }], b: { x: 2, y: 1 } }
```

### Stable serialization
```ts title="typescript"
import { sortKeysDeep } from '@modern-kit/utils';

// Objects with different key orders produce the same cache key.
const a = { page: 1, filter: { status: 'ON', category: 5 } };
const b = { filter: { category: 5, status: 'ON' }, page: 1 };

JSON.stringify(sortKeysDeep(a)) === JSON.stringify(sortKeysDeep(b)); // true
```
