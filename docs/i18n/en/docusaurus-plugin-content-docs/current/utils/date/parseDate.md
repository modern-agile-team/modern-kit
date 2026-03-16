# parseDate

Parses a date string, Date object, or number into a Date object.

For date strings, converts `"-"` and `"."` to `"/"` to ensure compatibility with `Safari`, which does not support date formats containing those separators.
- Converts `YYYY-MM-DD` format strings to `YYYY/MM/DD`.
- Converts `YYYY.MM.DD` format strings to `YYYY/MM/DD`.
- All other date string formats are returned as-is.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/parseDate/index.ts)

<br />

## Interface
```ts title="typescript"
const parseDate: (date: string | Date | number) => Date
```

<br />

## Usage

### Valid Date Formats

```ts title="typescript"
import { parseDate } from '@modern-kit/utils';

// Date strings
parseDate('2025-01-01'); // returns new Date('2025/01/01')
parseDate('2025.01.01'); // returns new Date('2025/01/01')

parseDate('2025-01-01 09:00:00'); // returns new Date('2025/01/01 09:00:00')
parseDate('2025.01.01 18:00:00'); // returns new Date('2025/01/01 18:00:00')

// Date strings not in YYYY-MM-DD or YYYY.MM.DD format
parseDate('2025/01/01'); // returns new Date('2025/01/01') without conversion
parseDate('01/01/2025'); // returns new Date('01/01/2025') without conversion

// Date object
parseDate(new Date('2025-01-01')); // returns new Date('2025/01/01')

// Number
parseDate(1714233600000); // returns new Date(1714233600000)
```

<br />

### Invalid Date Formats

```ts title="typescript"
parseDate('invalid date'); // throws error
parseDate('2025a01a02'); // throws error
```
