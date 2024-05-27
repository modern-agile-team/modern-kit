# rem

`Root 요소(html)`의 `fontSize`를 기반으로 `pixel` 값을 `rem` 형태로 변환해주는 유틸 함수입니다.

`suffix`옵션을 통해서 계산한 rem 값에 접미사로 `"rem"`을 붙여서 반환시킬 수 있습니다.

`toFixedDigits` 옵션을 통해서 `고정 소수점 표기법(fixed-point notation)`으로 표시할 수 있습니다. 단, 불 필요한 소수점을 버리기 위해 `한번 더 숫자로 변환 후 반환`합니다.

```ts title="typescript"
// as-is
(1.0625).toFixed(10); // '1.0625000000'

// to-be
rem(17, { toFixedDigits: 10 }); // 1.0625
```

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/style/rem/index.ts)

## Interface
```ts title="typescript"
interface RemOptions {
  suffix?: boolean; // default: false
  toFixedDigits?: number;
}

const rem: (pixel: number, options?: RemOptions) => string | number;
```

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
