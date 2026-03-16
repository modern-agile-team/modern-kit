# DistributiveOmit

A type that applies `Omit` to each member of a union type. It uses conditional types to behave like the distributive law.

<br />

## Interface

```ts title="typescript"
type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;
```

<br />

## Type Parameters

| Name | Constraint      | Default | Description                             |
| ---- | --------------- | ------- | --------------------------------------- |
| `T`  | -               | -       | The union type to distribute over       |
| `K`  | `PropertyKey`   | -       | The property key(s) to omit             |

<br />

## Usage

```ts title="typescript"
import { DistributiveOmit } from '@modern-kit/types';

type Union = { a: string } | { b: number }
type Result = DistributiveOmit<Union, 'a'>

// How it works step by step
// 1. Result = DistributiveOmit<Union, 'a'>
// 2. Result = Omit<{ a: string }, 'a'> | Omit<{ b: number }, 'a'>
// 3. Result = {} | { b: number }
```
