# isReference

`참조 타입`은 객체, 배열, 함수 등 `비원시 타입`을 포함합니다. 주어진 인자가 `참조 타입`인지 여부를 확인하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isReference/index.ts)

## Interface
```ts title="typescript"
export type Reference =
  | object
  | any[]
  | Function
  | Set<any>
  | Map<any, any>
  | WeakMap<object, any>
  | WeakSet<object>
  | Date
  | RegExp
  | Error;

const isReference: (value: unknown) => value is Reference
```

<br />

## Usage
```ts title="typescript"
import { isReference } from '@modern-kit/utils';

isReference({}); // true
isReference([]); // true
isReference(new Set()); // true
isReference(new Map()); // true
isReference(new WeakSet()); // true
isReference(new WeakMap()); // true
isReference(new Date()); // true
isReference(new Error()); // true

isReference(null); // false
isReference(undefined); // false
isReference('string'); // false
isReference(1); // false
isReference(false); // false
isReference(Symbol()); // false
```
