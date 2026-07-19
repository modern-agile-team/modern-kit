# toPairs

주어진 값을 `[key, value]` 쌍의 배열(entry)로 변환하는 함수입니다.

객체, 배열, `Map`, `Set`을 지원합니다. `Object.keys` 기반으로 동작하므로 객체의 경우 자기 자신의 열거 가능한 프로퍼티만 포함하며 `symbol` 키는 제외됩니다. 배열의 인덱스와 객체의 숫자 키는 런타임과 동일하게 문자열로 반환됩니다. `Set`은 값이 키와 값 양쪽에 모두 들어갑니다.

값을 전달하지 않거나 `null`/`undefined`를 전달하면 빈 배열(`[]`)을 반환합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/toPairs/index.ts)

<br />

## Interface

```ts title="typescript"
function toPairs<V>(set?: Set<V>): [V, V][];
function toPairs<K, V>(map?: Map<K, V>): [K, V][];
function toPairs<T>(array?: readonly T[]): [string, T][];
function toPairs<T extends Record<PropertyKey, any>>(
  obj?: T
): [SafeKey<T>, T[SafeKey<T>]][];
```

<br />

## Parameters

| Name  | Type                                                              | Default | Description                        |
| ----- | ----------------------------------------------------------------- | ------- | ---------------------------------- |
| `obj` | `Set<V> \| Map<K, V> \| readonly T[] \| Record<PropertyKey, any>` | -       | `[키, 값]` 쌍으로 변환할 값입니다. |

<br />

## Usage

### 객체

```ts title="typescript"
import { toPairs } from '@modern-kit/utils';

toPairs({ a: 1, b: 2 });
// [['a', 1], ['b', 2]]  →  ['a' | 'b', number][]

toPairs({ 0: 'x', 1: 'y' });
// [['0', 'x'], ['1', 'y']]  →  ['0' | '1', string][]  (키는 문자열)

// as const로 전달하면 리터럴 키/값으로 추론됩니다.
toPairs({ a: 1, b: 2 } as const);
// [['a', 1], ['b', 2]]  →  ['a' | 'b', 1 | 2][]
```

<br />

### 배열

```ts title="typescript"
import { toPairs } from '@modern-kit/utils';

// 배열의 인덱스(키)는 Object.keys와 동일하게 문자열로 반환됩니다.
toPairs([10, 20, 30]);
// [['0', 10], ['1', 20], ['2', 30]]  →  [string, number][]
```

<br />

### Map

```ts title="typescript"
import { toPairs } from '@modern-kit/utils';

toPairs(
  new Map([
    ['a', 1],
    ['b', 2],
  ])
);
// [['a', 1], ['b', 2]]  →  [string, number][]
```

<br />

### Set

```ts title="typescript"
import { toPairs } from '@modern-kit/utils';

// Set은 entry 전환 시 값이 키와 값 양쪽에 모두 들어갑니다.
toPairs(new Set([1, 2, 3]));
// [[1, 1], [2, 2], [3, 3]]  →  [number, number][]
```
