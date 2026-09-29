# forEachObject

주어진 객체의 각 key-value 쌍에 대해 제공된 `콜백 함수`를 호출합니다.

`Array.prototype.forEach`처럼 반환값 없이 단순 순회하며, 객체 자신의 열거 가능한 string key만 순회합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/forEachObject/index.ts)

<br />

## Interface

```ts title="typescript"
function forEachObject<T extends Record<PropertyKey, any>>(
  obj: T,
  callback: (
    value: T[keyof T],
    key: `${Exclude<keyof T, symbol>}`,
    obj: T
  ) => void
): void;
```

<br />

## Usage

```ts title="typescript"
import { forEachObject } from '@modern-kit/utils';

const obj = { a: 1, b: 2, c: 3 };

forEachObject(obj, (value, key, object) => {
  console.log(value, key, object);
  // 1 'a' { a: 1, b: 2, c: 3 }
  // 2 'b' { a: 1, b: 2, c: 3 }
  // 3 'c' { a: 1, b: 2, c: 3 }
});
```
