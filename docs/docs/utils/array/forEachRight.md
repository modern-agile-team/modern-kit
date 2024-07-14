# forEachRight 

배열의 요소를 오른쪽에서 왼쪽으로 순회하면서 각 요소에 대해 주어진 콜백 함수를 실행하는 함수입니다.

<br />

## Code 

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/forEachRight/index.ts)

## Interface 

```ts title="typescript"
const forEachRight: <T>(
  array: T[] | readonly T[],
  callback: (currentValue: T, index: number, array: T[] | readonly T[]) => void
) => void;
```

## Usage

```ts title="typescript"
import { forEachRight } from '@modern-kit/utils';

const items = ['apple', 'banana', 'cherry'];

forEachRight(items, (item, index, array) => {
  console.log(`Index ${array.length - index - 1}: ${item}`);
});
/*
  Index 2: cherry
  Index 1: banana
  Index 0: apple
*/
```