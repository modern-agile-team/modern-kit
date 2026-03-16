# hasProperty

A function that returns a `boolean` indicating whether an object contains a specified property. If true, the type of the property is narrowed.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/hasProperty/index.ts)

## Interface
```ts title="typescript"
const hasProperty: <T extends Record<PropertyKey, any>, K extends PropertyKey>(
  obj: T,
  key: K
) => key is K & keyof T;
```

<br />

## Usage
```ts title="typescript"
import { hasProperty } from '@modern-kit/utils';

const exampleObj = { foo: 'foo', bar: 'bar' } as const;

const exampleKey1 = 'foo' as string;
const exampleKey2 = 'zoo' as string;

hasProperty(exampleObj, exampleKey1); // true
// const exampleKey1: "foo" | "bar"
hasProperty(exampleObj, exampleKey2); // false
// const exampleKey2: string
```
