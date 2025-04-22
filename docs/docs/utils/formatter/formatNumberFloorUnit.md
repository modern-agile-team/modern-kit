# formatNumberFloorUnit

주어진 `숫자`를 주어진 `단위`로 나누고, 그 결과를 단위와 곱한 숫자를 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberFloorUnit/index.ts)

## Interface
```ts title="typescript"
function formatNumberFloorUnit(value: number, unit: number): number
```

## Usage
```ts title="typescript"
import { formatNumberFloorUnit } from '@modern-kit/utils';

formatNumberFloorUnit(1234567, 1000);
// 1234000

formatNumberFloorUnit(-1234567, 1000);
// -1234000
```
