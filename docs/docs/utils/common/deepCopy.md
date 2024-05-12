# deepCopy

인자로 주어진 값을 `깊은 복사`를 수행하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/deepCopy/index.ts)

## Interface
```ts title="typescript"
const deepCopy: <T>(source: T) => T
```

## Usage
```ts title="typescript"
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