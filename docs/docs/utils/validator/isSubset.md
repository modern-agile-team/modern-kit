# isSubset

두번째 인자로 주어지는 배열의 모든 요소를 첫번째 인자의 배열이 완전히 포함하는지(부분집합) 에 대한 여부 `boolean` 를 반환합니다.

배열 요소의 타입이 참조형인 경우, 깊은 비교를 진행하며, `iteratee` 함수 인자를 정의하여 비교항목을 설정하는 것이 가능합니다.

<br />



## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isSubset/index.ts)

## Interface
```ts title="typescript"
const isSubset = <T, U>(
  parentArray: readonly T[],
  childArray: readonly T[],
  iteratee?: (item: T) => U
) => boolean;
```

## Usage
```ts title="typescript"
import { isSubset } from '@modern-kit/utils';

const parentArray = [1, 2, 3, 4];
const childArray1 = [1, 3];
const childArray2 = [1, 5];

console.log(isSubset(parentArray, childArray1)); // true
console.log(isSubset(parentArray, childArray2)); // false
```

```ts title="typescript"
import { isSubset } from '@modern-kit/utils';

const parentArray = ['1', 2, 3, 4];
const childArray1 = ['1', 2, 3];
const childArray2 = [1, '2', 3];

console.log(isSubset(parentArray, childArray1)); // true
console.log(isSubset(parentArray, childArray2)); // false
```

```ts title="typescript"
// 깊이가 2 이상의 배열
import { isSubset } from '@modern-kit/utils';

const parentArray = [[0, 1, 2, 3, 4], [2, 3, 4, 5, 6]];
const childArray1 = [[0, 1, 2, 3, 4]];
const childArray2 = [[2, 3, 4, 5]];

console.log(isSubset(parentArray, childArray1)); // true
console.log(isSubset(parentArray, childArray2)); // false
```

```ts title="typescript
// 깊이가 2 이상의 오브젝트
import { isSubset } from '@modern-kit/utils';
type user = {
  name: string;
  age: number;
  bestFriend: {
    name: string;
    age: number;
  };
  friends: string[];
};

const parentArray: user[] = [
  {
    name: 'Peter',
    age: 13,
    bestFriend: {
      name: 'Aimee',
      age: 25,
    },
    friends: ['Charlie', 'Chuck', 'Catherine'],
  },
  {
    name: 'Aimee',
    age: 25,
    bestFriend: {
      name: 'Charlie',
      age: 19,
    },
    friends: ['Peter', 'Chuck', 'Catherine'],
  },
];

// parentArray[1] 과 동일 요소를 가짐.
const childArray1: user[] = [
  {
    name: 'Aimee',
    age: 25,
    bestFriend: {
      name: 'Charlie',
      age: 19,
    },
    friends: ['Peter', 'Chuck', 'Catherine'],
  },
];

// parentArray[0]의 friends의 마지막 요소가 다름.
const childArray2: user[] = [
  {
    name: 'Peter',
    age: 13,
    bestFriend: {
      name: 'Aimee',
      age: 25,
    },
    friends: ['Charlie', 'Chuck', 'bell'],
  },
];

console.log(isSubset(parentArray, childArray1)); // true
console.log(isSubset(parentArray, childArray2)); // false
console.log(
  isSubset(parentArray, childArray2, (obj: user) => {
    return {
      name: obj.name,
      bestFriend: obj.bestFriend,
    };
  })
); // true, parentArray[0]와 childArray2[0]는 friends 항목만 다르므로, iteratee 적용시 부분집합 관계가 성립할 수 있다.