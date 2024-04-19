# omit

인자로 넣은 `keys`를 생략한 객체를 반환하는 함수입니다. 반환된 객체는 `깊은 복사된 새로운 객체`입니다.

`symbol`은 제외됩니다.

<br />

## Interface
```tsx
type ObjectKeys<T extends Record<PropertyKey, T[keyof T]>> = Exclude<
  keyof T,
  symbol
>;

const omit: <
  T extends Record<PropertyKey, T[keyof T]>,
  K extends ObjectKeys<T>
>(
  obj: T,
  keys: K | K[]
) => Omit<Record<ObjectKeys<T>, T[ObjectKeys<T>]>, K>;
```

## Usage
```ts
import { omit } from '@devgrace/utils';

const symbol = Symbol('d');
const omittedObj1 = omit({ a: 1, b: 2, c: 3, [symbol]: 4 }, 'b'); // { a: 1, c: 3 }
const omittedObj1 = omit({ a: 1, b: 2, c: 3, d: 4, [symbol]: 4 }, ['a', 'd']); // { b: 2, c: 3 }
```