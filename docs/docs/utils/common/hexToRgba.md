# hexToRgba

16진수 색상 코드(Hex)를 RGB형식으로 변경하는 함수입니다. `(HEX -> RGB)`

Hex 값은 `3자리(단축형)` 또는 `6자리`의 16진수 값이어야 합니다. alpha는 투명도를 나타냅니다.

유효한 Hex 코드가 아니라면 `null`을 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/hexToRgba/index.ts)

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
```ts title="typescript"
import { hexToRgba } from '@modern-kit/utils';

const hex1 = '#1A2B3C';
const rgbColor1 = hexToRgba(hex1); 
// { r: 26, g: 43, b: 60, a: 1, stringifiedValue: 'rgba(26,43,60,1)' }

const hex2 = '#1A2';
const rgbColor2 = hexToRgba(hex2, 0.2); 
// { r: 17, g: 170, b: 34, a: 0.2, stringifiedValue: 'rgba(17,170,34,0.2)' }
```
