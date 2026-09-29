# reduceObject

Iterates over each key-value pair of the given object, running the `reducer` function to accumulate a single result value.

It works like `Array.prototype.reduce` and only iterates over the object's own enumerable string keys.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/reduceObject/index.ts)

<br />

## Interface

```ts title="typescript"
function reduceObject<T extends Record<PropertyKey, any>, A>(
  obj: T,
  reducer: (
    accumulator: A,
    iterateData: { key: keyof T; value: T[keyof T]; obj: T }
  ) => A,
  initialValue: A
): A;
```

<br />

## Usage

```ts title="typescript"
import { reduceObject } from '@modern-kit/utils';

const cart = { apple: 1000, banana: 2000, cherry: 3000 };

reduceObject(cart, (sum, { value }) => sum + value, 0);
// 6000

const params = { page: 1, size: 20 };

reduceObject(
  params,
  (acc, { key, value }) => [...acc, `${key}=${value}`],
  [] as string[]
);
// ['page=1', 'size=20']
```
