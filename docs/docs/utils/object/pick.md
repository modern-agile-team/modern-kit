# pick

인자로 넣은 `keys`로 구성된 객체를 반환하는 함수입니다. 반환된 객체는 `깊은 복사된 새로운 객체`입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/pick/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/pick|1,693,028.73|0.0002|`fastest`|
|lodash/pick|1,022,887.39|0.0010|-|

- **modern-kit/pick**
  - `1.60x` faster than lodash/pick

## Interface
```ts title="typescript"
function pick<T extends Record<PropertyKey, any>, K extends keyof T>(
  obj: T,
  keys: K[] | readonly K[]
): Pick<T, K>;
```

## Usage
```ts title="typescript"
import { pick } from '@modern-kit/utils';

const pickedObj1 = pick({ a: 1, b: 2, c: 3 }, 'b'); // { b: 2 }
const pickedObj2 = pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
```