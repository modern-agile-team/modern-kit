# Merge

A type that merges two object types. Overlapping properties are replaced by the second type.

<br />

## Interface

```ts title="typescript"
type Merge<
  A extends Record<PropertyKey, any>,
  B extends Record<PropertyKey, any>
> = Omit<A, keyof B> & B;
```

<br />

## Type Parameters

| Name | Constraint                   | Default | Description            |
| ---- | ---------------------------- | ------- | ---------------------- |
| `A`  | `Record<PropertyKey, any>`   | -       | The first object type  |
| `B`  | `Record<PropertyKey, any>`   | -       | The second object type |

<br />

## Usage

```ts title="typescript"
import { Merge } from '@modern-kit/types';

type A = { a: string, b: number }
type B = { b: string, c: boolean }
type Result = Merge<A, B>

// How it works step by step
// 1. Result = Merge<A, B>
// 2. Result = Omit<A, 'b' | 'c'> & B
// 3. Result = { a: string } & B
// 4. Result = { a: string, b: string, c: boolean }
```
