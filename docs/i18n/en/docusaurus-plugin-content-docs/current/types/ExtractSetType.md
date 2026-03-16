# ExtractSetType

A type that extracts the generic type parameter from a `Set` type. It extracts `T` from a type like `Set<T>` and returns it.

<br />

## Interface

```ts title="typescript"
type ExtractSetType<T> = T extends Set<infer U> ? U : never;
```

<br />

## Usage

### Basic Case

```ts title="typescript"
import { ExtractSetType } from '@modern-kit/types';

type StringSet = Set<string>;
type Result = ExtractSetType<StringSet>; // string
```

<br />

### Non-Set Type

```ts title="typescript"
import { ExtractSetType } from '@modern-kit/types';

type NotASet = ExtractSetType<number>; // never
```
