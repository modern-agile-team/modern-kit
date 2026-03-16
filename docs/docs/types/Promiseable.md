# Promiseable

주어진 타입과 해당 타입의 `Promise` 타입을 모두 허용하는 타입입니다.

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
