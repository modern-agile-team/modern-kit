# objectKeys

`Object.keys()`와 동일하게 동작하지만 `key`타입을 지켜주는 함수입니다.
참고로, symbol 프로퍼티는 열거형이 아니기 때문에 제외됩니다.

<br />

## Interface
```tsx
type ObjectKeys<T extends Record<PropertyKey, T[keyof T]>> = Exclude<
  keyof T,
  symbol
>;

const objectKeys: <T extends Record<ObjectKeys<T>, T[keyof T]>>(
  obj: T
) => ObjectKeys<T>[];
```

## Usage
```ts
import { objectKeys } from '@modern-kit/utils';

const symbol = Symbol('d');
const obj = {
  a: 1,
  b: 2,
  c: 3,
  [symbol]: 4,
} as const;

 /**
  * type: ("a" | "b" | "c")[]
  * value: ["a", "b", "c"]
  */
const keys = objectKeys(obj);
```

## Note
[Object.keys()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)