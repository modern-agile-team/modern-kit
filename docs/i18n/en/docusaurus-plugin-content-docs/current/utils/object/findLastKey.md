# findLastKey

Returns the last key in an object that satisfies the given condition.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/findLastKey/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/findLastKey | 19,157,255.73 | 0.0001 | `fastest` |
| lodash/findLastKey | 7,387,616.57 | 0.0001 | `slowest` |

- **modern-kit/findLastKey**
  - `2.59x` faster than lodash/findLastKey

<br />

## Interface
```ts title="typescript"
function findLastKey<T extends Record<PropertyKey, any>>(
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
import { findLastKey } from '@modern-kit/utils';

const obj = {
   bike: { active: true },
   car: { active: false },
   plane: { active: true },
};
findLastKey(obj, (item) => item.active); // 'plane'
```
