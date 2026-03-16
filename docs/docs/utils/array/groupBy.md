# groupBy

배열을 주어진 기준에 따라 그룹화합니다.

`iteratee` 함수를 전달하여 반환된 키를 기준으로 항목들을 그룹화합니다. 각 키는 그룹화된 항목 배열을 포함하는 객체의 속성으로 할당됩니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/groupBy/index.ts)

<br />

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/groupBy | 6,982,132.03 | 0.0001 | `fastest` |
| lodash/groupBy | 4,223,901.69 | 0.0002 | `slowest` |

- **modern-kit/groupBy**
  - `1.65x` faster than lodash/groupBy

<br />

## Interface

```ts title="typescript"
function groupBy<T, K extends PropertyKey>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => K
): Record<K, T[]>;
```

<br />

## References

- [Object.groupBy - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)
<br />

## Usage

```ts title="typescript"
import { groupBy } from '@modern-kit/utils';

const items = [
    { category: 'fruit', name: 'apple' },
    { category: 'fruit', name: 'banana' },
    { category: 'vegetable', name: 'carrot' },
    { category: 'fruit', name: 'pear' },
    { category: 'vegetable', name: 'broccoli' },
];
const group = groupBy(items, (item) => item.category);
// {
//   fruit: [
//       { category: 'fruit', name: 'apple' },
//       { category: 'fruit', name: 'banana' },
//       { category: 'fruit', name: 'pear' },
//   ],
//   vegetable: [
//       { category: 'vegetable', name: 'carrot' },
//       { category: 'vegetable', name: 'broccoli' },
//   ],
// };
```
