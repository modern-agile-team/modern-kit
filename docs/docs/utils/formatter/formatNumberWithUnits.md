# formatNumberWithUnits

`숫자` 혹은 `숫자로 이루어진 문자열`을 주어진 `단위` 별로 포맷팅하는 함수입니다.

- 천 단위 구분 쉼표 사용 여부(`commas`)를 선택할 수 있습니다.
- 버림 단위(`floorUnit`)를 선택할 수 있습니다.
- 소수 일 경우 소수점 자리수(`decimal`)를 선택할 수 있습니다. 단, 버림 단위가 존재할 경우 소수 부분은 제거됩니다.
- 단위 사이 공백 추가 여부(`space`)를 선택할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithUnits/index.ts)

## Interface
```ts title="typescript"
interface Unit {
  unit: string;
  value: number;
}

type FloorUnit =
  | 1
  | 10
  | 100
  | 1_000
  | 10_000
  | 100_000
  | 1_000_000
  | 10_000_000
  | 100_000_000
  | 1_000_000_000
  | 10_000_000_000
  | 100_000_000_000
  | 1_000_000_000_000;

interface FormatNumberWithUnitsOptions {
  units?: Unit[] | readonly Unit[]; // default: []
  commas?: boolean; // default: true
  floorUnit?: FloorUnit; // default: 1
  space?: boolean; // default: true
}
```
```ts title="typescript"
function formatNumberWithUnits(
  value: number | string,
  options?: FormatNumberWithUnitsOptions
): string;
```

## Usage
### 기본 동작
```ts title="typescript"
import { formatNumberWithUnits } from '@modern-kit/utils';

const KRW_UNITS = [
  { unit: '조', value: 1_000_000_000_000 },
  { unit: '억', value: 100_000_000 },
  { unit: '만', value: 10_000 },
] as const;

// 기본 동작
formatNumberWithUnits(1234567) // "1,234,567"

formatNumberWithUnits(1234567, { units: KRW_UNITS }) // "123만 4,567"
formatNumberWithUnits(-1234567, { units: KRW_UNITS }) // "-123만 4,567", 음수 처리

formatNumberWithUnits('1234567', { units: KRW_UNITS }) // "123만 4,567", 숫자로 이루어진 문자열 허용
```

<br />

### 옵션 사용
```ts title="typescript"
import { formatNumberWithUnits } from '@modern-kit/utils';

const KRW_UNITS = [
  { unit: '조', value: 1_000_000_000_000 },
  { unit: '억', value: 100_000_000 },
  { unit: '만', value: 10_000 },
] as const;

// 단위 사이 공백 추가 (기본값: true)
formatNumberWithUnits(1234567, { units: KRW_UNITS, space: true }) // "123만 4,567"
formatNumberWithUnits(1234567, { units: KRW_UNITS, space: false }) // "123만4,567"

// 쉼표 사용 여부 (기본값: true)
formatNumberWithUnits(1234567, { units: KRW_UNITS, commas: false }) // "123만 4567"
formatNumberWithUnits(1234567, { units: KRW_UNITS, commas: true }) // "123만 4,567"

// 버림 단위 (기본값: 1)
formatNumberWithUnits(1234567, { units: KRW_UNITS, floorUnit: 10000 }) // "123만"

// 소수점 자리수 (기본값: 0)
formatNumberWithUnits(1234567.123, { units: KRW_UNITS, decimal: 2 }) // "123만 4,567.12"
```