# getDDay

Calculates the `D-day` between a given date and the current date in `days/hours/minutes/seconds`.

Returns a `negative` value when the target date has time remaining compared to the current date. Returns a `positive` value when the target date has already passed.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/getDDay/index.ts)

<br />

## Interface
```ts title="typescript"
function getDDay(date: string | number | Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { getDDay } from '@modern-kit/utils';

// When the current date is January 1, 2025 00:00:00
// Returns `negative` when the target date has time remaining compared to the current date.
getDDay(new Date('2024-12-25 00:00:00'));
// { days: -7, hours: 0, minutes: 0, seconds: 0 }

// Returns `positive` when the target date has already passed.
getDDay(new Date('2025-01-01 02:30:45'));
// { days: 0, hours: 2, minutes: 30, seconds: 45 }

// String format is also accepted.
getDDay('2024-12-31 18:15:30');
// { days: 0, hours: -5, minutes: -44, seconds: -30 }
```
