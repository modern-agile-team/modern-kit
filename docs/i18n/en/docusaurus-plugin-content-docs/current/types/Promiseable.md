# Promiseable

A type that allows both the given type and its `Promise` type.

<br />

## Interface

```ts title="typescript"
type Promiseable<T> = T | Promise<T>;
```

<br />

## Usage

```ts title="typescript"
import { Promiseable } from '@modern-kit/types';

type Result = Promiseable<string>; // string | Promise<string>
```
