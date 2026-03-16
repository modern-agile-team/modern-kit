# contains

A utility function that determines whether a specific element is included in the array passed as the first argument.

`includes` throws a type error when checking if an element with an incompatible type is included when using `as const`. This function improves that behavior using the `some` method.

```ts title="typescript"
const test = (value: number) => {
  const arr = [1, 2, 3, 4] as const;
  arr.includes(value); // Argument of type 'number' is not assignable to parameter of type '1 | 2 | 3 | 4'.
};
```

When checking whether an element is included via the `some` method, `Object.is` is used by default. If needed, a `comparator` function can be provided as the third argument.

[Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) is used because it is stricter than `==` and produces results closer to developer expectations compared to `===`. For example, unlike `===`, it considers `NaN` equal to itself and treats `-0` and `+0` as different values.

```ts title="typescript"
-0 === +0 // true
Object.is(-0, +0); // false

NaN === NaN; // false;
Object.is(NaN, NaN); // true
Object.is(NaN, 0 / 0); // true
```

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/contains/index.ts)

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
- [Equality comparisons and sameness(en) - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
- [Equality comparisons and sameness(ko) - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Equality_comparisons_and_sameness#%EB%8F%99%EC%9D%BC_%EA%B0%92_%EC%A0%9C%EB%A1%9C_%EB%8F%99%EB%93%B1)
