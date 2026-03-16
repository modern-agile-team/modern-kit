# flatten

Flattens a nested array to the specified depth.

JavaScript's built-in **[Array.prototype.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)** has poor performance.

The provided `flatten` function outperforms both `JavaScript's Array.prototype.flat` and `lodash's flattenDepth`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flatten/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/flatten | 2,303,725.15 | 0.0004 | `fastest` |
| lodash/flattenDepth | 1,546,277.36 | 0.0006 | - |
| js built-in/flat | 346,378.13 | 0.0029 | `slowest` |

- **modern-kit/flatten**
  - `1.49x` faster than lodash/flattenDepth
  - `6.65x` faster than js built-in/flat

<br />

## Interface

```ts title="typescript"
type FlatArray<Arr, Depth extends number> = {
    "done": Arr,
    "recur": Arr extends ReadonlyArray<infer InnerArr>
        ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
        : Arr
}[Depth extends -1 ? "done" : "recur"];
```

```ts title="typescript"
function flatten<T, D extends number = 1>(
  arr: T[] | readonly T[],
  depth?: D // default: 1
): FlatArray<T[], D>[];
```

<br />

## Usage

```ts title="typescript"
import { flatten } from '@modern-kit/utils';

const arr = [1, [2, [3, [4, [5]]]]];

flatten(arr); // [1, 2, [3, [4, [5]]]]
flatten(arr, 1); // [1, 2, [3, [4, [5]]]]
flatten(arr, 2); // [1, 2, 3, [4, [5]]]
flatten(arr, 3); // [1, 2, 3, 4, [5]]
flatten(arr, 4); // [1, 2, 3, 4, 5]
```
