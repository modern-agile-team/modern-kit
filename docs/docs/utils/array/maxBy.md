# maxBy

배열의 각 요소에 `iteratee` 함수를 적용했을 때 최대값을 가지는 요소를 찾습니다.

- 최대값이 여러 개일 경우 첫 번째 요소를 반환합니다.
- 배열이 비어있다면 `undefined`를 반환합니다.
- `iteratee`의 결과가 `NaN`인 요소가 있으면 해당 요소를 즉시 반환합니다. (built-in `Math.max`과 동일)
- 비어 있지 않은 튜플 타입(`readonly [T, ...T[]]`)을 전달하면 반환 타입이 `T`로 추론됩니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/maxBy/index.ts)

<br />

## Interface

```ts title="typescript"
function maxBy<T>(
  items: readonly [T, ...T[]],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T;

function maxBy<T>(
  items: readonly T[],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T | undefined;
```

<br />

## Usage

```ts title="typescript"
import { maxBy } from '@modern-kit/utils';

maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], (x) => x.a); // { a: 3 }
maxBy([], (x) => x.a); // undefined
maxBy([3, NaN, 1], (x) => x); // NaN

maxBy(
  [
    { name: 'john', age: 30 },
    { name: 'jane', age: 28 },
    { name: 'joe', age: 26 },
  ],
  (x) => x.age
); // { name: 'john', age: 30 }
```
