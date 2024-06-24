# max

배열에서 `최댓값`을 찾습니다. 

기본적으로 `숫자 배열`에서 최솟값을 찾으며, 필요시 두 번째 인자인 `iteratee` 함수 결과로 `최댓값`을 판단할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/max/index.ts)

## Interface
```ts title="typescript"
// 함수 오버로딩
function max<T extends number>(arr: T[] | readonly T[]): T;
function max<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): T;
```

## Usage
### Default
```ts title="typescript"
import { max } from '@modern-kit/utils';

const arr1 = [5, 2, 9, 1, 5, 6];
const result1 = max(arr1); // 9
```

### Iteratee
```ts title="typescript"
import { max } from '@modern-kit/utils';

const arr2 = [
  { value: 5 },
  { value: 2 },
  { value: 9 },
  { value: 1 },
  { value: 5 },
  { value: 6 },
];
const result = max(arr, (item) => item.value); // { value: 9 }
```
