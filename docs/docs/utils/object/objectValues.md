# objectValues

`Object.values()`와 동일하게 동작하는 함수입니다.
이때, `symbol` 프로퍼티는 열거형이 아니기 때문에 제외됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/objectValues/index.ts)

<br />

## Interface
```ts title="typescript"
type ObjectKeys<T extends Record<PropertyKey, any>> = Exclude<
  keyof T,
  symbol
>;

function objectValues<T extends Record<PropertyKey, any>>(
  obj: T
): T[ObjectKeys<T>][];
```

<br />

## Usage
```ts title="typescript"
import { objectValues } from '@modern-kit/utils';

const symbol = Symbol('d');
const obj = {
  a: 1,
  b: 2,
  c: 3,
  [symbol]: 4,
} as const;

 /**
  * type: (1 | 2 | 3)[]
  * value: [1, 2, 3]
  */
const values = objectValues(obj);
```

## Note
- [Object.values() - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
