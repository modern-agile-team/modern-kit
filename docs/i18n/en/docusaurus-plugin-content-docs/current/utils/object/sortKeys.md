# sortKeys

Returns a new object with the keys of the given object sorted.

Only the object's own enumerable string keys are sorted, and the original object is not mutated. Only top-level keys are sorted; use `sortKeysDeep` to sort nested objects as well.

If `comparator` is omitted, keys are sorted in the default `Array.prototype.sort` order (UTF-16 code units).

:::note
JS objects always list integer-like keys (`'1'`, `'10'`) first in ascending order, so integer keys come before string keys regardless of the `comparator`.
:::

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/sortKeys/index.ts)

<br />

## Interface

```ts title="typescript"
function sortKeys<T extends Record<PropertyKey, any>>(
  obj: T,
  comparator?: (a: string, b: string) => number
): T;
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { sortKeys } from '@modern-kit/utils';

sortKeys({ c: 3, a: 1, b: 2 });
// { a: 1, b: 2, c: 3 }
```

<br />

### Using comparator

```ts title="typescript"
import { sortKeys } from '@modern-kit/utils';

sortKeys({ a: 1, b: 2 }, (a, b) => b.localeCompare(a));
// { b: 2, a: 1 }
```
