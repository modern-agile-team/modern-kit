# ExtractSetType

`Set` 타입의 제네릭 타입을 추출하는 타입입니다. `Set<T>`와 같은 타입에서 `T`를 추출하여 반환합니다.

<br />

## Interface

```ts title="typescript"
type ExtractSetType<T> = T extends Set<infer U> ? U : never;
```

<br />

## Usage

### 기본 케이스

```ts title="typescript"
import { ExtractSetType } from '@modern-kit/types';

type StringSet = Set<string>;
type Result = ExtractSetType<StringSet>; // string
```

<br />

### Set 타입이 아닌 경우

```ts title="typescript"
import { ExtractSetType } from '@modern-kit/types';

type NotASet = ExtractSetType<number>; // never
```
