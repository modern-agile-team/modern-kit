# isInRange

대상 값이 주어진 범위 내에 있는지 확인합니다.

인자로 equalOptions 객체를 받아, 범위의 양 끝을 포함할지 여부를 설정할 수 있습니다.

equalOptions의 기본값은 min값은 true, max값은 false로 min값은 포함, max값은 포함하지 않습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isInRange/index.ts)

## Interface
```ts title="typescript"

interface IsInRangeProps {
  value: number;
  min: number;
  max: number;
  equalOptions?: {
    min?: boolean;
    max?: boolean;
  };
}

const isInRange = ({
  value,
  min,
  max,
  equalOptions = {
    min: true,
    max: false,
  },
}: IsInRangeProps) => boolean;
```

## Usage
```ts title="typescript"
import { isInRange } from '@modern-kit/utils';

isInRange({ value: 5, min: 0, max: 10 }) // true
isInRange({ value: 0, min: 0, max: 10 }) // true
isInRange({ value: 10, min: 0, max: 10, equalOptions: { max: true } }) // true
isInRange({ value: 10, min: 0, max: 10, equalOptions: { min: false, max: true } }) // true
isInRange({ value: 10, min: 0, max: 10, equalOptions: { min: true, max: true } }) // true

isInRange({ value: 5, max: 10, equalOptions: { max: true } }) // Error('min값은 필수입니다.')
isInRange({ value: 5, min: 10, equalOptions: { max: true } }) // Error('max값은 필수입니다.')
isInRange({ value: 5, min: 10, max: 0, equalOptions: { max: true } }) // Error('min은 max보다 작아야합니다.')
```
