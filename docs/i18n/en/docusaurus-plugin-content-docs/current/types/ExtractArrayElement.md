# ExtractArrayElement

A utility type that extracts the element type of an array. For nested arrays, it recursively unwraps them to extract the innermost element type.

<br />

## Interface

```ts title="typescript"
type ExtractArrayElement<T> = T extends readonly (infer U)[]
  ? ExtractArrayElement<U>
  : T;
```

<br />

## Usage

```ts title="typescript"
import { ExtractArrayElement } from '@modern-kit/types';

type Example1 = ExtractArrayElement<(number | (number | number[])[])[]>
// number

type Example2 = ExtractArrayElement<(number | (string | boolean[])[])[]>
// number | string | boolean
```
