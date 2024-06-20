# intersectionWithDuplicates

`두 배열 내에서 동일하게 존재하는, 교차된 값에 대한` 새로운 배열을 반환하는 함수입니다.

기본적으로 `원시 값`에 대해서만 중복 요소를 판단하며, 필요 시 3번째 인자인 `comparator` 함수 결과로 교차되는 요소임을 판단할 수 있습니다.

`comparator`의 기본값은 `Object.is` 입니다.

위 함수는 첫번째 배열을 기준으로 동일 요소에 대해서 제거하지 않습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/intersectionWithDuplicates/index.ts)

## intersectionWithDuplicates
```ts title="typescript"
const intersectionWithDuplicate: <T, U = T>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee?: ((item: T) => T | U) | undefined
) => T[];
```

## Usage
### Default
```ts title="typescript"
import { intersectionWithDuplicates } from '@modern-kit/utils';

intersectionWithDuplicates([1, 2, 3, 5, 7], [1, 2, 4, 5, 8]); // [1, 2, 5] 
intersectionWithDuplicates([1, 1, 2, 2, 3, 5, 7], [1, 2, 4, 5, 8]); // [1, 1, 2, 2, 5] 
```

### Iteratee
```ts title="typescript"
import { intersectionWithDuplicates } from '@modern-kit/utils';

const testArr1 = [
  { id: 1, name: 'john' },
  { id: 1, name: 'john' },
  { id: 2, name: 'gromit' },
];

const testArr2 = [
  { id: 1, name: 'john' },
  { id: 1, name: 'john' },
  { id: 3, name: 'dylan' },
];

intersectionWithDuplicates(testArr1, testArr2, (item) => item.id);
/*
  [
    { id: 1, name: 'John' }, 
    { id: 1, name: 'john' },
  ];
*/
```