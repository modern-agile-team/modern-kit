# groupBy

Groups an array based on a given criterion.

An `iteratee` function is provided to group items by the returned key. Each key is assigned as a property of the resulting object containing an array of grouped items.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/groupBy/index.ts)

<br />

## Benchmark

- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name               | hz           | mean   | Performance |
| ------------------ | ------------ | ------ | ----------- |
| modern-kit/groupBy | 6,982,132.03 | 0.0001 | `fastest`   |
| lodash/groupBy     | 4,223,901.69 | 0.0002 | `slowest`   |

- **modern-kit/groupBy**
  - `1.65x` faster than lodash/groupBy

<br />

## Interface

```ts title="typescript"
function groupBy<T, K extends PropertyKey>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => K
): Record<K, T[]>;
```

<br />

## Usage

```ts title="typescript"
import { groupBy } from '@modern-kit/utils';

const items = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'fruit', name: 'pear' },
  { category: 'vegetable', name: 'broccoli' },
];
const group = groupBy(items, (item) => item.category);
// {
//   fruit: [
//       { category: 'fruit', name: 'apple' },
//       { category: 'fruit', name: 'banana' },
//       { category: 'fruit', name: 'pear' },
//   ],
//   vegetable: [
//       { category: 'vegetable', name: 'carrot' },
//       { category: 'vegetable', name: 'broccoli' },
//   ],
// };
```

## References

- [Object.groupBy - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)
