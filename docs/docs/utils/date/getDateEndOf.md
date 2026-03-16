# getDateEndOf

주어진 날짜의 특정 단위 끝점을 반환합니다.

로컬 타임존 기준과 UTC 기준 모두 지원하며, 각 단위별로 해당 끝점의 23시 59분 59초를 반환합니다.

**지원하는 단위:**
- `year`: 로컬 타임존 기준 해당 연도의 12월 31일 23시 59분 59초
- `month`: 로컬 타임존 기준 해당 월의 마지막 날 23시 59분 59초
- `week`: 로컬 타임존 기준 해당 주의 마지막 날(토요일) 23시 59분 59초
- `date`: 로컬 타임존 기준 해당 날짜의 23시 59분 59초
- `utcYear`: UTC 기준 해당 연도의 12월 31일 23시 59분 59초
- `utcMonth`: UTC 기준 해당 월의 마지막 날 23시 59분 59초
- `utcWeek`: UTC 기준 해당 주의 마지막 날(토요일) 23시 59분 59초
- `utcDate`: UTC 기준 해당 날짜의 23시 59분 59초

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/getDateEndOf/index.ts)

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

### 로컬 타임존 기준

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z'; // 2025-03-15 14:30:45 (토요일)

// 연도 끝점 - 2025년 12월 31일 23:59:59.999 (수요일)
const yearEnd = getDateEndOf(targetDate, 'year');
yearEnd.toISOString(); // '2025-12-31T14:59:59.999Z' (KST 기준)
yearEnd.getFullYear(); // 2025
yearEnd.getMonth(); // 11 (12월)
yearEnd.getDate(); // 31
yearEnd.getDay(); // 3 (수요일)
yearEnd.getHours(); // 23
yearEnd.getMinutes(); // 59
yearEnd.getSeconds(); // 59
yearEnd.getMilliseconds(); // 999

// 월 끝점 - 2025년 3월 31일 23:59:59.999 (월요일)
const monthEnd = getDateEndOf(targetDate, 'month');
monthEnd.toISOString(); // '2025-03-31T14:59:59.999Z' (KST 기준)
monthEnd.getFullYear(); // 2025
monthEnd.getMonth(); // 2 (3월)
monthEnd.getDate(); // 31
monthEnd.getDay(); // 1 (월요일)
monthEnd.getHours(); // 23
monthEnd.getMinutes(); // 59
monthEnd.getSeconds(); // 59
monthEnd.getMilliseconds(); // 999

// 주 끝점 - 2025년 3월 15일 23:59:59.999 (토요일)
// 2025-03-15는 토요일이므로, 해당 주 토요일은 자기 자신
const weekEnd = getDateEndOf(targetDate, 'week');
weekEnd.toISOString(); // '2025-03-15T14:59:59.999Z' (KST 기준)
weekEnd.getFullYear(); // 2025
weekEnd.getMonth(); // 2 (3월)
weekEnd.getDate(); // 15
weekEnd.getDay(); // 6 (토요일)
weekEnd.getHours(); // 23
weekEnd.getMinutes(); // 59
weekEnd.getSeconds(); // 59
weekEnd.getMilliseconds(); // 999

// 날짜 끝점 - 2025년 3월 15일 23:59:59.999 (토요일)
const dateEnd = getDateEndOf(targetDate, 'date');
dateEnd.toISOString(); // '2025-03-15T14:59:59.999Z' (KST 기준)
dateEnd.getFullYear(); // 2025
dateEnd.getMonth(); // 2 (3월)
dateEnd.getDate(); // 15
dateEnd.getDay(); // 6 (토요일)
dateEnd.getHours(); // 23
dateEnd.getMinutes(); // 59
dateEnd.getSeconds(); // 59
dateEnd.getMilliseconds(); // 999
```

### UTC 기준

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

const targetDate = '2025-03-15T14:30:45.123Z';
// 2025-03-15 23:30:45 (KST 기준 토요일)
// 2025-03-15 14:30:45 (UTC 기준 토요일)

// UTC 연도 끝점 - 2025년 12월 31일 23:59:59.999 (수요일)
const utcYearEnd = getDateEndOf(targetDate, 'utcYear');
utcYearEnd.toISOString(); // '2025-12-31T23:59:59.999Z' (UTC 기준)
utcYearEnd.getUTCFullYear(); // 2025
utcYearEnd.getUTCMonth(); // 11 (12월)
utcYearEnd.getUTCDate(); // 31
utcYearEnd.getUTCDay(); // 3 (수요일)
utcYearEnd.getUTCHours(); // 23
utcYearEnd.getUTCMinutes(); // 59
utcYearEnd.getUTCSeconds(); // 59
utcYearEnd.getUTCMilliseconds(); // 999

// UTC 월 끝점 - 2025년 3월 31일 23:59:59.999 (월요일)
const utcMonthEnd = getDateEndOf(targetDate, 'utcMonth');
utcMonthEnd.toISOString(); // '2025-03-31T23:59:59.999Z' (UTC 기준)
utcMonthEnd.getUTCFullYear(); // 2025
utcMonthEnd.getUTCMonth(); // 2 (3월)
utcMonthEnd.getUTCDate(); // 31
utcMonthEnd.getUTCDay(); // 1 (월요일)
utcMonthEnd.getUTCHours(); // 23
utcMonthEnd.getUTCMinutes(); // 59
utcMonthEnd.getUTCSeconds(); // 59
utcMonthEnd.getUTCMilliseconds(); // 999

// UTC 주 끝점 - 2025년 3월 15일 23:59:59.999 (토요일)
// 2025-03-15는 토요일이므로, 해당 주 토요일은 자기 자신
const utcWeekEnd = getDateEndOf(targetDate, 'utcWeek');
utcWeekEnd.toISOString(); // '2025-03-15T23:59:59.999Z' (UTC 기준)
utcWeekEnd.getUTCFullYear(); // 2025
utcWeekEnd.getUTCMonth(); // 2 (3월)
utcWeekEnd.getUTCDate(); // 15
utcWeekEnd.getUTCDay(); // 6 (토요일)
utcWeekEnd.getUTCHours(); // 23
utcWeekEnd.getUTCMinutes(); // 59
utcWeekEnd.getUTCSeconds(); // 59
utcWeekEnd.getUTCMilliseconds(); // 999

// UTC 날짜 끝점 - 2025년 3월 15일 23:59:59.999 (토요일)
const utcDateEnd = getDateEndOf(targetDate, 'utcDate');
utcDateEnd.toISOString(); // '2025-03-15T23:59:59.999Z' (UTC 기준)
utcDateEnd.getUTCFullYear(); // 2025
utcDateEnd.getUTCMonth(); // 2 (3월)
utcDateEnd.getUTCDate(); // 15
utcDateEnd.getUTCDay(); // 6 (토요일)
utcDateEnd.getUTCHours(); // 23
utcDateEnd.getUTCMinutes(); // 59
utcDateEnd.getUTCSeconds(); // 59
utcDateEnd.getUTCMilliseconds(); // 999
```

<br />

### 다양한 입력 타입

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

// Date 객체
const dateObj = new Date('2025-03-15T14:30:45.123Z');
const result1 = getDateEndOf(dateObj, 'date');

// 타임스탬프 (숫자)
const timestamp = new Date('2025-03-15T14:30:45.123Z').getTime();
const result2 = getDateEndOf(timestamp, 'date');

// 하이픈 형식 날짜 문자열
const result3 = getDateEndOf('2025-03-15', 'date');

// 점 형식 날짜 문자열
const result4 = getDateEndOf('2025.03.15', 'date');
```

<br />

### 주의 끝점 계산 예시

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

// 일요일인 경우 - 해당 주 토요일이 주의 끝점
const sunday = '2025-03-09T14:30:45.123Z'; // 일요일
const sundayWeekEnd = getDateEndOf(sunday, 'week');
sundayWeekEnd.toISOString(); // '2025-03-15T14:59:59.999Z' (KST 기준)
sundayWeekEnd.getDate(); // 15
sundayWeekEnd.getDay(); // 6 (토요일)

// 월요일인 경우 - 해당 주 토요일이 주의 끝점
const monday = '2025-03-10T14:30:45.123Z'; // 월요일
const mondayWeekEnd = getDateEndOf(monday, 'week');
mondayWeekEnd.toISOString(); // '2025-03-15T14:59:59.999Z' (KST 기준)
mondayWeekEnd.getDate(); // 15
mondayWeekEnd.getDay(); // 6 (토요일)

// 토요일인 경우 - 자기 자신이 주의 끝점
const saturday = '2025-03-15T14:30:45.123Z'; // 토요일
const saturdayWeekEnd = getDateEndOf(saturday, 'week');
saturdayWeekEnd.toISOString(); // '2025-03-15T14:59:59.999Z' (KST 기준)
saturdayWeekEnd.getDate(); // 15
saturdayWeekEnd.getDay(); // 6 (토요일)
```

<br />

### 월/연 경계 처리

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

// 월의 마지막 날에서 주의 끝점을 구할 때 다음 월로 넘어갈 수 있음
const lastDayOfMonth = '2025-03-30T14:30:45.123Z'; // 2025-03-30 (일요일)
const weekEnd = getDateEndOf(lastDayOfMonth, 'week'); // 다음 월 토요일 (2025-04-05)
weekEnd.toISOString(); // '2025-04-05T14:59:59.999Z' (KST 기준)
weekEnd.getFullYear(); // 2025
weekEnd.getMonth(); // 3 (4월) - 다음 월
weekEnd.getDate(); // 5
weekEnd.getDay(); // 6 (토요일)

// 연의 마지막 날에서 주의 끝점을 구할 때 다음 년으로 넘어갈 수 있음
const lastDayOfYear = '2024-12-29T14:30:45.123Z'; // 2024-12-29 (일요일)
const yearWeekEnd = getDateEndOf(lastDayOfYear, 'week'); // 다음 년 토요일 (2025-01-04)
yearWeekEnd.toISOString(); // '2025-01-04T14:59:59.999Z' (KST 기준)
yearWeekEnd.getFullYear(); // 2025 - 다음 년
yearWeekEnd.getMonth(); // 0 (1월)
yearWeekEnd.getDate(); // 4
yearWeekEnd.getDay(); // 6 (토요일)
```

<br />

### 윤년 처리

```ts title="typescript"
import { getDateEndOf } from '@modern-kit/utils';

// 윤년의 2월 마지막 날 처리
const leapYear = '2024-02-15T14:30:45.123Z'; // 2024년은 윤년
const leapYearEnd = getDateEndOf(leapYear, 'month'); // 2024-02-29 23:59:59.999
leapYearEnd.toISOString(); // '2024-02-29T14:59:59.999Z' (KST 기준)
leapYearEnd.getDate(); // 29

// 평년의 2월 마지막 날 처리
const normalYear = '2025-02-15T14:30:45.123Z'; // 2025년은 평년
const normalYearEnd = getDateEndOf(normalYear, 'month'); // 2025-02-28 23:59:59.999
normalYearEnd.toISOString(); // '2025-02-28T14:59:59.999Z' (KST 기준)
normalYearEnd.getDate(); // 28
```
