# isAfterDate

목표 날짜가 비교 날짜보다 이후인지 확인합니다.

`inclusive` 옵션을 통해 같은 날짜도 포함해서 비교 할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/isAfterDate/index.ts)

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

- `비교 날짜(compareDate)`가 없을 때 현재 날짜를 기준으로 목표 날짜가 현재 날짜보다 이후인 경우 `true`를 반환합니다.

```ts title="typescript"
import { isAfterDate } from '@modern-kit/utils';

// 현재 날짜가 2025년 1월 1일 00:00:00 일 때
isAfterDate({ targetDate: new Date('2025-01-02') }); // true
isAfterDate({ targetDate: new Date('2024-12-31') }); // false

// 문자열 포맷도 허용합니다.
isAfterDate({ targetDate: '2025-01-02' }); // true
```

<br />

### with compareDate

- `비교 날짜(compareDate)`가 있을 때 목표 날짜가 비교 날짜보다 이후인 경우 `true`를 반환합니다.

```ts title="typescript"
import { isAfterDate } from '@modern-kit/utils';

isAfterDate({ targetDate: new Date('2025-01-01'), compareDate: new Date('2024-12-31') }); // true
isAfterDate({ targetDate: new Date('2024-12-31'), compareDate: new Date('2025-01-01') }); // false

// 문자열 포맷도 허용합니다.
isAfterDate({ targetDate: '2025-01-02', compareDate: '2025-01-01' }); // true
```

<br />

### inclusive option

- `inclusive` 옵션이 `true`일 때 같은 날짜도 포함해서 비교합니다.

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