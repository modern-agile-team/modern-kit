# Nullable

A type that allows `null` in addition to the given generic type.

<br />

## Interface

```ts title="typescript"
type Nullable<T> = T | null;
```

<br />

## Usage

```ts title="typescript"
import { Nullable } from '@modern-kit/types';

type Test = Nullable<string>; // string | null

const test: Nullable<string> = 'test';
const test2: Nullable<string> = null;
```
