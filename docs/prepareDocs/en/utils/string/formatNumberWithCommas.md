# formatNumberWithCommas

A function that takes a `string` or `number` and returns a string with a `(,)comma` appended to the number in thousands.

<br />

## Interface
```tsx
const formatNumberWithCommas: (value: string | number) => string
```

## Usage
```ts
import { formatNumberWithCommas } from '@devgrace/utils';

const numberWithComma1 = formatNumberWithCommas(200); // '200'
const numberWithComma2 = formatNumberWithCommas(3000); // '3,000'
const numberWithComma3 = formatNumberWithCommas('50000'); // '50,000'
const numberWithComma4 = formatNumberWithCommas('123123123'); // '123,123,123'
const numberWithComma5 = formatNumberWithCommas('price: 500000'); // 'price: 500,000'
```