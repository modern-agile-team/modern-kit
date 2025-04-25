# formatCurrencyKRWWithUnits

주어진 `숫자` 또는 `숫자로 이뤄진 문자열`을 `단위(조, 억, 만)`로 나누고, `"원"` 문자열이 추가된 문자열을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatCurrencyKRWWithUnits/index.ts)

## Interface
```ts title="typescript"
function formatCurrencyKRWWithUnits(
  value: number | string,
  options?: {
    decimal?: number;
  }
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

formatCurrencyKRWWithUnits(1234567891234);
formatCurrencyKRWWithUnits('1234567891234');
// '1조 2,345억 6,789만 1,234원'

formatCurrencyKRWWithUnits(-123456789);
formatCurrencyKRWWithUnits('-123456789');
// '-1억 2,345만 6,789원'

formatCurrencyKRWWithUnits(123456789.1234, { decimal: 2 });
// '1조 2,345억 6,789만 1,234.12원'
```
