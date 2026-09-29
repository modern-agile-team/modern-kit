# keyBy

배열의 각 요소를 주어진 키 생성 함수에 따라 매핑합니다.

`iteratee` 함수가 생성한 키를 객체의 키로 하고, 해당 요소를 값으로 하는 객체를 반환합니다. 동일한 키를 생성하는 요소가 여러 개 있을 경우, 마지막 요소가 값으로 설정됩니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/keyBy/index.ts)

<br />

## Interface

```ts title="typescript"
function keyBy<T, K extends PropertyKey>(
  arr: T[] | readonly T[],
  iteratee: (item: T, index: number, array: T[] | readonly T[]) => K
): Record<K, T>;
```

<br />

## Usage

```ts title="typescript"
import { keyBy } from '@modern-kit/utils';

const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];

keyBy(array, (item) => item.category);
// {
//   fruit: { category: 'fruit', name: 'banana' },
//   vegetable: { category: 'vegetable', name: 'carrot' }
// }

// 인덱스 파라미터 사용
keyBy(['a', 'b', 'c'], (_, index) => index);
// { 0: 'a', 1: 'b', 2: 'c' }
```
