# findKey

Returns the first key in an object that satisfies the given condition.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/findKey/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/findKey | 18,629,221.40 | 0.0001 | `fastest` |
| lodash/findKey | 6,807,578.65 | 0.0001 | `slowest` |

- **modern-kit/findKey**
  - `2.74x` faster than lodash/findKey

<br />

## Interface
```ts title="typescript"
function findKey<T extends Record<PropertyKey, any>>(
  obj: T,
  predicate: (predicateData: {
    value: T[keyof T];
    key: keyof T;
    obj: T;
  }) => boolean
): string | undefined;
```

<br />

## Usage
```ts title="typescript"
import { findKey } from '@modern-kit/utils';

const obj = {
   bike: { active: true },
   plane: { active: true },
   car: { active: false },
};

findKey(obj, (item) => item.active); // 'bike'
```
