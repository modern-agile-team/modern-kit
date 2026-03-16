# Reference

A union type representing JavaScript's reference types (Reference Types). Includes all types that are not primitive types (`Primitive`).

<br />

## Interface

```ts title="typescript"
type Reference =
  | Record<PropertyKey, any>
  | readonly any[]
  | ((...args: any[]) => any)
  | Set<any>
  | Map<any, any>
  | WeakMap<object, any>
  | WeakSet<object>
  | Date
  | RegExp
  | Error
  | Promise<any>
  | ArrayBuffer
  | DataView
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;
```

<br />

## Usage

```ts title="typescript"
import { Reference } from '@modern-kit/types';

// Object type
const obj: Reference = { name: 'John', age: 30 };

// Array type
const arr: Reference = [1, 2, 3, 4, 5];

// Function type
const func: Reference = (x: number) => x * 2;

// Collection types
const set: Reference = new Set([1, 2, 3]);
const map: Reference = new Map([['key', 'value']]);

// Built-in object types
const date: Reference = new Date();
const regex: Reference = /pattern/;
const error: Reference = new Error('Something went wrong');
```
