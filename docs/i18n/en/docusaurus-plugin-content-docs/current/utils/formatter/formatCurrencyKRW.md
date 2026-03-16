# formatCurrencyKRW

A function that returns a string with a currency symbol added to a given `number` or `string consisting of numbers`.

- To display using the currency symbol (₩) instead of "원", set the `isSymbol` option to `true`. The default value is `false`.
- You can specify the number of allowed decimal places (`decimal`). The default value is `0`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatCurrencyKRW/index.ts)

<br />

## Interface
```ts title="typescript"
function formatCurrencyKRW(
  value: number | string,
  options?: {
    isSymbol?: boolean;
    decimal?: number;
  }
): string;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { formatCurrencyKRW } from '@modern-kit/utils';

formatCurrencyKRW(1234567);
formatCurrencyKRW('1234567');
// '1,234,567원'

formatCurrencyKRW(-1234567);
formatCurrencyKRW('-1234567');
// '-1,234,567원'
```

<br />

### Specifying Decimal Places
```ts title="typescript"
import { formatCurrencyKRW } from '@modern-kit/utils';

formatCurrencyKRW(1234567.1234, { decimal: 2 });
// '1,234,567.12원'

formatCurrencyKRW(-1234567.1234, { decimal: 2 });
// '-1,234,567.12원'
```

<br />

### Using Currency Symbol (₩)
```ts title="typescript"
import { formatCurrencyKRW } from '@modern-kit/utils';

formatCurrencyKRW(1234567, { isSymbol: true });
// '₩1,234,567'

formatCurrencyKRW(-1234567, { isSymbol: true });
// '-₩1,234,567'
```
