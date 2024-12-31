# getDDay

주어진 날짜와 현재 날짜 사이의 `D-day`를 `일/시/분/초` 단위로 계산합니다.

목표 날짜가 현재 날짜보다 기간이 남은 경우 `음수`를 반환합니다. 목표 날짜보다 기간이 지난 경우 `양수`를 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/getDDay/index.ts)

## Interface
```ts title="typescript"
function getDDay(date: string | number | Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
```

## Usage
```ts title="typescript"
import { getDDay } from '@modern-kit/utils';

// 현재 날짜가 2025년 1월 1일 00:00:00 일 때
// 목표 날짜가 현재 날짜보다 기간이 남은 경우 `음수`를 반환합니다.
getDDay(new Date('2024-12-25 00:00:00'));
// { days: -7, hours: 0, minutes: 0, seconds: 0 }

// 목표 날짜가 현재 날짜보다 기간이 지난 경우 `양수`를 반환합니다.
getDDay(new Date('2025-01-01 02:30:45'));
// { days: 0, hours: 2, minutes: 30, seconds: 45 }

// 문자열 포맷도 허용합니다.
getDDay('2024-12-31 18:15:30');
// { days: 0, hours: -5, minutes: -44, seconds: -30 }
```
