# Invert

A type that swaps the keys and values of an object.

<br />

## Interface

```ts title="typescript"
type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T as T[K]]: K;
};
```

<br />

## Usage

```ts title="typescript"
import { Invert } from '@modern-kit/types';

type OriginObj = { a: 'x', b: 'y' };
type InvertedObj = Invert<OriginObj>; // { x: 'a', y: 'b' }
```
