# formatNumberCurrency

인자로 받은 숫자를 `단위 별로 구분`하고 `통화 단위`를 추가할 수 있습니다.

<br />

## Interface
```tsx
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
type FormatNumberCurrencyOptions = FormatNumberByUnitsOption &
  Partial<CurrencyOption>;

const formatNumberCurrency: (
  value: number,
  options?: FormatNumberCurrencyOptions
) => string;
```

## Usage
### Basic
기본적인 사용법은 아래와 같습니다.
```ts
import { formatNumberCurrency } from '@modern-kit/utils';

const ONE_HUNDRED_MILLION = 100000000;
const TEN_THOUSAND = 10000;

const units = [
  { unit: '억', value: ONE_HUNDRED_MILLION },
  { unit: '만', value: TEN_THOUSAND },
];

const value1 = formatNumberCurrency(450000000, {
  units: units,
  currency: '원',
  currencyPosition: 'suffix',
}); // '4억5000만원'

const value2 = formatNumberCurrency(4500, {
  currency: '$',
  currencyPosition: 'prefix',
}); // '$4500'

// withCommas 옵션으로 천 단위마다 콤마를 추가할 수 있습니다.
const value2 = formatNumberCurrency(450000000, {
  units: units,
  withCommas: true,
  currency: '원',
  currencyPosition: 'suffix',
}); // '4억5,000만원'

// insertSpace 옵션으로 단위 마다 띄어쓰기를 추가할 수 있습니다.
const value3 = formatNumberCurrency(450000000, {
  units: units,
  withCommas: true,
  currency: '원',
  currencyPosition: 'suffix',
  insertSpace: true,
}); // '4억 5,000만원'

// floorUnit 옵션으로 해당 단위 미만의 값들을 버릴 수 있습니다.
const value4 = formatNumberCurrency(459325300, {
  units: units,
  currency: '원',
  currencyPosition: 'suffix',
  floorUnit: 10000000,
}); // '4억5000만원'
```

<br />

### ⭐️Abstraction 
아래와 같이 필요에 맞게 `추상화`해서 사용하는 것을 추천드립니다.

```ts
const ONE_HUNDRED_MILLION = 100000000;
const TEN_THOUSAND = 10000;

const units = [
  { unit: '억', value: ONE_HUNDRED_MILLION },
  { unit: '만', value: TEN_THOUSAND },
];

const formatToKRW = (value: number) => {
  return formatNumberCurrency(value, {
    units: units,
    currency: '원',
    currencyPosition: 'suffix',
  });
}

const value1 = formatToKRW(42000000); // 4200만원
const value2 = formatToKRW(425000000); // 4억2500만원
```