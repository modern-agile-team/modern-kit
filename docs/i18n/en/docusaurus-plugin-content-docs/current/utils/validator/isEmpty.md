# isEmpty

Checks whether the given value is empty.

The following are considered empty:
- `null`, `undefined`
- An empty string `''`
- An array with a length of 0
- A `Map` or `Set` with a `size` of 0
- A plain object with no own enumerable string keys (an object whose prototype is `Object.prototype` or `null`)

All other values (numbers, booleans, functions, `Date`, class instances, etc.) are considered non-empty and return `false`.

:::info
Unlike lodash, `0`, `false`, etc. are not treated as empty values.
:::

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isEmpty/index.ts)

<br />

## Interface

```ts title="typescript"
function isEmpty(value: unknown): boolean;
```

<br />

## Usage

```ts title="typescript"
import { isEmpty } from '@modern-kit/utils';

isEmpty(null); // true
isEmpty(''); // true
isEmpty([]); // true
isEmpty({}); // true
isEmpty(new Map()); // true

isEmpty(' '); // false
isEmpty([0]); // false
isEmpty({ a: undefined }); // false
isEmpty(0); // false
isEmpty(false); // false
```
