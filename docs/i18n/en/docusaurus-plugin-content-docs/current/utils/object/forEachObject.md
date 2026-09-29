# forEachObject

Calls the provided `callback` function for each key-value pair of the given object.

Like `Array.prototype.forEach`, it simply iterates without returning a value, and only iterates over the object's own enumerable string keys.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/forEachObject/index.ts)

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
