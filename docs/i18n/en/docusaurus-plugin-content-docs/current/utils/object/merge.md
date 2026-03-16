# merge

A utility function that merges the properties of a target object and a source object.

When keys are the same, primitive values are overwritten by the source value. If the value is an array, a new array containing elements from both target and source is returned.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/merge/index.ts)

<br />

## Interface
```ts title="typescript"
function merge<
  T extends Record<PropertyKey, any>,
  S extends Record<PropertyKey, any>
>(target: T, source: S): T & S;
```

<br />

## Usage
### Default
```ts title="typescript"
import { merge } from '@modern-kit/utils';


const target1 = { a: { x: 1, y: 2 }, b: 2 };
const source1 = { a: { y: 3, z: 4 }, c: 5 };
merge(target1, source1); // { a: { x: 1, y: 3, z: 4 }, b: 2, c: 5 }

const target2 = { a: [1, { name: 'modern' }] };
const source2 = { a: [3, { address: 'seoul' }] };
merge(target2, source2); // { a: [3, { name: 'modern', address: 'seoul' }] }
```
