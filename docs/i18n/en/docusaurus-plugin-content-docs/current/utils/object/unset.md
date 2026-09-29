# unset

Removes the property at the given path of an object and returns a new object.

It uses the same dot notation paths as `get` and `set`. If the type of the given object has optional properties, they must be accessed with an optional (`?`) path.

If a value in the middle of the path is missing or is not an object, nothing is removed and the object is returned as-is.

By default the original object is not mutated (`immutable: true`). Passing `immutable: false` removes the property directly from the original object.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/unset/index.ts)

## Interface
```ts title="typescript"
function unset<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>
>(obj: T, path: P, options?: { immutable?: boolean }): T;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { unset } from '@modern-kit/utils';

const obj = { a: { b: 1, c: 2 } };

unset(obj, 'a.b');
// { a: { c: 2 } }
// obj: { a: { b: 1, c: 2 } } (original is preserved)
```

### Optional path
```ts title="typescript"
import { unset } from '@modern-kit/utils';

// Returns as-is when a value in the middle of the path is missing.
const obj: { a?: { b?: number } } = {};

unset(obj, 'a?.b');
// {}
```

### Mutating the original object
```ts title="typescript"
import { unset } from '@modern-kit/utils';

const obj = { a: { b: 1, c: 2 } };

unset(obj, 'a.b', { immutable: false });
// obj: { a: { c: 2 } }
```
