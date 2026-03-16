# getDateStartOf

Returns the start point of a specific unit for a given date.

Both local timezone and UTC are supported, returning 00:00:00 of the start point for each unit.

**Supported units:**
- `year`: January 1, 00:00:00 of the given year in local timezone
- `month`: 1st day, 00:00:00 of the given month in local timezone
- `week`: First day (Sunday), 00:00:00 of the given week in local timezone
- `date`: 00:00:00 of the given date in local timezone
- `utcYear`: January 1, 00:00:00 of the given year in UTC
- `utcMonth`: 1st day, 00:00:00 of the given month in UTC
- `utcWeek`: First day (Sunday), 00:00:00 of the given week in UTC
- `utcDate`: 00:00:00 of the given date in UTC

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/getDateStartOf/index.ts)

<br />

## Interface
```ts title="typescript"
type DateStartOfUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'date'
  | 'utcYear'
  | 'utcMonth'
  | 'utcWeek'
  | 'utcDate';

function getDateStartOf(
  date: string | Date | number,
  unit: DateStartOfUnit
): Date
```

<br />

## Usage

### Local Timezone

```ts title="typescript"
import { getDateStartOf } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z';
// 2025-03-15 23:30:45 (KST Saturday)
// 2025-03-15 14:30:45 (UTC Saturday)

// Year start - January 1, 2025 00:00:00 (Wednesday)
const yearStart = getDateStartOf(targetDate, 'year');
yearStart.toISOString(); // '2024-12-31T15:00:00.000Z' (KST)
yearStart.getFullYear(); // 2025
yearStart.getMonth(); // 0 (January)
yearStart.getDate(); // 1
yearStart.getDay(); // 3 (Wednesday)
yearStart.getHours(); // 0
yearStart.getMinutes(); // 0
yearStart.getSeconds(); // 0
yearStart.getMilliseconds(); // 0

// Month start - March 1, 2025 00:00:00 (Saturday)
const monthStart = getDateStartOf(targetDate, 'month');
monthStart.toISOString(); // '2025-02-28T15:00:00.000Z' (KST)
monthStart.getFullYear(); // 2025
monthStart.getMonth(); // 2 (March)
monthStart.getDate(); // 1
monthStart.getDay(); // 6 (Saturday)
monthStart.getHours(); // 0
monthStart.getMinutes(); // 0
monthStart.getSeconds(); // 0
monthStart.getMilliseconds(); // 0

// Week start - March 9, 2025 00:00:00 (Sunday)
// 2025-03-15 is Saturday, so the Sunday of that week is 2025-03-09
const weekStart = getDateStartOf(targetDate, 'week');
weekStart.toISOString(); // '2025-03-08T15:00:00.000Z' (KST)
weekStart.getFullYear(); // 2025
weekStart.getMonth(); // 2 (March)
weekStart.getDate(); // 9
weekStart.getDay(); // 0 (Sunday)
weekStart.getHours(); // 0
weekStart.getMinutes(); // 0
weekStart.getSeconds(); // 0
weekStart.getMilliseconds(); // 0

// Date start - March 15, 2025 00:00:00 (Saturday)
const dateStart = getDateStartOf(targetDate, 'date');
dateStart.toISOString(); // '2025-03-14T15:00:00.000Z' (KST)
dateStart.getFullYear(); // 2025
dateStart.getMonth(); // 2 (March)
dateStart.getDate(); // 15
dateStart.getDay(); // 6 (Saturday)
dateStart.getHours(); // 0
dateStart.getMinutes(); // 0
dateStart.getSeconds(); // 0
dateStart.getMilliseconds(); // 0
```

<br />

### UTC

```ts title="typescript"
import { getDateStartOf } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z';
// 2025-03-15 23:30:45 (KST Saturday)
// 2025-03-15 14:30:45 (UTC Saturday)

// UTC year start - January 1, 2025 00:00:00 (Wednesday)
const utcYearStart = getDateStartOf(targetDate, 'utcYear');
utcYearStart.toISOString(); // '2025-01-01T00:00:00.000Z' (UTC)
utcYearStart.getUTCFullYear(); // 2025
utcYearStart.getUTCMonth(); // 0 (January)
utcYearStart.getUTCDate(); // 1
utcYearStart.getUTCDay(); // 3 (Wednesday)
utcYearStart.getUTCHours(); // 0
utcYearStart.getUTCMinutes(); // 0
utcYearStart.getUTCSeconds(); // 0
utcYearStart.getUTCMilliseconds(); // 0

// UTC month start - March 1, 2025 00:00:00 (Saturday)
const utcMonthStart = getDateStartOf(targetDate, 'utcMonth');
utcMonthStart.toISOString(); // '2025-03-01T00:00:00.000Z' (UTC)
utcMonthStart.getUTCFullYear(); // 2025
utcMonthStart.getUTCMonth(); // 2 (March)
utcMonthStart.getUTCDate(); // 1
utcMonthStart.getUTCDay(); // 6 (Saturday)
utcMonthStart.getUTCHours(); // 0
utcMonthStart.getUTCMinutes(); // 0
utcMonthStart.getUTCSeconds(); // 0
utcMonthStart.getUTCMilliseconds(); // 0

// UTC week start - March 9, 2025 00:00:00 (Sunday)
// 2025-03-15 is Saturday, so the Sunday of that week is 2025-03-09
const utcWeekStart = getDateStartOf(targetDate, 'utcWeek');
utcWeekStart.toISOString(); // '2025-03-09T00:00:00.000Z' (UTC)
utcWeekStart.getUTCFullYear(); // 2025
utcWeekStart.getUTCMonth(); // 2 (March)
utcWeekStart.getUTCDate(); // 9
utcWeekStart.getUTCDay(); // 0 (Sunday)
utcWeekStart.getUTCHours(); // 0
utcWeekStart.getUTCMinutes(); // 0
utcWeekStart.getUTCSeconds(); // 0
utcWeekStart.getUTCMilliseconds(); // 0

// UTC date start - March 15, 2025 00:00:00 (Saturday)
const utcDateStart = getDateStartOf(targetDate, 'utcDate');
utcDateStart.toISOString(); // '2025-03-15T00:00:00.000Z' (UTC)
utcDateStart.getUTCFullYear(); // 2025
utcDateStart.getUTCMonth(); // 2 (March)
utcDateStart.getUTCDate(); // 15
utcDateStart.getUTCDay(); // 6 (Saturday)
utcDateStart.getUTCHours(); // 0
utcDateStart.getUTCMinutes(); // 0
utcDateStart.getUTCSeconds(); // 0
utcDateStart.getUTCMilliseconds(); // 0
```

<br />

### Week Start Point Calculation Examples

```ts title="typescript"
import { getDateStartOf } from '@modern-kit/utils';

// Sunday - itself is the start of the week
const sunday = '2025-03-09T14:30:45.123Z'; // Sunday
const sundayWeekStart = getDateStartOf(sunday, 'week');
sundayWeekStart.toISOString(); // '2025-03-08T15:00:00.000Z' (KST)
sundayWeekStart.getDate(); // 9
sundayWeekStart.getDay(); // 0 (Sunday)

// Monday - the previous Sunday is the start of the week
const monday = '2025-03-10T14:30:45.123Z'; // Monday
const mondayWeekStart = getDateStartOf(monday, 'week');
mondayWeekStart.toISOString(); // '2025-03-08T15:00:00.000Z' (KST)
mondayWeekStart.getDate(); // 9
mondayWeekStart.getDay(); // 0 (Sunday)

// Saturday - that week's Sunday is the start of the week
const saturday = '2025-03-15T14:30:45.123Z'; // Saturday
const saturdayWeekStart = getDateStartOf(saturday, 'week');
saturdayWeekStart.toISOString(); // '2025-03-08T15:00:00.000Z' (KST)
saturdayWeekStart.getDate(); // 9
saturdayWeekStart.getDay(); // 0 (Sunday)
```

<br />

### Month/Year Boundary Handling

```ts title="typescript"
import { getDateStartOf } from '@modern-kit/utils';

// Week start from the first day of a month can go back to the previous month
const firstDayOfMonth = '2025-04-01T14:30:45.123Z'; // 2025-04-01 (Tuesday)
const weekStart = getDateStartOf(firstDayOfMonth, 'week'); // Previous month's Sunday (2025-03-30)
weekStart.toISOString(); // '2025-03-29T15:00:00.000Z' (KST)
weekStart.getFullYear(); // 2025
weekStart.getMonth(); // 2 (March) - previous month
weekStart.getDate(); // 30
weekStart.getDay(); // 0 (Sunday)

// Week start from the first day of a year can go back to the previous year
const firstDayOfYear = '2025-01-01T14:30:45.123Z'; // 2025-01-01 (Wednesday)
const yearWeekStart = getDateStartOf(firstDayOfYear, 'week'); // Previous year's Sunday (2024-12-29)
yearWeekStart.toISOString(); // '2024-12-28T15:00:00.000Z' (KST)
yearWeekStart.getFullYear(); // 2024 - previous year
yearWeekStart.getMonth(); // 11 (December)
yearWeekStart.getDate(); // 29
yearWeekStart.getDay(); // 0 (Sunday)
```
