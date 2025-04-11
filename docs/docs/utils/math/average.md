# average

숫자 배열의 모든 요소를 합산하여 `평균`을 구하는 함수

`iteratee` 함수를 제공하는 경우 `iteratee` 함수의 반환값을 기준으로 평균을 구합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/average/index.ts)

## Interface
```ts title="typescript"
// 함수 오버로딩
function average(arr: number[] | readonly number[]): number;

function average<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): number;
```

## Usage
### Default
```ts title="typescript"
import { average } from '@modern-kit/utils';

const arr = [1, 2, 3, 4, 5];
const result = average(arr); // 3
```

### Iteratee
```ts title="typescript"
import { average } from '@modern-kit/utils';

const arr = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];
const result = average(arr, (item) => item.value); // 3
```
