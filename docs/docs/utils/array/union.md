# union

두 배열을 결합 후, `중복 요소를 제외해 고유한 값만을 갖는` 새로운 배열을 반환하는 함수입니다.

기본적으로 `원시 값`에 대해서만 중복 요소를 판단하며, 필요 시 3번째 인자인 `iteratee` 함수 결과로 중복 요소임을 판단 할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/union/index.ts)

## Interface
```ts title="typescript"
const union: <T, U = T>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[],
  iteratee?: ((item: T) => U) | undefined
) => T[];
```

## Usage
### Default
```ts title="typescript"
import { union } from '@modern-kit/utils';

union([1, 2, 3, 4], [1, 2, 3, 5]); // [1, 2, 3, 4, 5] 
```

### Iteratee
```ts title="typescript"
import { union } from '@modern-kit/utils';

const arr1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const arr2 = [
  { id: 1, name: 'john' },
  { id: 3, name: 'gromit' },
];

union(arr1, arr2, (item) => item.id);
/*
  [
    { id: 1, name: 'john' },
    { id: 2, name: 'jane' },
    { id: 3, name: 'gromit' }
  ]
*/
```