# cloneDeep

인자로 주어진 값을 `깊은 복사`를 수행하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/cloneDeep/index.ts)

<br />

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| ---- | ------------ | ------ | --------- |
| modern-kit/cloneDeep | 1,529,157.20 | 0.0007 | `fastest` |
| lodash/cloneDeep     | 650,320.39   | 0.0015 | - |

- **modern-kit/cloneDeep**
  - `2.35x` faster than lodash/cloneDeep

<br />

## Interface
```ts title="typescript"
function cloneDeep<T>(value: T): T;
```

<br />

## Usage
### 기본 사용법
```ts title="typescript"
import { cloneDeep } from '@modern-kit/utils';

const originNum = 42;
const copyNum = cloneDeep(originNum);

const originObj = { a: 1, b: { c: 2 } };
const copyObj = cloneDeep(originObj);

const originArray = [1, 2, [3, 4]];
const copyArray = cloneDeep(originArray);

const originSet = new Set([1, 2, 3]);
const copySet = cloneDeep(originSet);

const originMap = new Map([
  ['a', 1],
  ['b', 2],
]);
const copyMap = cloneDeep(originMap);
```
