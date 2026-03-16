# isBeforeDate

Checks whether the target date is before the compare date.

The `inclusive` option allows comparing dates that are equal as well.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/isBeforeDate/index.ts)

<br />

## Interface
```ts title="typescript"
interface IsBeforeDateParams {
  targetDate: string | number | Date;
  compareDate?: string | number | Date;
  inclusive?: boolean;
}
```
```ts title="typescript"
function isBeforeDate({
  targetDate,
  compareDate = new Date(),
  inclusive = false,
}: IsBeforeDateParams): boolean;
```

<br />

## Usage

### without compareDate

- When no `compareDate` is provided, returns `true` if the target date is before the current date.

```ts title="typescript"
import { isBeforeDate } from '@modern-kit/utils';

// When the current date is January 1, 2025 00:00:00
isBeforeDate({ targetDate: new Date('2024-12-31') }); // true
isBeforeDate({ targetDate: new Date('2025-01-02') }); // false

// String format is also accepted.
isBeforeDate({ targetDate: '2024-12-31' }); // true
```

<br />

### with compareDate

- When a `compareDate` is provided, returns `true` if the target date is before the compare date.

```ts title="typescript"
import { isBeforeDate } from '@modern-kit/utils';

isBeforeDate({ targetDate: new Date('2024-12-31'), compareDate: new Date('2025-01-01') }); // true
isBeforeDate({ targetDate: new Date('2025-01-01'), compareDate: new Date('2024-12-31') }); // false

// String format is also accepted.
isBeforeDate({ targetDate: '2024-12-31', compareDate: '2025-01-01' }); // true
```

<br />

### inclusive option

- When `inclusive` is `true`, equal dates are also considered as "before".

```ts title="typescript"
import { isBeforeDate } from '@modern-kit/utils';

isBeforeDate({
  targetDate: new Date('2025-01-01'),
  compareDate: new Date('2025-01-01'),
  inclusive: false,
});
// false

isBeforeDate({
  targetDate: new Date('2025-01-01'),
  compareDate: new Date('2025-01-01'),
  inclusive: true,
});
// true
```
