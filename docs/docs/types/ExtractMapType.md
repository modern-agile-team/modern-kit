# ExtractMapType

`Map` 타입의 제네릭 타입을 추출하는 타입입니다. `Map<K, V>`와 같은 타입에서 `K`와 `V`를 추출하여 `[K, V]` 형태의 튜플로 반환합니다.

<br />

## Interface

```ts title="typescript"
type ExtractMapType<T> = T extends Map<infer K, infer V>
  ? [K, V]
  : never;
```

<br />

## Usage

### 기본 케이스

```ts title="typescript"
import { ExtractMapType } from '@modern-kit/types';

type StringNumberMap = Map<string, number>;
type Extracted = ExtractMapType<StringNumberMap>; // [string, number]
```

<br />

### Map 타입이 아닌 경우

```ts title="typescript"
import { ExtractMapType } from '@modern-kit/types';

type NotMap = ExtractMapType<number>; // never
```
