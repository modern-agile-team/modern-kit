# isAfterDate

Checks whether the target date is after the compare date.

The `inclusive` option allows comparing dates that are equal as well.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/isAfterDate/index.ts)

<br />

## Interface
```ts title="typescript"
interface IsAfterDateParams {
  targetDate: string | number | Date;
  compareDate?: string | number | Date;
  inclusive?: boolean;
}
```
```ts title="typescript"
function isAfterDate({
  targetDate,
  compareDate = new Date(),
  inclusive = false,
}: IsAfterDateParams): boolean;
```

<br />

## Usage

### without compareDate

- When no `compareDate` is provided, returns `true` if the target date is after the current date.

```ts title="typescript"
import { isAfterDate } from '@modern-kit/utils';

// When the current date is January 1, 2025 00:00:00
isAfterDate({ targetDate: new Date('2025-01-02') }); // true
isAfterDate({ targetDate: new Date('2024-12-31') }); // false

// String format is also accepted.
isAfterDate({ targetDate: '2025-01-02' }); // true
```

<br />

### with compareDate

- When a `compareDate` is provided, returns `true` if the target date is after the compare date.

```ts title="typescript"
import { isAfterDate } from '@modern-kit/utils';

isAfterDate({ targetDate: new Date('2025-01-01'), compareDate: new Date('2024-12-31') }); // true
isAfterDate({ targetDate: new Date('2024-12-31'), compareDate: new Date('2025-01-01') }); // false

// String format is also accepted.
isAfterDate({ targetDate: '2025-01-02', compareDate: '2025-01-01' }); // true
```

<br />

### inclusive option

- When `inclusive` is `true`, equal dates are also considered as "after".

```ts title="typescript"
import { isAfterDate } from '@modern-kit/utils';

isAfterDate({
  targetDate: new Date('2025-01-01'),
  compareDate: new Date('2025-01-01'),
  inclusive: false,
});
// false

isAfterDate({
  targetDate: new Date('2025-01-01'),
  compareDate: new Date('2025-01-01'),
  inclusive: true,
});
// true
```
