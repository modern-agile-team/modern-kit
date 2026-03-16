# getDateStartOf

주어진 날짜의 특정 단위 시작점을 반환합니다.

로컬 타임존 기준과 UTC 기준 모두 지원하며, 각 단위별로 해당 시작점의 00시 00분 00초를 반환합니다.

**지원하는 단위:**
- `year`: 로컬 타임존 기준 해당 연도의 1월 1일 00시 00분 00초
- `month`: 로컬 타임존 기준 해당 월의 1일 00시 00분 00초
- `week`: 로컬 타임존 기준 해당 주의 첫날(일요일) 00시 00분 00초
- `date`: 로컬 타임존 기준 해당 날짜의 00시 00분 00초
- `utcYear`: UTC 기준 해당 연도의 1월 1일 00시 00분 00초
- `utcMonth`: UTC 기준 해당 월의 1일 00시 00분 00초
- `utcWeek`: UTC 기준 해당 주의 첫날(일요일) 00시 00분 00초
- `utcDate`: UTC 기준 해당 날짜의 00시 00분 00초

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/getDateStartOf/index.ts)

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

### 로컬 타임존 기준

```ts title="typescript"
import { getDateStartOf } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z'; 
// 2025-03-15 23:30:45 (KST 기준 토요일)
// 2025-03-15 14:30:45 (UTC 기준 토요일)

// 연도 시작점 - 2025년 1월 1일 00:00:00 (수요일)
const yearStart = getDateStartOf(targetDate, 'year');
yearStart.toISOString(); // '2024-12-31T15:00:00.000Z' (KST 기준)
yearStart.getFullYear(); // 2025
yearStart.getMonth(); // 0 (1월)
yearStart.getDate(); // 1
yearStart.getDay(); // 3 (수요일)
yearStart.getHours(); // 0
yearStart.getMinutes(); // 0
yearStart.getSeconds(); // 0
yearStart.getMilliseconds(); // 0

// 월 시작점 - 2025년 3월 1일 00:00:00 (토요일)
const monthStart = getDateStartOf(targetDate, 'month');
monthStart.toISOString(); // '2025-02-28T15:00:00.000Z' (KST 기준)
monthStart.getFullYear(); // 2025
monthStart.getMonth(); // 2 (3월)
monthStart.getDate(); // 1
monthStart.getDay(); // 6 (토요일)
monthStart.getHours(); // 0
monthStart.getMinutes(); // 0
monthStart.getSeconds(); // 0
monthStart.getMilliseconds(); // 0

// 주 시작점 - 2025년 3월 9일 00:00:00 (일요일)
// 2025-03-15는 토요일이므로, 해당 주 일요일은 2025-03-09
const weekStart = getDateStartOf(targetDate, 'week');
weekStart.toISOString(); // '2025-03-08T15:00:00.000Z' (KST 기준)
weekStart.getFullYear(); // 2025
weekStart.getMonth(); // 2 (3월)
weekStart.getDate(); // 9
weekStart.getDay(); // 0 (일요일)
weekStart.getHours(); // 0
weekStart.getMinutes(); // 0
weekStart.getSeconds(); // 0
weekStart.getMilliseconds(); // 0

// 날짜 시작점 - 2025년 3월 15일 00:00:00 (토요일)
const dateStart = getDateStartOf(targetDate, 'date');
dateStart.toISOString(); // '2025-03-14T15:00:00.000Z' (KST 기준)
dateStart.getFullYear(); // 2025
dateStart.getMonth(); // 2 (3월)
dateStart.getDate(); // 15
dateStart.getDay(); // 6 (토요일)
dateStart.getHours(); // 0
dateStart.getMinutes(); // 0
dateStart.getSeconds(); // 0
dateStart.getMilliseconds(); // 0
```

<br />

### UTC 기준

```ts title="typescript"
import { getDateStartOf } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z';
// 2025-03-15 23:30:45 (KST 기준 토요일)
// 2025-03-15 14:30:45 (UTC 기준 토요일)

// UTC 연도 시작점 - 2025년 1월 1일 00:00:00 (수요일)
const utcYearStart = getDateStartOf(targetDate, 'utcYear');
utcYearStart.toISOString(); // '2025-01-01T00:00:00.000Z' (UTC 기준)
utcYearStart.getUTCFullYear(); // 2025
utcYearStart.getUTCMonth(); // 0 (1월)
utcYearStart.getUTCDate(); // 1
utcYearStart.getUTCDay(); // 3 (수요일)
utcYearStart.getUTCHours(); // 0
utcYearStart.getUTCMinutes(); // 0
utcYearStart.getUTCSeconds(); // 0
utcYearStart.getUTCMilliseconds(); // 0

// UTC 월 시작점 - 2025년 3월 1일 00:00:00 (토요일)
const utcMonthStart = getDateStartOf(targetDate, 'utcMonth');
utcMonthStart.toISOString(); // '2025-03-01T00:00:00.000Z' (UTC 기준)
utcMonthStart.getUTCFullYear(); // 2025
utcMonthStart.getUTCMonth(); // 2 (3월)
utcMonthStart.getUTCDate(); // 1
utcMonthStart.getUTCDay(); // 6 (토요일)
utcMonthStart.getUTCHours(); // 0
utcMonthStart.getUTCMinutes(); // 0
utcMonthStart.getUTCSeconds(); // 0
utcMonthStart.getUTCMilliseconds(); // 0

// UTC 주 시작점 - 2025년 3월 9일 00:00:00 (일요일)
// 2025-03-15는 토요일이므로, 해당 주 일요일은 2025-03-09
const utcWeekStart = getDateStartOf(targetDate, 'utcWeek');
utcWeekStart.toISOString(); // '2025-03-09T00:00:00.000Z' (UTC 기준)
utcWeekStart.getUTCFullYear(); // 2025
utcWeekStart.getUTCMonth(); // 2 (3월)
utcWeekStart.getUTCDate(); // 9
utcWeekStart.getUTCDay(); // 0 (일요일)
utcWeekStart.getUTCHours(); // 0
utcWeekStart.getUTCMinutes(); // 0
utcWeekStart.getUTCSeconds(); // 0
utcWeekStart.getUTCMilliseconds(); // 0

// UTC 날짜 시작점 - 2025년 3월 15일 00:00:00 (토요일)
const utcDateStart = getDateStartOf(targetDate, 'utcDate');
utcDateStart.toISOString(); // '2025-03-15T00:00:00.000Z' (UTC 기준)
utcDateStart.getUTCFullYear(); // 2025
utcDateStart.getUTCMonth(); // 2 (3월)
utcDateStart.getUTCDate(); // 15
utcDateStart.getUTCDay(); // 6 (토요일)
utcDateStart.getUTCHours(); // 0
utcDateStart.getUTCMinutes(); // 0
utcDateStart.getUTCSeconds(); // 0
utcDateStart.getUTCMilliseconds(); // 0
```

<br />

### 주의 시작점 계산 예시

```ts title="typescript"
import { getDateStartOf } from '@modern-kit/utils';

// 일요일인 경우 - 자기 자신이 주의 시작점
const sunday = '2025-03-09T14:30:45.123Z'; // 일요일
const sundayWeekStart = getDateStartOf(sunday, 'week');
sundayWeekStart.toISOString(); // '2025-03-08T15:00:00.000Z' (KST 기준)
sundayWeekStart.getDate(); // 9
sundayWeekStart.getDay(); // 0 (일요일)

// 월요일인 경우 - 전날 일요일이 주의 시작점
const monday = '2025-03-10T14:30:45.123Z'; // 월요일
const mondayWeekStart = getDateStartOf(monday, 'week');
mondayWeekStart.toISOString(); // '2025-03-08T15:00:00.000Z' (KST 기준)
mondayWeekStart.getDate(); // 9
mondayWeekStart.getDay(); // 0 (일요일)

// 토요일인 경우 - 해당 주 일요일이 주의 시작점
const saturday = '2025-03-15T14:30:45.123Z'; // 토요일
const saturdayWeekStart = getDateStartOf(saturday, 'week');
saturdayWeekStart.toISOString(); // '2025-03-08T15:00:00.000Z' (KST 기준)
saturdayWeekStart.getDate(); // 9
saturdayWeekStart.getDay(); // 0 (일요일)
```

<br />

### 월/연 경계 처리

```ts title="typescript"
import { getDateStartOf } from '@modern-kit/utils';

// 월의 첫날에서 주의 시작점을 구할 때 이전 월로 넘어갈 수 있음
const firstDayOfMonth = '2025-04-01T14:30:45.123Z'; // 2025-04-01 (화요일)
const weekStart = getDateStartOf(firstDayOfMonth, 'week'); // 이전 월 일요일 (2025-03-30)
weekStart.toISOString(); // '2025-03-29T15:00:00.000Z' (KST 기준)
weekStart.getFullYear(); // 2025
weekStart.getMonth(); // 2 (3월) - 이전 월
weekStart.getDate(); // 30
weekStart.getDay(); // 0 (일요일)

// 연의 첫날에서 주의 시작점을 구할 때 이전 년으로 넘어갈 수 있음
const firstDayOfYear = '2025-01-01T14:30:45.123Z'; // 2025-01-01 (수요일)
const yearWeekStart = getDateStartOf(firstDayOfYear, 'week'); // 이전 년 일요일 (2024-12-29)
yearWeekStart.toISOString(); // '2024-12-28T15:00:00.000Z' (KST 기준)
yearWeekStart.getFullYear(); // 2024 - 이전 년
yearWeekStart.getMonth(); // 11 (12월)
yearWeekStart.getDate(); // 29
yearWeekStart.getDay(); // 0 (일요일)
```
