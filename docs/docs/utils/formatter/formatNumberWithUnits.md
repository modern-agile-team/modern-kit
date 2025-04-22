# formatNumberWithUnits

`숫자` 혹은 `숫자로 이루어진 문자열`을 주어진 `단위` 별로 포맷팅하는 함수입니다.
- 쉼표 사용 여부(`commas`)를 선택할 수 있습니다.
- 소수점 허용 여부(`decimal`)를 선택할 수 있습니다.

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

formatNumberWithUnits(1234567, { units: KRW_UNITS }) // "123만 4,567"
formatNumberWithUnits(-1234567, { units: KRW_UNITS }) // "-123만 4,567", 음수 처리
formatNumberWithUnits('1234567', { units: KRW_UNITS }) // "123만 4,567", 숫자로 이루어진 문자열 허용

// 쉼표 사용 여부
formatNumberWithUnits(1234567, { units: KRW_UNITS, commas: false }) // "123만 4567"

// 소수점 허용 여부
formatNumberWithUnits(1234567.123, { units: KRW_UNITS, decimal: 2 }) // "123만 4,567.12"
```