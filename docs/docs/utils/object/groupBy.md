# groupBy 

배열의 요소들을 제공된 콜백 함수 `callbackFn`에 따라 그룹화하여, 각 키에 해당하는 항목들의 배열을 포함하는 객체를 반환합니다.

## Code 

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/groupBy/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/groupBy|20,066.27|0.0498|`fastest`|
|lodash/groupBy|7,716.57|0.1296|`slowest`|

- **modern-kit/groupBy**
  - `2.60x` faster than lodash/groupBy

## Interface
```ts title="typescript"
function groupBy<T, K extends PropertyKey>(
  items: T[] | readonly T[],
  callbackFn: (item: T) => K
): Record<K, T[]>
```

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
//     fruit: [
//         { category: 'fruit', name: 'apple' },
//         { category: 'fruit', name: 'banana' },
//         { category: 'fruit', name: 'pear' },
//     ],
//     vegetable: [
//         { category: 'vegetable', name: 'carrot' },
//         { category: 'vegetable', name: 'broccoli' },
//     ],
// };
```