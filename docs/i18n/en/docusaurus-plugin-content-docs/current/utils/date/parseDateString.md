# parseDateString

Parses a date string and normalizes the separator to a `slash (/)`.

Used to ensure compatibility with `Safari`, which does not support date formats containing `"-"` or `"."`.

Handles `YYYY-MM-DD`, `YYYY-MM-DD HH:MM:SS`, `YYYY.MM.DD`, and `YYYY.MM.DD HH:MM:SS` formats. All other formats are returned as-is.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/parseDateString/index.ts)

<br />

## Interface
```ts title="typescript"
const parseDateString: (date: string) => Date
```

<br />

## Usage

### Valid Date Formats

```ts title="typescript"
import { parseDateString } from '@modern-kit/utils';

// The following formats are converted to slash-separated normalized date strings.
parseDateString('2025-01-01'); // '2025/01/01'
parseDateString('2025.01.01'); // '2025/01/01'
parseDateString('2025-01-01 09:00:00'); // '2025/01/01 09:00:00'
parseDateString('2025.01.01 18:00:00'); // '2025/01/01 18:00:00'

// Returned as-is
parseDateString('2025/01/01'); // '2025/01/01'
parseDateString('01/01/2025'); // '01/01/2025'
parseDateString('2025-01-01T13:45:00'); // '2025-01-01T13:45:00'
parseDateString('2025-01-01T13:45:00Z'); // '2025-01-01T13:45:00Z'
```
