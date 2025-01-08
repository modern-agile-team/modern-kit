# formatNumberWithCurrency

`숫자` 혹은 `숫자로 이루어진 문자열`을 주어진 단위 별로 나누고, 통화 기호와 함께 포맷팅하는 함수입니다.

**[@modern-kit/utils](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithUnits/index.ts)** 의 `formatNumberWithUnits`를 확장한 함수이기 때문에 해당 함수 옵션을 함께 활용 할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithCurrency/index.ts)

## Interface
```ts title="typescript"
interface CurrencyOption {
  currency: string;
  currencyPosition: 'prefix' | 'suffix';
}

/*
  units?: Unit[]; // default: []
  floorUnit?: FloorUnit; // default: 1,
  withCommas?: boolean; // default: false,
  insertSpace?: boolean; // default: false,
  currency?: string; // default: ''
  currencyPosition?: 'prefix' | 'suffix'; // default: 'suffix'
*/
type FormatNumberWithCurrencyOptions = FormatNumberByUnitsOption &
  Partial<CurrencyOption>;

const formatNumberWithCurrency: (
  value: number,
  options?: FormatNumberWithCurrencyOptions
) => string;
```

## Usage
### 기본 동작
```ts title="typescript"
import { formatNumberWithCurrency } from '@modern-kit/utils';

// 기본 동작
formatNumberWithCurrency(1000, { currency: '$', position: 'prefix' }) // '$1,000'
formatNumberWithCurrency(1000, { currency: '원', position: 'suffix' }) // '1,000원'

// 숫자로 이루어진 문자열도 허용
formatNumberWithCurrency('1000', { currency: '$', position: 'prefix' }) // '$1,000'
formatNumberWithCurrency('1000', { currency: '원', position: 'suffix' }) // '1,000원'
```

<br />

### 옵션 사용
```ts title="typescript"
import { formatNumberWithCurrency } from '@modern-kit/utils';

// 단위 사이 공백 추가
formatNumberWithCurrency(12345, { currency: '원', position: 'suffix', space: false }) // '1만2,345원'
formatNumberWithCurrency(12345, { currency: '원', position: 'suffix', space: true }) // '1만 2,345원'

// 쉼표 사용 여부
formatNumberWithCurrency(12345, { currency: '원', position: 'suffix', commas: false }) // '1만 2345원'
formatNumberWithCurrency(12345, { currency: '원', position: 'suffix', commas: true }) // '1만 2,345원'

// 버림 단위
formatNumberWithCurrency(12345, { currency: '원', position: 'suffix', floorUnit: 10000 }) // '1만원'

// 사용자 정의 단위
const customUnits = [
  { unit: 'K', value: 1000 },
  { unit: 'M', value: 1000000 },
];

formatNumberWithCurrency(1234567, {
  units: customUnits,
  currency: '$',
  position: 'prefix',
  floorUnit: 1000000
}) // '$1M'

// 단위 적용 X
formatNumberWithCurrency(1234567, {
  units: [],
  floorUnit: 1000,
  currency: '$',
  position: 'prefix',
}); // '$1,234,000'
```

<br />

### ⭐️ Best Practice
아래와 같이 필요에 맞게 `추상화`해서 사용하는 것을 추천드립니다.

```ts title="typescript"
import { formatNumberWithCurrency } from '@modern-kit/utils';

const formatNumberToKRW = (value: number) => {
  return formatNumberWithCurrency(value, {
    currency: '원',
    position: 'suffix',
  });
}

const value1 = formatNumberToKRW(42000000); // 4,200만원
const value2 = formatNumberToKRW(425000000); // 4억 2,500만원
```