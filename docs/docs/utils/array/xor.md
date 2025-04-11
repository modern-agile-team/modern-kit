# xor

`두 배열 간의 대칭 차집합(XOR)`을 계산하는 함수입니다.

결과는 두 배열 중 하나에만 존재하는 요소들로 구성됩니다. 기본적으로 `원시 값`에 대해 비교를 수행하며, 필요 시 3번째 인자인 `iteratee` 함수 결과로 비교를 수행할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/xor/index.ts)

## Interface
```ts title="typescript"
// 함수 오버로딩
function xor<T>(arr1: T[] | readonly T[], arr2: T[] | readonly T[]): T[];

function xor<T, U>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[],
  iteratee: (item: T) => U
): T[];
```

## Usage
### Default
```ts title="typescript"
import { xor } from '@modern-kit/utils';

xor([1, 2], [2, 3]); // [1, 3]
```

### Iteratee
```ts title="typescript"
import { xor } from '@modern-kit/utils';

xor([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x) => x.id); // [{ id: 1 },  id: 3 }]
```

