# partition

첫 번째 인자의 `배열`을 기준으로 2번째 인자인 `predicate` 함수가 `true를 반환하는 요소들의 모음`과 `false를 반환하는 요소들의 모음` 두 그룹으로 나눈 배열을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/partition/index.ts)

<br />

## Interface

```ts title="typescript"
const partition: <T>(
  arr: T[] | readonly T[],
  predicate: (item: T) => boolean
) => [truthyArray: T[], falsyArray: T[]];
```

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { partition } from '@modern-kit/utils';

const numberList = [1, 2, 3, 4, 5];
const [evens, odds] = partition(numberList, (num) => num % 2 === 0);

/*
  evens: [2, 4]
  odds: [1, 3, 5]
*/
```

<br />

### 객체 배열 분류

```ts title="typescript"
import { partition } from '@modern-kit/utils';

const users = [
  { user: 'barney', age: 36, active: false },
  { user: 'fred', age: 40, active: true },
  { user: 'pebbles', age: 1,  active: false }
];

const [activeUsers, inActiveUsers] = partition(
  users,
  (item) => item.active
);

/*
  activeUsers: [{ user: 'fred', age: 40, active: true }]
  inActiveUsers: [
    { user: 'barney', age: 36, active: false },
    { user: 'pebbles', age: 1, active: false },
  ]
*/
```
