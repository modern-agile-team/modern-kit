# formatNumberByUnits

인자로 받은 숫자를 `단위 별로 구분`해주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberByUnits/index.ts)

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
  | 1000
  | 10000
  | 100000
  | 1000000
  | 10000000
  | 100000000;

interface FormatNumberByUnitsOption {
  units?: Unit[]; // default: []
  withCommas?: boolean; // default: false,
  floorUnit?: FloorUnit; // default: 1,
  insertSpace?: boolean; // default: false,
}

const formatNumberByUnits: (
  value: number,
  options?: FormatNumberByUnitsOption
) => string;
```

## Usage
```ts title="typescript"
import { formatNumberByUnits } from '@modern-kit/utils';

const ONE_HUNDRED_MILLION = 100000000;
const TEN_THOUSAND = 10000;

const units = [
  { unit: '억', value: ONE_HUNDRED_MILLION },
  { unit: '만', value: TEN_THOUSAND },
];

const value1 = formatNumberByUnits(450000000, {
  units: units,
}); // '4억5000만'

// withCommas옵션으로 천 단위마다 콤마를 추가할 수 있습니다.
const value2 = formatNumberByUnits(450000000, {
  withCommas: true,
  units: units,
}); // '4억5,000만'

// insertSpace옵션으로 단위 마다 띄어쓰기를 추가할 수 있습니다.
const value3 = formatNumberByUnits(450000000, {
  units: units,
  withCommas: true,
  insertSpace: true,
}); // '4억 5,000만'

// floorUnit 옵션으로 해당 단위 미만의 값들을 버릴 수 있습니다.
const value4 = formatNumberByUnits(459325300, {
  units: units,
  withCommas: false,
  floorUnit: 10000000,
}); // '4억5000만'
```