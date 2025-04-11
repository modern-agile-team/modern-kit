# max

배열에서 `최대값`을 반환하는 함수

`iteratee` 함수를 제공하는 경우 `iteratee` 함수를 기반으로 배열의 각 요소를 변환한 후 최대값을 가진 항목을 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/max/index.ts)

## Interface
```ts title="typescript"
// 함수 오버로딩
function max(arr: number[] | readonly number[]): number;

function max<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): T;
```

## Usage
### Default
```ts title="typescript"
import { max } from '@modern-kit/utils';

const arr = [5, 2, 9, 1, 5, 6];
const result = max(arr); // 9
```

### Iteratee
```ts title="typescript"
import { max } from '@modern-kit/utils';

const arr = [
  { value: 5 },
  { value: 2 },
  { value: 9 },
  { value: 1 },
  { value: 5 },
  { value: 6 },
];
const result = max(arr, (item) => item.value); // { value: 9 }
```
