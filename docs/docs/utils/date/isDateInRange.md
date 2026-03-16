# isDateInRange

타겟 날짜가 주어진 날짜 범위 내에 있는지 확인합니다. 

타겟 날짜(targetDate)가 없을 경우 `현재 날짜`를 사용합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/isDateInRange/index.ts)

<br />

## Interface
```ts title="typescript"
interface IsDateInRangeParams {
  targetDate?: Date | string | number;
  fromDate?: Date | string | number;
  toDate?: Date | string | number;
  inclusive?: 'both' | 'from' | 'to' | 'none';
}
```
```ts title="typescript"
function isDateInRange({
  targetDate = new Date(),
  fromDate,
  toDate,
  inclusive = 'from',
}: IsDateInRangeParams): boolean;
```

<br />

## Usage

### 기본 동작

- 타겟 날짜가 있다면 `타겟 날짜`가 범위 내에 있는지 확인하며, 타겟 날짜가 없다면 `현재 날짜`가 범위 내에 있는지 확인합니다.

```ts title="typescript"
import { isDateInRange } from '@modern-kit/utils';

// 현재 날짜가 2025년 01월 01일 기준
isDateInRange({ fromDate: new Date('2024-01-01'), toDate: new Date('2024-12-31') }); // false

isDateInRange({ fromDate: '2025-01-01', toDate: '2025-12-31' }); // true
isDateInRange({ targetDate: '2025-01-02', fromDate: '2025-01-01', toDate: '2025-01-03' }); // true
```

<br />

### 시작 날짜만 지정

- 시작 날짜만 지정하여 `타겟 날짜(or 현재 날짜)`가 시작 날짜 이후인지 확인합니다.

```ts title="typescript"
import { isDateInRange } from '@modern-kit/utils';

// 현재 날짜가 2025년 01월 01일 기준
isDateInRange({ fromDate: new Date('2025-01-02') }); // true
isDateInRange({ fromDate: '2024-12-31' }); // false

isDateInRange({ targetDate: '2025-01-02', fromDate: '2025-01-01' }); // true
```

<br />

### 종료 날짜만 지정

- 종료 날짜만 지정하여 `타겟 날짜(or 현재 날짜)`가 종료 날짜 이전인지 확인합니다.

```ts title="typescript"
import { isDateInRange } from '@modern-kit/utils';

// 현재 날짜가 2025년 01월 01일 기준
isDateInRange({ toDate: new Date('2025-01-02') }); // true
isDateInRange({ toDate: '2024-12-31' }); // false

isDateInRange({ targetDate: '2024-12-31', toDate: '2025-01-01' }); // true
```

<br />

### 경계값 포함 여부 지정

- `inclusive` 옵션에 따라 경계값 포함 여부를 확인합니다.

```ts title="typescript"
import { isDateInRange } from '@modern-kit/utils';

// 현재 날짜가 2025년 01월 01일 기준
isDateInRange({ fromDate: '2025-01-01', toDate: '2025-01-01', inclusive: 'both' }); // true
isDateInRange({ targetDate: '2025-01-01', fromDate: '2025-01-01', toDate: '2025-01-01', inclusive: 'both' }); // true

isDateInRange({ fromDate: '2025-01-01', toDate: '2025-01-02', inclusive: 'from' }); // true
isDateInRange({ targetDate: '2025-01-01', fromDate: '2025-01-01', toDate: '2025-01-02', inclusive: 'from' }); // true

isDateInRange({ fromDate: '2024-12-31', toDate: '2025-01-01', inclusive: 'to' }); // true
isDateInRange({ targetDate: '2025-01-01', fromDate: '2024-12-31', toDate: '2025-01-01', inclusive: 'to' }); // true

isDateInRange({ fromDate: '2024-12-31', toDate: '2025-01-02', inclusive: 'none' }); // true
isDateInRange({ targetDate: '2025-01-01', fromDate: '2024-12-31', toDate: '2025-01-02', inclusive: 'none' }); // true
```
