# invert

Creates a new object by inverting each key and value of the given object.

By default, it inverts the keys and values of the object. If an `iteratee` function is provided, it generates a transformed key for each value to invert.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/invert/index.ts)

## Benchmark

- `hz`: operations per second
- `mean`: average response time (ms)

### Default

| Name              | hz           | mean   | Performance |
| ----------------- | ------------ | ------ | ----------- |
| modern-kit/invert | 6,119,008.75 | 0.0002 | `fastest`   |
| lodash/invert     | 4,459,920.52 | 0.0003 | `slowest`   |

- **modern-kit/invert**
  - `1.37x` faster than **lodash/invert**

<br />

### with iteratee

| Name              | hz           | mean   | Performance |
| ----------------- | ------------ | ------ | ----------- |
| modern-kit/invert | 4,154,655.71 | 0.0003 | `fastest`   |
| lodash/invertBy   | 2,262,596.79 | 0.0004 | `slowest`   |

- **modern-kit/invert**
  - `1.84x` faster than **lodash/invertBy**

<br />

## Interface

```ts title="typescript"
function invert<K extends PropertyKey, V extends PropertyKey>(
  obj: Record<K, V>
): Record<V, K>;

function invert<K extends PropertyKey, V, TK extends PropertyKey>(
  obj: Record<K, V>,
  iteratee: (iterateData: { value: V; key: K; obj: Record<K, V> }) => TK
): Record<TK, K>;
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { invert } from '@modern-kit/utils';

const obj = { a: 1, b: 2, c: 3 };

invert(obj);
// value: { 1: 'a', 2: 'b', 3: 'c' };
// type: Record<number, "a" | "b" | "c">
```

<br />

### `Iteratee` Usage

```ts title="typescript"
import { invert } from '@modern-kit/utils';

const obj = {
  a: { name: 'foo' },
  b: { name: 'bar' },
} as const;

invert(obj, (value) => value.name);
// value: { foo: 'a', bar: 'b' }
// type: Record<"foo" | "bar", "a" | "b">
```
