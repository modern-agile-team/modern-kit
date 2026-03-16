# hexToRgba

A function that converts a hexadecimal color code (Hex) to RGB format. `(HEX -> RGB)`

The Hex value must be a `3-digit (shorthand)` or `6-digit` hexadecimal value. The alpha parameter represents opacity.

If the Hex code is not valid, `null` is returned.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/hexToRgba/index.ts)

<br />

## Interface
```ts title="typescript"
const hexToRgba: (hex: string, alpha?: number) => {
  r: number;
  g: number;
  b: number;
  a: number;
  stringifiedValue: string;
} | null
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { hexToRgba } from '@modern-kit/utils';

const hex1 = '#1A2B3C';
const rgbColor1 = hexToRgba(hex1);
// { r: 26, g: 43, b: 60, a: 1, stringifiedValue: 'rgba(26,43,60,1)' }

const hex2 = '#1A2';
const rgbColor2 = hexToRgba(hex2, 0.2);
// { r: 17, g: 170, b: 34, a: 0.2, stringifiedValue: 'rgba(17,170,34,0.2)' }
```
