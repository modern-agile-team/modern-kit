# Arrayable

A type that allows both the given type and an array of that type.

<br />

## Interface

```ts title="typescript"
type Arrayable<T> = T | T[];
```

<br />

## Usage

```ts title="typescript"
import { Arrayable } from '@modern-kit/types';

type Result = Arrayable<string>; // string | string[]
```
