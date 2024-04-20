# pick

인자로 넣은 `keys`로 구성된 객체를 반환하는 함수입니다. 반환된 객체는 `깊은 복사된 새로운 객체`입니다.

`symbol`은 제외됩니다.

<br />

## Interface
```tsx
type ObjectKeys<T extends Record<PropertyKey, T[keyof T]>> = Exclude<
  keyof T,
  symbol
>;

const pick: <
  T extends Record<PropertyKey, T[keyof T]>,
  K extends ObjectKeys<T>
>(
  obj: T,
  keys: K | K[]
) => Pick<Record<ObjectKeys<T>, T[ObjectKeys<T>]>, K>;
```

## Usage
```ts
import { pick } from '@modern-kit/utils';

const pickedObj1 = pick({ a: 1, b: 2, c: 3 }, 'b'); // { b: 2 }
const pickedObj2 = pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
```