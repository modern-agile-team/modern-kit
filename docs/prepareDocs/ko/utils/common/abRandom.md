# abRandom

50% 확률로 `0`또는 `1`을 반환하는 함수입니다.

`AB 테스트`를 할 때 활용할 수 있습니다.


<br />

## Interface
```tsx
const abRandom: () => 0 | 1
```

## Usage
```ts
import { abRandom } from '@devgrace/utils';

const ab = abRandom();
```