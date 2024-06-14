# uniq

`중복 요소를 제외한 배열`을 반환하는 함수입니다.

기본적으로 `원시 값`에 대해서만 중복 요소를 판단하며, 필요 시 2번째 인자인 `iteratee` 함수 결과로 중복 요소임을 판단 할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/uniq/index.ts)

## Interface
```ts title="typescript"
const uniq: <T, U = T>(
  arr: T[] | readonly T[],
  iteratee?: ((item: T) => U) | undefined
) => T[];
```

## Usage
### Default
```ts title="typescript"
import { uniq } from '@modern-kit/utils';

uniq([1, 2, 3]); // [1, 2, 3] 
uniq([1, 2, 2, 2, 3]); // [1, 2, 3]
```

### Iteratee
```ts title="typescript"
import { uniq } from '@modern-kit/utils';

const testArr = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
];

uniq(testArr, (item) => item.id === 1);
/*
  [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ];
*/

uniq([1, 2, 2.1, 2.2, 2.3, 3], (item) => Math.floor(item)); // [1, 2, 3]
```