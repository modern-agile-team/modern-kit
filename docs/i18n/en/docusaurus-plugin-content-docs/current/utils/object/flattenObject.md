# flattenObject

Flattens a nested object into a single-level object whose keys are path strings.

- Only plain objects and arrays are flattened; arrays use their indices as keys. (`tags.0`, `tags.1`)
- Empty objects and empty arrays are kept as-is so their keys are not lost.
- Non-plain values such as `Date`, `Map`, `Set`, `File` and class instances are kept as-is without being flattened.
- Only the object's own enumerable string keys are processed, and the original object is not mutated.
- Objects with circular references are not supported.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/flattenObject/index.ts)

<br />

## Interface

```ts title="typescript"
function flattenObject<T extends Record<PropertyKey, any>>(
  obj: T,
  separator?: string // default: '.'
): Record<string, unknown>;
```

<br />

## Usage

```ts title="typescript"
import { flattenObject } from '@modern-kit/utils';

flattenObject({
  product: { id: 1, category: { name: 'clothing' } },
  tags: ['a', 'b'],
});
// { 'product.id': 1, 'product.category.name': 'clothing', 'tags.0': 'a', 'tags.1': 'b' }

// Custom separator
flattenObject({ a: { b: 1 } }, '_');
// { a_b: 1 }

// Empty objects/arrays and non-plain values are kept as-is.
flattenObject({ a: {}, b: [], c: new Date(0) });
// { a: {}, b: [], c: Date(0) }
```
