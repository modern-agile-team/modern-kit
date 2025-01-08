# formatNumberWithUnits

`숫자` 혹은 `숫자로 이루어진 문자열`을 주어진 `단위` 별로 포맷팅하는 함수입니다.

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

const DEFAULT_UNITS: Unit[] = [
  { unit: '조', value: ONE_TRILLION },
  { unit: '억', value: ONE_HUNDRED_MILLION },
  { unit: '만', value: TEN_THOUSAND },
];

interface FormatNumberWithUnitsOptions {
  units?: Unit[]; // default: DEFAULT_UNITS
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

// 기본 동작
formatNumberWithUnits(1234567) // "123만 4,567"
formatNumberWithUnits('1234567') // "123만 4,567", 숫자로 이루어진 문자열 허용
```

<br />

### 옵션 사용
```ts title="typescript"
import { formatNumberWithUnits } from '@modern-kit/utils';

// 단위 사이 공백 추가
formatNumberWithUnits(1234567, { space: true }) // "123만 4,567"
formatNumberWithUnits(1234567, { space: false }) // "123만4,567"

// 쉼표 사용 여부
formatNumberWithUnits(1234567, { commas: false }) // "123만 4567"
formatNumberWithUnits(1234567, { commas: true }) // "123만 4,567"

// 버림 단위
formatNumberWithUnits(1234567, { floorUnit: 10000 }) // "123만"

// 사용자 정의 단위
const customUnits = [
  { unit: 'K', value: 1000 },
  { unit: 'M', value: 1000000 },
];

formatNumberWithUnits(1234567, { 
  units: customUnits, 
  floorUnit: 1000, 
}); // "1M 234K"

// 단위 적용 X
formatNumberWithUnits(1234567, { 
  units: [], 
  floorUnit: 1000, 
}); // "1,234,000"
```