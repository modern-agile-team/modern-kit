# DistributiveOmit

유니온 타입에서 각각의 타입에 대해 `Omit`을 적용하는 타입입니다. 조건부 타입을 사용하여 분배 법칙처럼 동작합니다.

<br />

## Interface

```ts title="typescript"
type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;
```

<br />

## Type Parameters

| Name | Constraint      | Default | Description                     |
| ---- | --------------- | ------- | ------------------------------- |
| `T`  | -               | -       | 분배 대상이 되는 유니온 타입    |
| `K`  | `PropertyKey`   | -       | 제거할 프로퍼티 키              |

<br />

## Usage

```ts title="typescript"
import { DistributiveOmit } from '@modern-kit/types';

type Union = { a: string } | { b: number }
type Result = DistributiveOmit<Union, 'a'>

// 동작 원리와 순서
// 1. Result = DistributiveOmit<Union, 'a'>
// 2. Result = Omit<{ a: string }, 'a'> | Omit<{ b: number }, 'a'>
// 3. Result = {} | { b: number }
```
