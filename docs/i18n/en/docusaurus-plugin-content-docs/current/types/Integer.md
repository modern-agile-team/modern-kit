# Integer

A type that checks whether the given number type is an `integer`. Returns `never` if it is not an integer.

<br />

## Interface

```ts title="typescript"
type Integer<T extends number> = `${T}` extends `${string}.${string}`
  ? never
  : T;
```

<br />

## Usage

### Integer Case

```ts title="typescript"
import { Integer } from '@modern-kit/types';

type ValidInteger = Integer<1>; // 1
```

<br />

### Non-Integer Case

```ts title="typescript"
import { Integer } from '@modern-kit/types';

type InvalidInteger = Integer<1.5>; // never
```
