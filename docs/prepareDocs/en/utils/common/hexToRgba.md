# hexToRgba

a function to change a hexadecimal color code (Hex) to RGB format. `(HEX -> RGB)`

Returns `null` if it is not a valid hex code.

<br />

## Interface
```tsx
const hexToRgba: (hex: string, alpha?: number) => {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
  readonly stringifiedValue: `rgba(${number},${number},${number},${number})`;
} | null
```

## Usage
```ts
import { hexToRgba } from '@devgrace/utils';

const hex1 = '#1A2B3C';
const rgbColor1 = hexToRgba(hex1); 
// { r: 26, g: 43, b: 60, a: 1, stringifiedValue: 'rgba(26,43,60,1)' }

const hex2 = '#1A2';
const rgbColor2 = hexToRgba(hex2, 0.2); 
// { r: 17, g: 170, b: 34, a: 0.2, stringifiedValue: 'rgba(17,170,34,0.2)' }
```
