# isBeforeDate

목표 날짜가 비교 날짜보다 이전인지 확인합니다.

`inclusive` 옵션을 통해 같은 날짜도 포함해서 비교 할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/isBeforeDate/index.ts)

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

## Usage
### without compareDate
- `비교 날짜(compareDate)`가 없을 때 현재 날짜를 기준으로 목표 날짜가 현재 날짜보다 이전인 경우 `true`를 반환합니다.
```ts title="typescript"
import { isBeforeDate } from '@modern-kit/utils';

// 현재 날짜가 2025년 1월 1일 00:00:00 일 때
isBeforeDate({ targetDate: new Date('2024-12-31') }); // true
isBeforeDate({ targetDate: new Date('2025-01-02') }); // false

// 문자열 포맷도 허용합니다.
isBeforeDate({ targetDate: '2024-12-31' }); // true
```

### with compareDate 
- `비교 날짜(compareDate)`가 있을 때 목표 날짜가 비교 날짜보다 이전인 경우 `true`를 반환합니다.
```ts title="typescript"
import { isBeforeDate } from '@modern-kit/utils';

isBeforeDate({ targetDate: new Date('2024-12-31'), compareDate: new Date('2025-01-01') }); // true
isBeforeDate({ targetDate: new Date('2025-01-01'), compareDate: new Date('2024-12-31') }); // false

// 문자열 포맷도 허용합니다.
isBeforeDate({ targetDate: '2024-12-31', compareDate: '2025-01-01' }); // true
```

### inclusive option
- `inclusive` 옵션이 `true`일 때 같은 날짜도 포함해서 비교합니다.

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
