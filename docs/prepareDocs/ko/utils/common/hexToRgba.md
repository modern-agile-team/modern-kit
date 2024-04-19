# hexToRgba

16진수 색상 코드(Hex)를 RGB형식으로 변경하는 함수입니다. `(HEX -> RGB)`

유효한 Hex 코드가 아니라면 `null`을 반환합니다.

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
