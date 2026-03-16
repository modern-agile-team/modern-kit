# NonEmptyArray

A type representing an array that guarantees at least `1` element. A type that represents a non-empty array.

<br />

## Interface

```ts title="typescript"
type NonEmptyArray<T> = [T, ...T[]];
```

<br />

## Usage

```ts title="typescript"
import { NonEmptyArray } from '@modern-kit/types';

const valid: NonEmptyArray<number> = [1, 2, 3];

const invalid: NonEmptyArray<number> = []; // Error
```
