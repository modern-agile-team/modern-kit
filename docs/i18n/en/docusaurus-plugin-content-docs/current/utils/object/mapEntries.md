# mapEntries

Returns a new object by transforming both the keys and values of the given object according to the result of the provided `iteratee` function.

The `iteratee` must return a `[newKey, newValue]` tuple. If transformed keys collide, the value iterated later overwrites the earlier one.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/mapEntries/index.ts)

## Interface
```ts title="typescript"
function mapEntries<
  T extends Record<PropertyKey, any>,
  K extends PropertyKey,
  V,
>(
  obj: T,
  iteratee: (iterateData: {
    key: keyof T;
    value: T[keyof T];
    obj: T;
  }) => readonly [K, V]
): Record<K, V>;
```

<br />

## Usage
```ts title="typescript"
import { mapEntries } from '@modern-kit/utils';

const obj = { a: 1, b: 2, c: 3 };

mapEntries(obj, ({ key, value }) => [key.toUpperCase(), value * 10]);
// { A: 10, B: 20, C: 30 }

const roles = { fred: 'admin', pebbles: 'guest' } as const;

mapEntries(roles, ({ key, value }) => [value, key]);
// { admin: 'fred', guest: 'pebbles' }
```
