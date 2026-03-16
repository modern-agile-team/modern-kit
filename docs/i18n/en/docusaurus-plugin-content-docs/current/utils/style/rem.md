# rem

A utility function that converts a `pixel` value to `rem` format based on the `fontSize` of the `Root element (html)`.

The `suffix` option allows you to append the `"rem"` suffix to the calculated rem value.

The `toFixedDigits` option allows you to display the value in `fixed-point notation`. However, to discard unnecessary decimal places, the value is `converted back to a number before being returned`.

```ts title="typescript"
// as-is
(1.0625).toFixed(10); // '1.0625000000'

// to-be
rem(17, { toFixedDigits: 10 }); // 1.0625
```

By default, values that have been called once with this function are `cached` to prevent redundant computation. Note that if the fontSize of the Root element (html) is changed via JavaScript at runtime, the function may not behave as expected.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/style/rem/index.ts)

<br />

## Interface
```ts title="typescript"
interface RemOptions {
  suffix?: boolean; // default: false
  toFixedDigits?: number;
}

const rem: (pixel: number, options?: RemOptions) => string | number;
```

<br />

## Usage
```ts title="typescript"
import { rem } from '@modern-kit/utils';

// Root FontSize: 16px;
rem(16); // 1;
rem(24); // 1.5;
rem(32); // 2;

// Suffix
rem(16, { suffix: true }); // "1rem";
rem(24, { suffix: true }); // "1.5rem";
rem(32, { suffix: true }); // "2rem";

// ToFixedDigits
rem(17); // 1.0625
rem(17, { toFixedDigits: 2 }); // 1.06
rem(17, { toFixedDigits: 3 }); // 1.063
rem(17, { toFixedDigits: 4 }); // 1.0625
rem(17, { toFixedDigits: 10 }); // 1.0625
```
