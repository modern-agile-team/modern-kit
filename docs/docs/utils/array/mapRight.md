# mapRight

주어진 배열의 각 요소에 대해 `오른쪽에서 왼쪽으로` 순회하며 제공된 `콜백 함수`를 호출하고, 결과를 새로운 배열로 반환하는 함수입니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/mapRight/index.ts)

<br />

## Interface

```ts title="typescript"
function mapRight<T, U>(
  arr: T[] | readonly T[],
  callback: (currentValue: T, index: number, arr: T[] | readonly T[]) => U,
): U[];
```

<br />

## Usage

```ts title="typescript"
import { mapRight } from '@modern-kit/utils';

mapRight([1, 2, 3], (item, index) => item + index);
// [5, 3, 1]
```
