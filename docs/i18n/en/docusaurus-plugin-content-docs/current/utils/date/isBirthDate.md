# isBirthDate

Validates whether an input birth date string is in a correct `6-digit` or `8-digit` format, and whether the date actually exists (considering month/day ranges and leap years).

The input accepts the following formats:

- **Without separator:** `"YYYYMMDD"`, `"YYMMDD"`
- **With separator:** `"YY-MM-DD"`, `"YYYY-MM-DD"`, `"YY.MM.DD"`, `"YYYY.MM.DD"`, `"YY/MM/DD"`, `"YYYY/MM/DD"`

Only hyphen (`-`), dot (`.`), or slash (`/`) are accepted as separators. Invalid formats or non-existent dates (e.g., February 30) return `false`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/isBirthDate/index.ts)

<br />

## Interface

```ts title="typescript"
function isBirthDate(birthDate: string): boolean;
```

<br />

## Usage

### Without Separator

```ts title="typescript"
import { isBirthDate } from '@modern-kit/utils';

isBirthDate("950913");    // true
isBirthDate("19950913");  // true
```

<br />

### With Separator

```ts title="typescript"
import { isBirthDate } from '@modern-kit/utils';

isBirthDate("95-09-13");   // true
isBirthDate("1995-09-13");  // true

isBirthDate("95.09.13");   // true
isBirthDate("1995.09.13");  // true

isBirthDate("95/09/13");   // true
isBirthDate("1995/09/13");  // true
```

<br />

### Invalid Inputs

```ts title="typescript"
import { isBirthDate } from '@modern-kit/utils';

isBirthDate("1995&09&13"); // false, '&' separator is not allowed
isBirthDate("199-509-13");  // false, separator is not in the correct position
isBirthDate("1995-9-13");   // false, month or day must be 2 digits
isBirthDate("19950230");    // false, date does not exist (e.g., February 30)
```

<br />

### Additional Examples

```ts title="typescript"
import { isBirthDate } from '@modern-kit/utils';

// Empty string or incorrect number of digits
isBirthDate("");          // false
isBirthDate("1234567");   // false (7 digits)
isBirthDate("123456789"); // false (9 digits)

// Leap year check
isBirthDate("20000229"); // true, 2000 is a leap year
isBirthDate("19000229"); // false, 1900 is not a leap year

// Month or day is "00"
isBirthDate("19950013"); // false, month 00
isBirthDate("19950900"); // false, day 00

// Leading or trailing whitespace (not trimmed)
isBirthDate(" 19950913"); // false
isBirthDate("19950913 "); // false
```
