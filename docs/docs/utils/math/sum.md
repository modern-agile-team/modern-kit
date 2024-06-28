# sum

배열 요소의 `합`을 반환합니다.

기본적으로 `숫자 배열`의 합을 반환하며, 그 외 타입의 배열은 두 번째 인자인 `iteratee` 함수 결과로 `합`을 판단할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/sum/index.ts)

## Interface
```ts title="typescript"
// 함수 오버로딩
function sum<T extends number>(arr: T[] | readonly T[]): T;
function sum<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): T;
```

## Usage
### Default
```ts title="typescript"
import { sum } from '@modern-kit/utils';

const arr = [1, 2, 3, 4, 5];
const result = sum(arr); // 15
```

### Iteratee
```ts title="typescript"
import { sum } from '@modern-kit/utils';

const arr = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];
const result = sum(arr, (item) => item.value); // 15
```
