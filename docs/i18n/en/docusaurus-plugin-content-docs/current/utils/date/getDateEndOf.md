# getDateEndOf

Returns the end point of a specific unit for a given date.

Both local timezone and UTC are supported, returning 23:59:59 of the end point for each unit.

**Supported units:**
- `year`: December 31, 23:59:59 of the given year in local timezone
- `month`: Last day of the given month, 23:59:59 in local timezone
- `week`: Last day of the given week (Saturday), 23:59:59 in local timezone
- `date`: 23:59:59 of the given date in local timezone
- `utcYear`: December 31, 23:59:59 of the given year in UTC
- `utcMonth`: Last day of the given month, 23:59:59 in UTC
- `utcWeek`: Last day of the given week (Saturday), 23:59:59 in UTC
- `utcDate`: 23:59:59 of the given date in UTC

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/getDateEndOf/index.ts)

<br />

## Interface
```ts title="typescript"
type DateEndOfUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'date'
  | 'utcYear'
  | 'utcMonth'
  | 'utcWeek'
  | 'utcDate';

function getDateEndOf(
  date: string | Date | number,
  unit: DateEndOfUnit
): Date
```

<br />

## Usage

### Local Timezone

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z'; // 2025-03-15 14:30:45 (Saturday)

// Year end - December 31, 2025 23:59:59.999 (Wednesday)
const yearEnd = getDateEndOf(targetDate, 'year');
yearEnd.toISOString(); // '2025-12-31T14:59:59.999Z' (KST)
yearEnd.getFullYear(); // 2025
yearEnd.getMonth(); // 11 (December)
yearEnd.getDate(); // 31
yearEnd.getDay(); // 3 (Wednesday)
yearEnd.getHours(); // 23
yearEnd.getMinutes(); // 59
yearEnd.getSeconds(); // 59
yearEnd.getMilliseconds(); // 999

// Month end - March 31, 2025 23:59:59.999 (Monday)
const monthEnd = getDateEndOf(targetDate, 'month');
monthEnd.toISOString(); // '2025-03-31T14:59:59.999Z' (KST)
monthEnd.getFullYear(); // 2025
monthEnd.getMonth(); // 2 (March)
monthEnd.getDate(); // 31
monthEnd.getDay(); // 1 (Monday)
monthEnd.getHours(); // 23
monthEnd.getMinutes(); // 59
monthEnd.getSeconds(); // 59
monthEnd.getMilliseconds(); // 999

// Week end - March 15, 2025 23:59:59.999 (Saturday)
// 2025-03-15 is Saturday, so the Saturday of that week is itself
const weekEnd = getDateEndOf(targetDate, 'week');
weekEnd.toISOString(); // '2025-03-15T14:59:59.999Z' (KST)
weekEnd.getFullYear(); // 2025
weekEnd.getMonth(); // 2 (March)
weekEnd.getDate(); // 15
weekEnd.getDay(); // 6 (Saturday)
weekEnd.getHours(); // 23
weekEnd.getMinutes(); // 59
weekEnd.getSeconds(); // 59
weekEnd.getMilliseconds(); // 999

// Date end - March 15, 2025 23:59:59.999 (Saturday)
const dateEnd = getDateEndOf(targetDate, 'date');
dateEnd.toISOString(); // '2025-03-15T14:59:59.999Z' (KST)
dateEnd.getFullYear(); // 2025
dateEnd.getMonth(); // 2 (March)
dateEnd.getDate(); // 15
dateEnd.getDay(); // 6 (Saturday)
dateEnd.getHours(); // 23
dateEnd.getMinutes(); // 59
dateEnd.getSeconds(); // 59
dateEnd.getMilliseconds(); // 999
```

<br />

### UTC

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z';
// 2025-03-15 23:30:45 (KST Saturday)
// 2025-03-15 14:30:45 (UTC Saturday)

// UTC year end - December 31, 2025 23:59:59.999 (Wednesday)
const utcYearEnd = getDateEndOf(targetDate, 'utcYear');
utcYearEnd.toISOString(); // '2025-12-31T23:59:59.999Z' (UTC)
utcYearEnd.getUTCFullYear(); // 2025
utcYearEnd.getUTCMonth(); // 11 (December)
utcYearEnd.getUTCDate(); // 31
utcYearEnd.getUTCDay(); // 3 (Wednesday)
utcYearEnd.getUTCHours(); // 23
utcYearEnd.getUTCMinutes(); // 59
utcYearEnd.getUTCSeconds(); // 59
utcYearEnd.getUTCMilliseconds(); // 999

// UTC month end - March 31, 2025 23:59:59.999 (Monday)
const utcMonthEnd = getDateEndOf(targetDate, 'utcMonth');
utcMonthEnd.toISOString(); // '2025-03-31T23:59:59.999Z' (UTC)
utcMonthEnd.getUTCFullYear(); // 2025
utcMonthEnd.getUTCMonth(); // 2 (March)
utcMonthEnd.getUTCDate(); // 31
utcMonthEnd.getUTCDay(); // 1 (Monday)
utcMonthEnd.getUTCHours(); // 23
utcMonthEnd.getUTCMinutes(); // 59
utcMonthEnd.getUTCSeconds(); // 59
utcMonthEnd.getUTCMilliseconds(); // 999

// UTC week end - March 15, 2025 23:59:59.999 (Saturday)
// 2025-03-15 is Saturday, so the Saturday of that week is itself
const utcWeekEnd = getDateEndOf(targetDate, 'utcWeek');
utcWeekEnd.toISOString(); // '2025-03-15T23:59:59.999Z' (UTC)
utcWeekEnd.getUTCFullYear(); // 2025
utcWeekEnd.getUTCMonth(); // 2 (March)
utcWeekEnd.getUTCDate(); // 15
utcWeekEnd.getUTCDay(); // 6 (Saturday)
utcWeekEnd.getUTCHours(); // 23
utcWeekEnd.getUTCMinutes(); // 59
utcWeekEnd.getUTCSeconds(); // 59
utcWeekEnd.getUTCMilliseconds(); // 999

// UTC date end - March 15, 2025 23:59:59.999 (Saturday)
const utcDateEnd = getDateEndOf(targetDate, 'utcDate');
utcDateEnd.toISOString(); // '2025-03-15T23:59:59.999Z' (UTC)
utcDateEnd.getUTCFullYear(); // 2025
utcDateEnd.getUTCMonth(); // 2 (March)
utcDateEnd.getUTCDate(); // 15
utcDateEnd.getUTCDay(); // 6 (Saturday)
utcDateEnd.getUTCHours(); // 23
utcDateEnd.getUTCMinutes(); // 59
utcDateEnd.getUTCSeconds(); // 59
utcDateEnd.getUTCMilliseconds(); // 999
```

<br />

### Various Input Types

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

// Date object
const dateObj = new Date('2025-03-15T14:30:45.123Z');
const result1 = getDateEndOf(dateObj, 'date');

// Timestamp (number)
const timestamp = new Date('2025-03-15T14:30:45.123Z').getTime();
const result2 = getDateEndOf(timestamp, 'date');

// Hyphen-separated date string
const result3 = getDateEndOf('2025-03-15', 'date');

// Dot-separated date string
const result4 = getDateEndOf('2025.03.15', 'date');
```

<br />

### Week End Point Calculation Examples

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

// Sunday - the Saturday of that week is the end point
const sunday = '2025-03-09T14:30:45.123Z'; // Sunday
const sundayWeekEnd = getDateEndOf(sunday, 'week');
sundayWeekEnd.toISOString(); // '2025-03-15T14:59:59.999Z' (KST)
sundayWeekEnd.getDate(); // 15
sundayWeekEnd.getDay(); // 6 (Saturday)

// Monday - the Saturday of that week is the end point
const monday = '2025-03-10T14:30:45.123Z'; // Monday
const mondayWeekEnd = getDateEndOf(monday, 'week');
mondayWeekEnd.toISOString(); // '2025-03-15T14:59:59.999Z' (KST)
mondayWeekEnd.getDate(); // 15
mondayWeekEnd.getDay(); // 6 (Saturday)

// Saturday - itself is the end point
const saturday = '2025-03-15T14:30:45.123Z'; // Saturday
const saturdayWeekEnd = getDateEndOf(saturday, 'week');
saturdayWeekEnd.toISOString(); // '2025-03-15T14:59:59.999Z' (KST)
saturdayWeekEnd.getDate(); // 15
saturdayWeekEnd.getDay(); // 6 (Saturday)
```

<br />

### Month/Year Boundary Handling

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

// The week end from the last day of a month can overflow to the next month
const lastDayOfMonth = '2025-03-30T14:30:45.123Z'; // 2025-03-30 (Sunday)
const weekEnd = getDateEndOf(lastDayOfMonth, 'week'); // Next month's Saturday (2025-04-05)
weekEnd.toISOString(); // '2025-04-05T14:59:59.999Z' (KST)
weekEnd.getFullYear(); // 2025
weekEnd.getMonth(); // 3 (April) - next month
weekEnd.getDate(); // 5
weekEnd.getDay(); // 6 (Saturday)

// The week end from the last day of a year can overflow to the next year
const lastDayOfYear = '2024-12-29T14:30:45.123Z'; // 2024-12-29 (Sunday)
const yearWeekEnd = getDateEndOf(lastDayOfYear, 'week'); // Next year's Saturday (2025-01-04)
yearWeekEnd.toISOString(); // '2025-01-04T14:59:59.999Z' (KST)
yearWeekEnd.getFullYear(); // 2025 - next year
yearWeekEnd.getMonth(); // 0 (January)
yearWeekEnd.getDate(); // 4
yearWeekEnd.getDay(); // 6 (Saturday)
```

<br />

### Leap Year Handling

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

// Last day of February in a leap year
const leapYear = '2024-02-15T14:30:45.123Z'; // 2024 is a leap year
const leapYearEnd = getDateEndOf(leapYear, 'month'); // 2024-02-29 23:59:59.999
leapYearEnd.toISOString(); // '2024-02-29T14:59:59.999Z' (KST)
leapYearEnd.getDate(); // 29

// Last day of February in a non-leap year
const normalYear = '2025-02-15T14:30:45.123Z'; // 2025 is not a leap year
const normalYearEnd = getDateEndOf(normalYear, 'month'); // 2025-02-28 23:59:59.999
normalYearEnd.toISOString(); // '2025-02-28T14:59:59.999Z' (KST)
normalYearEnd.getDate(); // 28
```
