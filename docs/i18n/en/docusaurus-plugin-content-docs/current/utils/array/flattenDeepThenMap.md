# flattenDeepThenMap

Flattens all depths of a nested array and then maps each element using the provided iteratee function.

Behaves the same as `arr.flat(Infinity).map(iteratee)` while improving `type issues`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flattenDeepThenMap/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/flattenDeepThenMap | 1,587,624.53 | 0.0004 | `fastest` |
| lodash/flattenDeep.map | 1,222,383.95 | 0.0006 | - |
| js built-in/flat(Infinity).map | 330,750.78 | 0.0029 | `slowest` |

- **modern-kit/flattenDeepThenMap**
  - `1.30x` faster than lodash/flattenDeep.map
  - `4.80x` faster than js built-in/flat(Infinity).map

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
function flattenDeepThenMap<T, U>(
  arr: T[] | readonly T[],
  iteratee: (item: ExtractNestedArrayType<T>) => U
): U[];
```

<br />

## Usage

```ts title="typescript"
import { flattenDeepThenMap } from '@modern-kit/utils';

const arr = [1, 2, [3, 4, [5, 6]]];
flattenDeepThenMap(arr, (item) => ({ id: item }));
// [{ id: 1}, { id: 2}, { id: 3}, { id: 4}, { id: 5}, { id: 6}];
```
