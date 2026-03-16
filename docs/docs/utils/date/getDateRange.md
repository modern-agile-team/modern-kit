# getDateRange

주어진 날짜의 특정 단위 시작점과 끝점을 반환합니다.

로컬 타임존 기준과 UTC 기준 모두 지원하며, 각 단위별로 해당 시작점과 끝점을 포함하는 범위를 반환합니다.

**지원하는 단위:**
- `year`: 로컬 타임존 기준 해당 연도의 1월 1일 00시 00분 00초 ~ 12월 31일 23시 59분 59초
- `month`: 로컬 타임존 기준 해당 월의 1일 00시 00분 00초 ~ 마지막 날 23시 59분 59초
- `week`: 로컬 타임존 기준 해당 주의 첫날(일요일) 00시 00분 00초 ~ 마지막 날(토요일) 23시 59분 59초
- `date`: 로컬 타임존 기준 해당 날짜의 00시 00분 00초 ~ 23시 59분 59초
- `utcYear`: UTC 기준 해당 연도의 1월 1일 00시 00분 00초 ~ 12월 31일 23시 59분 59초
- `utcMonth`: UTC 기준 해당 월의 1일 00시 00분 00초 ~ 마지막 날 23시 59분 59초
- `utcWeek`: UTC 기준 해당 주의 첫날(일요일) 00시 00분 00초 ~ 마지막 날(토요일) 23시 59분 59초
- `utcDate`: UTC 기준 해당 날짜의 00시 00분 00초 ~ 23시 59분 59초

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/getDateRange/index.ts)

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

### 로컬 타임존 기준

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z';
// 2025-03-15 23:30:45 (KST 기준 토요일)
// 2025-03-15 14:30:45 (UTC 기준 토요일)

// 연도 범위 - 2025년 1월 1일 00:00:00 ~ 2025년 12월 31일 23:59:59
const yearRange = getDateRange(targetDate, 'year');
yearRange.start.toISOString(); // '2024-12-31T15:00:00.000Z' (KST 기준)
yearRange.start.getFullYear(); // 2025
yearRange.start.getMonth(); // 0 (1월)
yearRange.start.getDate(); // 1
yearRange.start.getDay(); // 3 (수요일)
yearRange.start.getHours(); // 0
yearRange.start.getMinutes(); // 0
yearRange.start.getSeconds(); // 0

yearRange.end.toISOString(); // '2025-12-31T14:59:59.999Z' (KST 기준)
yearRange.end.getFullYear(); // 2025
yearRange.end.getMonth(); // 11 (12월)
yearRange.end.getDate(); // 31
yearRange.end.getDay(); // 3 (수요일)
yearRange.end.getHours(); // 23
yearRange.end.getMinutes(); // 59
yearRange.end.getSeconds(); // 59

// 월 범위 - 2025년 3월 1일 00:00:00 ~ 2025년 3월 31일 23:59:59
const monthRange = getDateRange(targetDate, 'month');
monthRange.start.toISOString(); // '2025-02-28T15:00:00.000Z' (KST 기준)
monthRange.start.getDate(); // 1
monthRange.start.getDay(); // 6 (토요일)

monthRange.end.toISOString(); // '2025-03-31T14:59:59.999Z' (KST 기준)
monthRange.end.getDate(); // 31
monthRange.end.getDay(); // 1 (월요일)

// 주 범위 - 2025년 3월 9일 00:00:00 ~ 2025년 3월 15일 23:59:59
// 2025-03-15는 토요일이므로, 해당 주는 2025-03-09(일) ~ 2025-03-15(토)
const weekRange = getDateRange(targetDate, 'week');
weekRange.start.toISOString(); // '2025-03-08T15:00:00.000Z' (KST 기준)
weekRange.start.getDate(); // 9
weekRange.start.getDay(); // 0 (일요일)

weekRange.end.toISOString(); // '2025-03-15T14:59:59.999Z' (KST 기준)
weekRange.end.getDate(); // 15
weekRange.end.getDay(); // 6 (토요일)

// 날짜 범위 - 2025년 3월 15일 00:00:00 ~ 2025년 3월 15일 23:59:59
const dateRange = getDateRange(targetDate, 'date');
dateRange.start.toISOString(); // '2025-03-14T15:00:00.000Z' (KST 기준)
dateRange.start.getDate(); // 15
dateRange.start.getHours(); // 0

dateRange.end.toISOString(); // '2025-03-15T14:59:59.999Z' (KST 기준)
dateRange.end.getDate(); // 15
dateRange.end.getHours(); // 23
```

<br />

### UTC 기준

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z';
// 2025-03-15 23:30:45 (KST 기준 토요일)
// 2025-03-15 14:30:45 (UTC 기준 토요일)

// UTC 연도 범위 - 2025년 1월 1일 00:00:00 ~ 2025년 12월 31일 23:59:59
const utcYearRange = getDateRange(targetDate, 'utcYear');
utcYearRange.start.toISOString(); // '2025-01-01T00:00:00.000Z' (UTC 기준)
utcYearRange.start.getUTCFullYear(); // 2025
utcYearRange.start.getUTCMonth(); // 0 (1월)
utcYearRange.start.getUTCDate(); // 1
utcYearRange.start.getUTCDay(); // 3 (수요일)
utcYearRange.start.getUTCHours(); // 0

utcYearRange.end.toISOString(); // '2025-12-31T23:59:59.999Z' (UTC 기준)
utcYearRange.end.getUTCFullYear(); // 2025
utcYearRange.end.getUTCMonth(); // 11 (12월)
utcYearRange.end.getUTCDate(); // 31
utcYearRange.end.getUTCDay(); // 3 (수요일)
utcYearRange.end.getUTCHours(); // 23

// UTC 월 범위 - 2025년 3월 1일 00:00:00 ~ 2025년 3월 31일 23:59:59
const utcMonthRange = getDateRange(targetDate, 'utcMonth');
utcMonthRange.start.toISOString(); // '2025-03-01T00:00:00.000Z' (UTC 기준)
utcMonthRange.start.getUTCDate(); // 1
utcMonthRange.start.getUTCDay(); // 6 (토요일)

utcMonthRange.end.toISOString(); // '2025-03-31T23:59:59.999Z' (UTC 기준)
utcMonthRange.end.getUTCDate(); // 31
utcMonthRange.end.getUTCDay(); // 1 (월요일)

// UTC 주 범위 - 2025년 3월 9일 00:00:00 ~ 2025년 3월 15일 23:59:59
const utcWeekRange = getDateRange(targetDate, 'utcWeek');
utcWeekRange.start.toISOString(); // '2025-03-09T00:00:00.000Z' (UTC 기준)
utcWeekRange.start.getUTCDate(); // 9
utcWeekRange.start.getUTCDay(); // 0 (일요일)

utcWeekRange.end.toISOString(); // '2025-03-15T23:59:59.999Z' (UTC 기준)
utcWeekRange.end.getUTCDate(); // 15
utcWeekRange.end.getUTCDay(); // 6 (토요일)

// UTC 날짜 범위 - 2025년 3월 15일 00:00:00 ~ 2025년 3월 15일 23:59:59
const utcDateRange = getDateRange(targetDate, 'utcDate');
utcDateRange.start.toISOString(); // '2025-03-15T00:00:00.000Z' (UTC 기준)
utcDateRange.start.getUTCHours(); // 0

utcDateRange.end.toISOString(); // '2025-03-15T23:59:59.999Z' (UTC 기준)
utcDateRange.end.getUTCHours(); // 23
```

<br />

### 주의 범위 계산 예시

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

// 일요일인 경우 - 자기 자신부터 토요일까지의 범위
const sunday = '2025-03-09T14:30:45.123Z'; // 일요일
const sundayWeekRange = getDateRange(sunday, 'week');
sundayWeekRange.start.toISOString(); // '2025-03-08T15:00:00.000Z' (KST 기준)
sundayWeekRange.start.getDate(); // 9
sundayWeekRange.start.getDay(); // 0 (일요일)

sundayWeekRange.end.toISOString(); // '2025-03-15T14:59:59.999Z' (KST 기준)
sundayWeekRange.end.getDate(); // 15
sundayWeekRange.end.getDay(); // 6 (토요일)

// 월요일인 경우 - 이전 일요일부터 토요일까지의 범위
const monday = '2025-03-10T14:30:45.123Z'; // 월요일
const mondayWeekRange = getDateRange(monday, 'week');
mondayWeekRange.start.getDate(); // 9 (이전 일요일)
mondayWeekRange.end.getDate(); // 15 (해당 주 토요일)

// 토요일인 경우 - 해당 주 일요일부터 자기 자신까지의 범위
const saturday = '2025-03-15T14:30:45.123Z'; // 토요일
const saturdayWeekRange = getDateRange(saturday, 'week');
saturdayWeekRange.start.getDate(); // 9 (해당 주 일요일)
saturdayWeekRange.end.getDate(); // 15 (자기 자신)
```

<br />

### 월/연 경계 처리

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

// 월의 첫날에서 주 범위를 구할 때 이전 월로 넘어갈 수 있음
const firstDayOfMonth = '2025-04-01T14:30:45.123Z'; // 2025-04-01 (화요일)
const weekRange = getDateRange(firstDayOfMonth, 'week');

// 시작점은 이전 월 일요일 (2025-03-30)
weekRange.start.getFullYear(); // 2025
weekRange.start.getMonth(); // 2 (3월) - 이전 월
weekRange.start.getDate(); // 30
weekRange.start.getDay(); // 0 (일요일)

// 끝점은 현재 월 토요일 (2025-04-05)
weekRange.end.getFullYear(); // 2025
weekRange.end.getMonth(); // 3 (4월) - 현재 월
weekRange.end.getDate(); // 5
weekRange.end.getDay(); // 6 (토요일)

// 연의 첫날에서 주 범위를 구할 때 이전 년으로 넘어갈 수 있음
const firstDayOfYear = '2025-01-01T14:30:45.123Z'; // 2025-01-01 (수요일)
const yearWeekRange = getDateRange(firstDayOfYear, 'week');

// 시작점은 이전 년 일요일 (2024-12-29)
yearWeekRange.start.getFullYear(); // 2024 - 이전 년
yearWeekRange.start.getMonth(); // 11 (12월)
yearWeekRange.start.getDate(); // 29
yearWeekRange.start.getDay(); // 0 (일요일)

// 끝점은 현재 년 토요일 (2025-01-04)
yearWeekRange.end.getFullYear(); // 2025 - 현재 년
yearWeekRange.end.getMonth(); // 0 (1월)
yearWeekRange.end.getDate(); // 4
yearWeekRange.end.getDay(); // 6 (토요일)
```

<br />

### 윤년 처리

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

// 윤년의 2월 월 범위 처리
const leapYear = '2024-02-15T14:30:45.123Z'; // 2024년은 윤년
const leapYearRange = getDateRange(leapYear, 'month');
leapYearRange.start.getDate(); // 1 (2024-02-01)
leapYearRange.end.getDate(); // 29 (2024-02-29, 윤년)

// 평년의 2월 월 범위 처리
const normalYear = '2025-02-15T14:30:45.123Z'; // 2025년은 평년
const normalYearRange = getDateRange(normalYear, 'month');
normalYearRange.start.getDate(); // 1 (2025-02-01)
normalYearRange.end.getDate(); // 28 (2025-02-28, 평년)
```

<br />

### 실용적인 사용 예시

```ts title="typescript"
import { getDateRange } from '@modern-kit/utils';

// 이번 달 전체 기간
const thisMonth = getDateRange(new Date(), 'month');
console.log(`이번 달: ${thisMonth.start.toLocaleDateString()} ~ ${thisMonth.end.toLocaleDateString()}`);

// 이번 주 전체 기간
const thisWeek = getDateRange(new Date(), 'week');
console.log(`이번 주: ${thisWeek.start.toLocaleDateString()} ~ ${thisWeek.end.toLocaleDateString()}`);

// 오늘 하루 전체 기간
const today = getDateRange(new Date(), 'date');
console.log(`오늘: ${today.start.toLocaleString()} ~ ${today.end.toLocaleString()}`);
```
