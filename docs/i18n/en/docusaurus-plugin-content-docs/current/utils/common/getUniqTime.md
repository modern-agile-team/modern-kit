# getUniqTime

A function that returns `new Date().getTime()` by default, but returns a unique value when called multiple times at the same moment.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/getUniqTime/index.ts)

<br />

## Interface
```ts title="typescript"
const getUniqTime: () => number
```

<br />

## Usage
```ts title="typescript"
import { getUniqTime } from '@modern-kit/utils';

const uniqTime = getUniqTime();
```
