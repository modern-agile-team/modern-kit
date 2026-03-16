# cloneDeep

A function that performs a `deep copy` of the given value.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/cloneDeep/index.ts)

<br />

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| ---- | ------------ | ------ | --------- |
| modern-kit/cloneDeep | 1,529,157.20 | 0.0007 | `fastest` |
| lodash/cloneDeep     | 650,320.39   | 0.0015 | - |

- **modern-kit/cloneDeep**
  - `2.35x` faster than lodash/cloneDeep

<br />

## Interface
```ts title="typescript"
function cloneDeep<T>(value: T): T;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { cloneDeep } from '@modern-kit/utils';

const originNum = 42;
const copyNum = cloneDeep(originNum);

const originObj = { a: 1, b: { c: 2 } };
const copyObj = cloneDeep(originObj);

const originArray = [1, 2, [3, 4]];
const copyArray = cloneDeep(originArray);

const originSet = new Set([1, 2, 3]);
const copySet = cloneDeep(originSet);

const originMap = new Map([
  ['a', 1],
  ['b', 2],
]);
const copyMap = cloneDeep(originMap);
```
