# deepCopy

인자로 주어진 값을 `깊은 복사`를 수행하는 함수입니다.

<br />

## Interface
```tsx
const deepCopy: <T>(source: T) => T
```

## Usage
```ts
import { deepCopy } from '@modern-kit/utils';

const originNum = 42;
const copyNum = deepCopy(originNum);

const originObj = { a: 1, b: { c: 2 } };
const copyObj = deepCopy(originObj);

const originArray = [1, 2, [3, 4]];
const copyArray = deepCopy(originArray);

const originSet = new Set([1, 2, 3]);
const copySet = deepCopy(originSet);

const originMap = new Map([
  ['a', 1],
  ['b', 2],
]);
const copyMap = deepCopy(originMap);
```