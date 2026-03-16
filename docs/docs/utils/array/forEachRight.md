# forEachRight

주어진 배열의 각 요소에 대해 `오른쪽에서 왼쪽으로` 순회하며 제공된 `콜백 함수`를 호출합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/forEachRight/index.ts)

<br />

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/forEachRight | 10,607,063.51 | 0.3479 | `fastest` |
| lodash/forEachRight | 5,715,281.60 | 3.4568 | `slowest` |

- **modern-kit/forEachRight**
  - `1.86x` faster than lodash/forEachRight

<br />

## Interface

```ts title="typescript"
function forEachRight<T>(
  arr: T[] | readonly T[],
  callback: (currentValue: T, index: number, arr: T[] | readonly T[]) => void
): void;
```

<br />

## Usage

```ts title="typescript"
import { forEachRight } from '@modern-kit/utils';

const items = ['apple', 'banana', 'cherry'];

forEachRight(items, (item, index, arr) => {
  console.log(`Index ${index}: ${item}`);
});
/*
  Index 2: cherry
  Index 1: banana
  Index 0: apple
*/
```
