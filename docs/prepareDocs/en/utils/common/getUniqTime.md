# getUniqTime

A function that returns the value `new Date().getTime()` by default, but returns a unique value if called multiple times at the same time.


<br />

## Interface
```tsx
const getUniqTime: () => number
```

## Usage
```ts
import { getUniqTime } from '@devgrace/utils';

const uniqTime = getUniqTime();
```