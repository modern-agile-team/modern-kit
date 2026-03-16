# invert

주어진 객체의 각 키와 값을 반전하여 새로운 객체를 생성합니다.

기본적으로 객체의 키와 값을 반전하지만, `iteratee` 함수를 제공하면 각 값에 대해 변형된 키를 생성하여 반전할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/invert/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

### Default
| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/invert | 6,119,008.75 | 0.0002 | `fastest` |
| lodash/invert | 4,459,920.52 | 0.0003 | `slowest` |

- **modern-kit/invert**
  - `1.37x` faster than **lodash/invert**

<br />

### with iteratee
| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/invert | 4,154,655.71 | 0.0003 | `fastest` |
| lodash/invertBy | 2,262,596.79 | 0.0004 | `slowest` |

- **modern-kit/invert**
  - `1.84x` faster than **lodash/invertBy**

<br />

## Interface
```ts title="typescript"
function invert<K extends PropertyKey, V extends PropertyKey>(
  obj: Record<K, V>
): Record<V, K>;

function invert<K extends PropertyKey, V, TK extends PropertyKey>(
  obj: Record<K, V>,
  iteratee: (iterateData: { value: V; key: K; obj: Record<K, V> }) => TK
): Record<TK, K>;
```

<br />

## Usage
### Default
```ts title="typescript"
import { invert } from '@modern-kit/utils';

const obj = { a: 1, b: 2, c: 3 };

invert(obj);
// value: { 1: 'a', 2: 'b', 3: 'c' };
// type: Record<number, "a" | "b" | "c">
```

<br />

### with iteratee
```ts title="typescript"
import { invert } from '@modern-kit/utils';

const obj = {
  a: { name: 'foo' },
  b: { name: 'bar' },
} as const;

invert(obj, (value) => value.name);
// value: { foo: 'a', bar: 'b' }
// type: Record<"foo" | "bar", "a" | "b">
```
