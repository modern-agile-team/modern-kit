# abRandom

50% 확률로 `0`또는 `1`을 반환하는 함수입니다.

`AB 테스트`를 할 때 활용할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/abRandom/index.ts)

## Interface
```ts title="typescript"
const abRandom: () => 0 | 1
```

## Usage
```ts title="typescript"
import { abRandom } from '@modern-kit/utils';

const ab = abRandom();
```