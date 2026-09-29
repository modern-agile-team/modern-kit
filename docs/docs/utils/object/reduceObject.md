# reduceObject

주어진 객체의 각 key-value 쌍을 순회하며 `reducer` 함수를 실행해 하나의 결과값으로 누적합니다.

`Array.prototype.reduce` 처럼 동작하며, 객체 자신의 열거 가능한 string key 만 순회합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/reduceObject/index.ts)

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
