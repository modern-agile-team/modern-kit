# ExtractMapType

A type that extracts the generic type parameters from a `Map` type. It extracts `K` and `V` from a type like `Map<K, V>` and returns them as a tuple `[K, V]`.

<br />

## Interface

```ts title="typescript"
type ExtractMapType<T> = T extends Map<infer K, infer V>
  ? [K, V]
  : never;
```

<br />

## Usage

### Basic Case

```ts title="typescript"
import { ExtractMapType } from '@modern-kit/types';

type StringNumberMap = Map<string, number>;
type Extracted = ExtractMapType<StringNumberMap>; // [string, number]
```

<br />

### Non-Map Type

```ts title="typescript"
import { ExtractMapType } from '@modern-kit/types';

type NotMap = ExtractMapType<number>; // never
```
