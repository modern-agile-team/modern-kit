# flatMapDeep

Applies an iteratee function to each element of the array and flattens the result to all depths.

Behaves the same as `arr.map.flat(Infinity)` but with better performance.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flatMapDeep/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/flatMapDeep | 251,685.91 | 0.0040 | `fastest` |
| lodash/flatMapDeep.map | 184,467.29 | 0.0054 | - |
| js built-in/map.flat | 57,011.35 | 0.0175 | `slowest` |

- **modern-kit/flatMapDeep**
  - `1.35x` faster than lodash/flatMapDeep.map
  - `4.41x` faster than js built-in/map.flat

<br />

## Interface

```ts title="typescript"
/**
 * @description A utility type that recursively unwraps nested array types to extract the innermost element type
 */
type ExtractNestedArrayType<T> = T extends readonly (infer U)[]
  ? ExtractNestedArrayType<U>
  : T;
```

```ts title="typescript"
function flatMapDeep<T, U>(
  arr: T[] | readonly T[],
  iteratee: (item: ExtractNestedArrayType<T>) => U
): U[];
```

<br />

## Usage

```ts title="typescript"
import { flatMapDeep } from '@modern-kit/utils';

const arr = [1, 2, [3, 4, [5, 6]]];
flatMapDeep(arr, (item) => ({ id: item }));
// [{ id: 1}, { id: 2}, { id: 3}, { id: 4}, { id: 5}, { id: 6}];
```
