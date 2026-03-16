# Merge

두 객체 타입을 병합하는 타입입니다. 겹치는 프로퍼티는 두 번째 타입으로 대체됩니다.

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

| Name | Constraint                   | Default | Description          |
| ---- | ---------------------------- | ------- | -------------------- |
| `A`  | `Record<PropertyKey, any>`   | -       | 첫 번째 객체 타입    |
| `B`  | `Record<PropertyKey, any>`   | -       | 두 번째 객체 타입    |

<br />

## Usage

```ts title="typescript"
import { Merge } from '@modern-kit/types';

type A = { a: string, b: number }
type B = { b: string, c: boolean }
type Result = Merge<A, B>

// 동작 원리와 순서
// 1. Result = Merge<A, B>
// 2. Result = Omit<A, 'b' | 'c'> & B
// 3. Result = { a: string } & B
// 4. Result = { a: string, b: string, c: boolean }
```
