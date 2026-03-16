# isDateInRange

Checks whether a target date falls within a given date range.

If no `targetDate` is provided, the `current date` is used.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/isDateInRange/index.ts)

<br />

## Interface
```ts title="typescript"
interface IsDateInRangeParams {
  targetDate?: Date | string | number;
  fromDate?: Date | string | number;
  toDate?: Date | string | number;
  inclusive?: 'both' | 'from' | 'to' | 'none';
}
```
```ts title="typescript"
function isDateInRange({
  targetDate = new Date(),
  fromDate,
  toDate,
  inclusive = 'from',
}: IsDateInRangeParams): boolean;
```

<br />

## Usage

### Basic Behavior

- If a target date is provided, checks whether the `target date` is within the range; otherwise checks whether the `current date` is within the range.

```ts title="typescript"
import { isDateInRange } from '@modern-kit/utils';

// When the current date is January 1, 2025
isDateInRange({ fromDate: new Date('2024-01-01'), toDate: new Date('2024-12-31') }); // false

isDateInRange({ fromDate: '2025-01-01', toDate: '2025-12-31' }); // true
isDateInRange({ targetDate: '2025-01-02', fromDate: '2025-01-01', toDate: '2025-01-03' }); // true
```

<br />

### Only fromDate Specified

- Checks whether the `target date (or current date)` is after the start date.

```ts title="typescript"
import { isDateInRange } from '@modern-kit/utils';

// When the current date is January 1, 2025
isDateInRange({ fromDate: new Date('2025-01-02') }); // true
isDateInRange({ fromDate: '2024-12-31' }); // false

isDateInRange({ targetDate: '2025-01-02', fromDate: '2025-01-01' }); // true
```

<br />

### Only toDate Specified

- Checks whether the `target date (or current date)` is before the end date.

```ts title="typescript"
import { isDateInRange } from '@modern-kit/utils';

// When the current date is January 1, 2025
isDateInRange({ toDate: new Date('2025-01-02') }); // true
isDateInRange({ toDate: '2024-12-31' }); // false

isDateInRange({ targetDate: '2024-12-31', toDate: '2025-01-01' }); // true
```

<br />

### Boundary Inclusion Control

- The `inclusive` option controls whether boundary values are included in the range check.

```ts title="typescript"
import { isDateInRange } from '@modern-kit/utils';

// When the current date is January 1, 2025
isDateInRange({ fromDate: '2025-01-01', toDate: '2025-01-01', inclusive: 'both' }); // true
isDateInRange({ targetDate: '2025-01-01', fromDate: '2025-01-01', toDate: '2025-01-01', inclusive: 'both' }); // true

isDateInRange({ fromDate: '2025-01-01', toDate: '2025-01-02', inclusive: 'from' }); // true
isDateInRange({ targetDate: '2025-01-01', fromDate: '2025-01-01', toDate: '2025-01-02', inclusive: 'from' }); // true

isDateInRange({ fromDate: '2024-12-31', toDate: '2025-01-01', inclusive: 'to' }); // true
isDateInRange({ targetDate: '2025-01-01', fromDate: '2024-12-31', toDate: '2025-01-01', inclusive: 'to' }); // true

isDateInRange({ fromDate: '2024-12-31', toDate: '2025-01-02', inclusive: 'none' }); // true
isDateInRange({ targetDate: '2025-01-01', fromDate: '2024-12-31', toDate: '2025-01-02', inclusive: 'none' }); // true
```
