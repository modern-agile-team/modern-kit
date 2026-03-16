# formatCurrencyKRWWithUnits

A function that divides a given `number` or `string consisting of numbers` into `units (조/억/만)` and returns a string with the `"원"` suffix appended.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatCurrencyKRWWithUnits/index.ts)

<br />

## Interface
```ts title="typescript"
function formatCurrencyKRWWithUnits(
  value: number | string,
  options?: {
    decimal?: number;
  }
): string;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { formatCurrencyKRWWithUnits } from '@modern-kit/utils';

formatCurrencyKRWWithUnits(1234567891234);
formatCurrencyKRWWithUnits('1234567891234');
// '1조 2,345억 6,789만 1,234원'

formatCurrencyKRWWithUnits(-123456789);
formatCurrencyKRWWithUnits('-123456789');
// '-1억 2,345만 6,789원'
```

<br />

### Specifying Decimal Places
```ts title="typescript"
import { formatCurrencyKRWWithUnits } from '@modern-kit/utils';

formatCurrencyKRWWithUnits(123456789.1234, { decimal: 2 });
// '1억 2,345만 6,789.12원'
```
