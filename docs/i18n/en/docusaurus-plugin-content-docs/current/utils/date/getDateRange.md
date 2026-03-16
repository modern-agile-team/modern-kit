# getDateRange

Returns the start and end points of a specific unit for a given date.

Both local timezone and UTC are supported, returning a range that includes the start and end points for each unit.

**Supported units:**
- `year`: Local timezone — January 1, 00:00:00 ~ December 31, 23:59:59 of the given year
- `month`: Local timezone — 1st day 00:00:00 ~ last day 23:59:59 of the given month
- `week`: Local timezone — First day (Sunday) 00:00:00 ~ last day (Saturday) 23:59:59 of the given week
- `date`: Local timezone — 00:00:00 ~ 23:59:59 of the given date
- `utcYear`: UTC — January 1, 00:00:00 ~ December 31, 23:59:59 of the given year
- `utcMonth`: UTC — 1st day 00:00:00 ~ last day 23:59:59 of the given month
- `utcWeek`: UTC — First day (Sunday) 00:00:00 ~ last day (Saturday) 23:59:59 of the given week
- `utcDate`: UTC — 00:00:00 ~ 23:59:59 of the given date

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/getDateRange/index.ts)

<br />

## Interface
```ts title="typescript"
type DateRangeOfUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'date'
  | 'utcYear'
  | 'utcMonth'
  | 'utcWeek'
  | 'utcDate';

function getDateRange(
  date: string | Date | number,
  unit: DateRangeOfUnit
): { start: Date; end: Date }
```

<br />

## Usage

### Local Timezone

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z';
// 2025-03-15 23:30:45 (KST Saturday)
// 2025-03-15 14:30:45 (UTC Saturday)

// Year range - January 1, 2025 00:00:00 ~ December 31, 2025 23:59:59
const yearRange = getDateRange(targetDate, 'year');
yearRange.start.toISOString(); // '2024-12-31T15:00:00.000Z' (KST)
yearRange.start.getFullYear(); // 2025
yearRange.start.getMonth(); // 0 (January)
yearRange.start.getDate(); // 1
yearRange.start.getDay(); // 3 (Wednesday)
yearRange.start.getHours(); // 0
yearRange.start.getMinutes(); // 0
yearRange.start.getSeconds(); // 0

yearRange.end.toISOString(); // '2025-12-31T14:59:59.999Z' (KST)
yearRange.end.getFullYear(); // 2025
yearRange.end.getMonth(); // 11 (December)
yearRange.end.getDate(); // 31
yearRange.end.getDay(); // 3 (Wednesday)
yearRange.end.getHours(); // 23
yearRange.end.getMinutes(); // 59
yearRange.end.getSeconds(); // 59

// Month range - March 1, 2025 00:00:00 ~ March 31, 2025 23:59:59
const monthRange = getDateRange(targetDate, 'month');
monthRange.start.toISOString(); // '2025-02-28T15:00:00.000Z' (KST)
monthRange.start.getDate(); // 1
monthRange.start.getDay(); // 6 (Saturday)

monthRange.end.toISOString(); // '2025-03-31T14:59:59.999Z' (KST)
monthRange.end.getDate(); // 31
monthRange.end.getDay(); // 1 (Monday)

// Week range - March 9, 2025 00:00:00 ~ March 15, 2025 23:59:59
// 2025-03-15 is Saturday, so this week spans 2025-03-09 (Sun) ~ 2025-03-15 (Sat)
const weekRange = getDateRange(targetDate, 'week');
weekRange.start.toISOString(); // '2025-03-08T15:00:00.000Z' (KST)
weekRange.start.getDate(); // 9
weekRange.start.getDay(); // 0 (Sunday)

weekRange.end.toISOString(); // '2025-03-15T14:59:59.999Z' (KST)
weekRange.end.getDate(); // 15
weekRange.end.getDay(); // 6 (Saturday)

// Date range - March 15, 2025 00:00:00 ~ March 15, 2025 23:59:59
const dateRange = getDateRange(targetDate, 'date');
dateRange.start.toISOString(); // '2025-03-14T15:00:00.000Z' (KST)
dateRange.start.getDate(); // 15
dateRange.start.getHours(); // 0

dateRange.end.toISOString(); // '2025-03-15T14:59:59.999Z' (KST)
dateRange.end.getDate(); // 15
dateRange.end.getHours(); // 23
```

<br />

### UTC

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z';
// 2025-03-15 23:30:45 (KST Saturday)
// 2025-03-15 14:30:45 (UTC Saturday)

// UTC year range - January 1, 2025 00:00:00 ~ December 31, 2025 23:59:59
const utcYearRange = getDateRange(targetDate, 'utcYear');
utcYearRange.start.toISOString(); // '2025-01-01T00:00:00.000Z' (UTC)
utcYearRange.start.getUTCFullYear(); // 2025
utcYearRange.start.getUTCMonth(); // 0 (January)
utcYearRange.start.getUTCDate(); // 1
utcYearRange.start.getUTCDay(); // 3 (Wednesday)
utcYearRange.start.getUTCHours(); // 0

utcYearRange.end.toISOString(); // '2025-12-31T23:59:59.999Z' (UTC)
utcYearRange.end.getUTCFullYear(); // 2025
utcYearRange.end.getUTCMonth(); // 11 (December)
utcYearRange.end.getUTCDate(); // 31
utcYearRange.end.getUTCDay(); // 3 (Wednesday)
utcYearRange.end.getUTCHours(); // 23

// UTC month range - March 1, 2025 00:00:00 ~ March 31, 2025 23:59:59
const utcMonthRange = getDateRange(targetDate, 'utcMonth');
utcMonthRange.start.toISOString(); // '2025-03-01T00:00:00.000Z' (UTC)
utcMonthRange.start.getUTCDate(); // 1
utcMonthRange.start.getUTCDay(); // 6 (Saturday)

utcMonthRange.end.toISOString(); // '2025-03-31T23:59:59.999Z' (UTC)
utcMonthRange.end.getUTCDate(); // 31
utcMonthRange.end.getUTCDay(); // 1 (Monday)

// UTC week range - March 9, 2025 00:00:00 ~ March 15, 2025 23:59:59
const utcWeekRange = getDateRange(targetDate, 'utcWeek');
utcWeekRange.start.toISOString(); // '2025-03-09T00:00:00.000Z' (UTC)
utcWeekRange.start.getUTCDate(); // 9
utcWeekRange.start.getUTCDay(); // 0 (Sunday)

utcWeekRange.end.toISOString(); // '2025-03-15T23:59:59.999Z' (UTC)
utcWeekRange.end.getUTCDate(); // 15
utcWeekRange.end.getUTCDay(); // 6 (Saturday)

// UTC date range - March 15, 2025 00:00:00 ~ March 15, 2025 23:59:59
const utcDateRange = getDateRange(targetDate, 'utcDate');
utcDateRange.start.toISOString(); // '2025-03-15T00:00:00.000Z' (UTC)
utcDateRange.start.getUTCHours(); // 0

utcDateRange.end.toISOString(); // '2025-03-15T23:59:59.999Z' (UTC)
utcDateRange.end.getUTCHours(); // 23
```

<br />

### Week Range Calculation Examples

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

// Sunday - range from itself to Saturday
const sunday = '2025-03-09T14:30:45.123Z'; // Sunday
const sundayWeekRange = getDateRange(sunday, 'week');
sundayWeekRange.start.toISOString(); // '2025-03-08T15:00:00.000Z' (KST)
sundayWeekRange.start.getDate(); // 9
sundayWeekRange.start.getDay(); // 0 (Sunday)

sundayWeekRange.end.toISOString(); // '2025-03-15T14:59:59.999Z' (KST)
sundayWeekRange.end.getDate(); // 15
sundayWeekRange.end.getDay(); // 6 (Saturday)

// Monday - range from previous Sunday to Saturday
const monday = '2025-03-10T14:30:45.123Z'; // Monday
const mondayWeekRange = getDateRange(monday, 'week');
mondayWeekRange.start.getDate(); // 9 (previous Sunday)
mondayWeekRange.end.getDate(); // 15 (that week's Saturday)

// Saturday - range from that week's Sunday to itself
const saturday = '2025-03-15T14:30:45.123Z'; // Saturday
const saturdayWeekRange = getDateRange(saturday, 'week');
saturdayWeekRange.start.getDate(); // 9 (that week's Sunday)
saturdayWeekRange.end.getDate(); // 15 (itself)
```

<br />

### Month/Year Boundary Handling

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

// Week range from the first day of a month can go back to the previous month
const firstDayOfMonth = '2025-04-01T14:30:45.123Z'; // 2025-04-01 (Tuesday)
const weekRange = getDateRange(firstDayOfMonth, 'week');

// Start is in the previous month (2025-03-30, Sunday)
weekRange.start.getFullYear(); // 2025
weekRange.start.getMonth(); // 2 (March) - previous month
weekRange.start.getDate(); // 30
weekRange.start.getDay(); // 0 (Sunday)

// End is in the current month (2025-04-05, Saturday)
weekRange.end.getFullYear(); // 2025
weekRange.end.getMonth(); // 3 (April) - current month
weekRange.end.getDate(); // 5
weekRange.end.getDay(); // 6 (Saturday)

// Week range from the first day of a year can go back to the previous year
const firstDayOfYear = '2025-01-01T14:30:45.123Z'; // 2025-01-01 (Wednesday)
const yearWeekRange = getDateRange(firstDayOfYear, 'week');

// Start is in the previous year (2024-12-29, Sunday)
yearWeekRange.start.getFullYear(); // 2024 - previous year
yearWeekRange.start.getMonth(); // 11 (December)
yearWeekRange.start.getDate(); // 29
yearWeekRange.start.getDay(); // 0 (Sunday)

// End is in the current year (2025-01-04, Saturday)
yearWeekRange.end.getFullYear(); // 2025 - current year
yearWeekRange.end.getMonth(); // 0 (January)
yearWeekRange.end.getDate(); // 4
yearWeekRange.end.getDay(); // 6 (Saturday)
```

<br />

### Leap Year Handling

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

// February month range in a leap year
const leapYear = '2024-02-15T14:30:45.123Z'; // 2024 is a leap year
const leapYearRange = getDateRange(leapYear, 'month');
leapYearRange.start.getDate(); // 1 (2024-02-01)
leapYearRange.end.getDate(); // 29 (2024-02-29, leap year)

// February month range in a non-leap year
const normalYear = '2025-02-15T14:30:45.123Z'; // 2025 is not a leap year
const normalYearRange = getDateRange(normalYear, 'month');
normalYearRange.start.getDate(); // 1 (2025-02-01)
normalYearRange.end.getDate(); // 28 (2025-02-28, non-leap year)
```

<br />

### Practical Usage Examples

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

// Full period of this month
const thisMonth = getDateRange(new Date(), 'month');
console.log(`This month: ${thisMonth.start.toLocaleDateString()} ~ ${thisMonth.end.toLocaleDateString()}`);

// Full period of this week
const thisWeek = getDateRange(new Date(), 'week');
console.log(`This week: ${thisWeek.start.toLocaleDateString()} ~ ${thisWeek.end.toLocaleDateString()}`);

// Full period of today
const today = getDateRange(new Date(), 'date');
console.log(`Today: ${today.start.toLocaleString()} ~ ${today.end.toLocaleString()}`);
```
