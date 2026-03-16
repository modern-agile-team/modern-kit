# formatNumberWithCommas

A function that returns a string with thousand-separator `(,) commas` added to a given `number` or `string consisting of numbers`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberWithCommas/index.ts)

<br />

## Interface
```ts title="typescript"
function formatNumberWithCommas(value: number | string): string
```

<br />

## Usage
```ts title="typescript"
import { formatNumberWithCommas } from '@modern-kit/utils';

// number
formatNumberWithCommas(200); // '200'
formatNumberWithCommas(3000); // '3,000'
formatNumberWithCommas(-123123123); // '-123,123,123'
formatNumberWithCommas(123456.12345); // '123,456.12345'

// string consisting of numbers
formatNumberWithCommas('200'); // '200'
formatNumberWithCommas('3000'); // '3,000'
formatNumberWithCommas('-123123123'); // '-123,123,123'
formatNumberWithCommas('123456.12345'); // '123,456.12345'
```
