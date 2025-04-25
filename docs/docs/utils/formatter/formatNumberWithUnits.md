# formatNumberWithUnits

`숫자` 혹은 `숫자로 이루어진 문자열`을 주어진 `단위` 별로 포맷팅하는 함수입니다.

- 천 단위마다 쉼표 사용 여부(`commas`)를 선택할 수 있습니다. 기본값은 `true`입니다.
- 허용 할 소수점 자리수(`decimal`)를 선택할 수 있습니다. 기본값은 `0`입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithUnits/index.ts)

## Interface
```ts title="typescript"
interface Unit {
  unit: string;
  value: number;
}

interface FormatNumberWithUnitsOptions {
  units: Unit[] | readonly Unit[];
  commas?: boolean; // default: true
  decimal?: number; // default: 0
}
```
```ts title="typescript"
function formatNumberWithUnits(value: number | string, options: FormatNumberWithUnitsOptions): string
```

## Usage
### 기본 동작
```ts title="typescript"
import { formatNumberWithUnits } from '@modern-kit/utils';

const KRW_UNITS = [
  { unit: '조', value: 1_000_000_000_000 },
  { unit: '억', value: 100_000_000 },
  { unit: '만', value: 10_000 },
] as const;

formatNumberWithUnits(123456789, { units: KRW_UNITS });
formatNumberWithUnits('123456789', { units: KRW_UNITS });
// "1억 2,345만 6,789"

formatNumberWithUnits(-123456789, { units: KRW_UNITS });
formatNumberWithUnits('-123456789', { units: KRW_UNITS });
// "-1억 2,345만 6,789"
```
```ts title="typescript"
// 콤마 사용 여부
formatNumberWithUnits(123456789, { units: KRW_UNITS, commas: false });
// "1억 2345만 6789"
formatNumberWithUnits(123456789, { units: KRW_UNITS, commas: true });
// "1억 2,345만 6,789"

```
```ts title="typescript"
// 소수점 허용 여부
formatNumberWithUnits(1234567.123, { units: KRW_UNITS, decimal: 2 });
// "1억 2,345만 6,789.12"
formatNumberWithUnits('-1234567.123', { units: KRW_UNITS, decimal: 2 });
// "-1억 2,345만 6,789.12"
```