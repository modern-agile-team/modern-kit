# Arrayable

주어진 타입과 해당 타입으로 이뤄진 배열 타입을 모두 허용하는 타입입니다.

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
