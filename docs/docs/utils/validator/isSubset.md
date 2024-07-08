# isSubset

두 번째 인자로 주어지는 배열의 모든 요소를 첫 번째 인자의 배열이 완전히 포함하는지(부분집합) 여부를 `boolean`으로 반환합니다.

배열 요소의 타입이 참조형인 경우, iteratee 함수 인자를 정의하여 비교 항목을 설정하는 것이 가능합니다.

<br />



## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isSubset/index.ts)

## Interface
```ts title="typescript"
const isSubset = <T, U>(
  superset: T[] | readonly T[],
  subset: T[] | readonly T[],
  iteratee?: (item: T) => U
) => boolean;
```

## Usage
```ts title="typescript"
import { isSubset } from '@modern-kit/utils';

const superset = [1, 2, 3, 4];
const subset1 = [1, 3];
const subset2 = [1, 5];

isSubset(superset, subset1); // true
isSubset(superset, subset2); // false
```

```ts title="typescript"
import { isSubset } from '@modern-kit/utils';

const superset = ['1', 2, 3, 4];
const subset1 = ['1', 2, 3];
const subset2 = [1, '2', 3];

isSubset(superset, subset1); // true
isSubset(superset, subset2); // false
```

```ts title="typescript"
// 요소 타입이 배열인 경우
import { isSubset } from '@modern-kit/utils';

const superset = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]];
const subset1 = [[0, 1, 2, 3, 4]];
const subset2 = [[0, 1, 7, 4, 9]];

isSubset(superset, subset1); // false, 요소가 참조형(배열)이므로, 주소값이 달라 false를 반환한다.
isSubset(superset, subset2, (arr) => arr[2]); // true  ([2,7], [7])
isSubset(superset, subset2, (arr) => arr[3]); // false ([3,8], [4])
```

```ts title="typescript
// 깊이가 2 이상의 오브젝트
import { isSubset } from '@modern-kit/utils';
const superset = [
  {
    name: 'Peter',
    age: 13,
  },
  {
    name: 'Aimee',
    age: 25,
  },
];

const subset1 = [
  {
    name: 'Aimee',
    age: 25,
  },
];

const subset2 = [
  {
    name: 'Peter',
    age: 15,
  },
];

isSubset(superset, subset1); // false, 요소가 참조형(객체)이므로, 주소값이 달라 false를 반환한다
isSubset(superset, subset1, (obj) => JSON.stringify(obj)); // true
isSubset(superset, subset2, (obj) => JSON.stringify(obj)); // false
isSubset(superset, subset2, (obj) => obj.name); // true
