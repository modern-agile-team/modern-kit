# Primitive

A type that defines JavaScript's basic primitive types. Composed as a union type that includes all primitive types.

<br />

## Interface

```ts title="typescript"
type Primitive =
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined;
```

<br />

## Usage

```ts title="typescript"
import { Primitive } from '@modern-kit/types';

const stringValue: Primitive = 'hello';
const numberValue: Primitive = 42;
const booleanValue: Primitive = true;
const symbolValue: Primitive = Symbol('key');
const bigIntValue: Primitive = 123n;
const nullValue: Primitive = null;
const undefinedValue: Primitive = undefined;
```
