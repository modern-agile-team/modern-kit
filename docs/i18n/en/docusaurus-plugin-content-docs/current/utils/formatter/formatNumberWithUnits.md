# formatNumberWithUnits

A function that formats a `number` or `string consisting of numbers` by the given `units`.

- You can choose whether to use thousand-separator commas (`commas`). The default value is `true`.
- You can specify the number of allowed decimal places (`decimal`). The default value is `0`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithUnits/index.ts)

<br />

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

function formatNumberWithUnits(value: number | string, options: FormatNumberWithUnitsOptions): string
```

<br />

## Usage
### Basic Usage
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

<br />

### Comma Usage
```ts title="typescript"
import { formatNumberWithUnits } from '@modern-kit/utils';

formatNumberWithUnits(123456789, { units: KRW_UNITS, commas: false });
// "1억 2345만 6789"
formatNumberWithUnits(123456789, { units: KRW_UNITS, commas: true });
// "1억 2,345만 6,789"
```

<br />

### Specifying Decimal Places
```ts title="typescript"
import { formatNumberWithUnits } from '@modern-kit/utils';

formatNumberWithUnits(1234567.123, { units: KRW_UNITS, decimal: 2 });
// "1억 2,345만 6,789.12"
formatNumberWithUnits('-1234567.123', { units: KRW_UNITS, decimal: 2 });
// "-1억 2,345만 6,789.12"
```
