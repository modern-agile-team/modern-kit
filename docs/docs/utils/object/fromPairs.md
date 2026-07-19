# fromPairs

`[key, value]` 쌍의 entry 배열을 객체로 변환하는 함수입니다.

`toPairs`의 반대 동작을 수행하며, 각 쌍의 첫 번째 요소를 키로, 두 번째 요소를 값으로 갖는 객체를 반환합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/fromPairs/index.ts)

<br />

## Interface

```ts title="typescript"
function fromPairs<T extends [PropertyKey, any][]>(
  pairs: T
): Record<T[number][0], T[number][1]>;
```

<br />

## Parameters

| Name    | Type                   | Default | Description                               |
| ------- | ---------------------- | ------- | ----------------------------------------- |
| `pairs` | `[PropertyKey, any][]` | -       | 객체로 변환할 `[키, 값]` 쌍의 배열입니다. |

<br />

## Returns

| Type                                 | Description                                |
| ------------------------------------ | ------------------------------------------ |
| `Record<T[number][0], T[number][1]>` | 각 쌍을 프로퍼티로 갖는 객체를 반환합니다. |

<br />

## Usage

```ts title="typescript"
import { fromPairs } from '@modern-kit/utils';

fromPairs([
  ['a', 1],
  ['b', 2],
]);
// { a: 1, b: 2 }  →  Record<string, number>

// as const로 전달하면 리터럴 키/값으로 추론됩니다.
fromPairs([
  ['a', 1],
  ['b', 2],
] as const);
// { a: 1, b: 2 }  →  Record<'a' | 'b', 1 | 2>
```
