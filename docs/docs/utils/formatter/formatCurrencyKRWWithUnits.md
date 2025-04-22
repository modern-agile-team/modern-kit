# formatCurrencyKRWWithUnits

주어진 `숫자` 또는 `숫자로 이뤄진 문자열`을 `단위(조, 억, 만)`로 나누고, `"원"` 문자열이 추가된 문자열을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatCurrencyKRWWithUnits/index.ts)

## Interface
```ts title="typescript"
type formatCurrencyKRWWithUnitsWithUnitsOptions = {
  commas?: boolean;
  decimal?: number;
};
```
```ts title="typescript"
function formatCurrencyKRWWithUnitsWithUnits(
  value: number | string,
  options?: formatCurrencyKRWWithUnitsWithUnitsOptions
): string;
```

## Usage
```ts title="typescript"
import { formatCurrencyKRWWithUnits } from '@modern-kit/utils';

const KRW_UNITS = [
  { unit: '조', value: 1_000_000_000_000 },
  { unit: '억', value: 100_000_000 },
  { unit: '만', value: 10_000 },
];

formatCurrencyKRWWithUnits(1234567890123);
formatCurrencyKRWWithUnits('1234567890123');
// '1조 2,345억 6,789만 123원'

// 쉼표 사용 여부
formatCurrencyKRWWithUnits(1234567890123, { commas: false });
formatCurrencyKRWWithUnits('1234567890123', { commas: false });
// '1조 2345억 6789만 123원'

// 소수점 자리수
formatCurrencyKRWWithUnits(123456789.12, { decimal: 2 });
formatCurrencyKRWWithUnits('123456789.12', { decimal: 2 });
// '1억 2,345만 6,789.12원'
```
