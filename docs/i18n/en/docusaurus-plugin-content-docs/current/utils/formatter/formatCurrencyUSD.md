# formatCurrencyUSD

A function that returns a string with a dollar ($) sign added to a given `number` or `string consisting of numbers`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatCurrencyUSD/index.ts)

<br />

## Interface
```ts title="typescript"
function formatCurrencyUSD(
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
import { formatCurrencyUSD } from '@modern-kit/utils';

formatCurrencyUSD(1234567);
formatCurrencyUSD('1234567');
// '$1,234,567'

formatCurrencyUSD(-1234567);
formatCurrencyUSD('-1234567');
// '-$1,234,567'
```

<br />

### Specifying Decimal Places
```ts title="typescript"
import { formatCurrencyUSD } from '@modern-kit/utils';

formatCurrencyUSD(1234567.1234, { decimal: 2 });
// '$1,234,567.12'

formatCurrencyUSD(-1234567.1234, { decimal: 2 });
// '-$1,234,567.12'
```
