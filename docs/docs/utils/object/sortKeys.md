# sortKeys

주어진 객체의 key를 정렬한 새로운 객체를 반환합니다.

객체 자신의 열거 가능한 string key만 정렬 대상이며, 원본 객체를 변경하지 않습니다. 최상위 key만 정렬하며, 중첩된 객체까지 정렬하려면 `sortKeysDeep`을 사용합니다.

`comparator`를 생략하면 `Array.prototype.sort` 기본 순서(UTF-16 코드 유닛)로 정렬합니다.

:::note
JS 객체는 정수 형태의 key(`'1'`, `'10'`)를 항상 오름차순으로 먼저 나열하므로, `comparator`와 상관없이 정수 key는 문자열 key보다 앞에 위치합니다.
:::

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/sortKeys/index.ts)

<br />

## Interface

```ts title="typescript"
function sortKeys<T extends Record<PropertyKey, any>>(
  obj: T,
  comparator?: (a: string, b: string) => number
): T;
```

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { sortKeys } from '@modern-kit/utils';

sortKeys({ c: 3, a: 1, b: 2 });
// { a: 1, b: 2, c: 3 }
```

<br />

### comparator 사용

```ts title="typescript"
import { sortKeys } from '@modern-kit/utils';

sortKeys({ a: 1, b: 2 }, (a, b) => b.localeCompare(a));
// { b: 2, a: 1 }
```
