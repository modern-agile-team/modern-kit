# contains

첫 번째 인자로 넘긴 배열에 특정 요소가 포함되어 있는지 판단하는 유틸 함수입니다.

includes는 `as const`를 활용했을 때, 타입이 호환되지 않은 요소가 포함되어 있는지 확인할 때 타입 에러가 발생하는 문제점을 `some` 메서드를 활용해 개선한 함수입니다.

```ts title="typescript"
const test = (value: number) => {
  const arr = [1, 2, 3, 4] as const;
  arr.includes(value); // 'number' 형식의 인수는 '1 | 2 | 3 | 4' 형식의 매개 변수에 할당될 수 없습니다.
};
```

`some` 메서드를 통해 요소가 포함되어 있는지 판단할 때 기본적으로 `Object.is` 메서드를 활용합니다. 단, 필요 시에 3번째 인자로 `comparator` 함수를 활용할 수 있습니다.

[Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)를 활용한 이유는 `==` 보다는 엄격하게 관리되며, `===`보다 조금 더 개발자가 기대하는 결과를 가져옵니다. 예를 들어 `===`과 비교했을 때, `NaN`은 같다고 판단하며, `-0과 +0`은 서로 다르다고 판단합니다.

```ts title="typescript"
-0 === +0 // true
Object.is(-0, +0); // false

NaN === NaN; // false;
Object.is(NaN, NaN); // true
Object.is(NaN, 0 / 0); // true
```

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/contains/index.ts)

<br />

## Interface

```ts title="typescript"
function contains<T>(
  arr: T[] | readonly T[],
  value: unknown,
  comparator?: (x: any, y: any) => boolean
): value is T;
```

<br />

## Usage

### Default

```ts title="typescript"
import { contains } from '@modern-kit/utils';

const arr = [0, 1, 2, 3, NaN, {}];

contains(arr, 1); // true
contains(arr, NaN); // true

contains(arr, -0); // false
contains(arr, 4); // false
contains(arr, "3"); // false
contains(arr, {}); // false
```

<br />

### Comparator

```ts title="typescript"
const arr = [{ a: 1, b: 2 }];

contains(arr, { a: 1, c: 2 }, (x, y) => x.a === y.a); // true
contains(
  arr,
  { a: 1, b: 2 },
  (x, y) => JSON.stringify(x) === JSON.stringify(y)
); // true
```

<br />

### Narrowing types

```ts title="typescript"
const arr = [2, 3, 'foo'] as const;
const value = 'foo' as unknown;

if (contains(arr, value)) {
  value; // 2 | 3 | 'foo'
} else {
  value; // unknown
}
```

## Note
- [Object.is(en) - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
- [Object.is(ko) - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
- [동등 비교 및 동일성(en) - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
- [동등 비교 및 동일성(ko) - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Equality_comparisons_and_sameness#%EB%8F%99%EC%9D%BC_%EA%B0%92_%EC%A0%9C%EB%A1%9C_%EB%8F%99%EB%93%B1)
