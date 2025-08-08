# hasRepeatingChars

주어진 문자열에서 연속된 문자의 개수가 `maxCount`를 초과하는지 확인하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/hasRepeatingChars/index.ts)

## Interface
```ts title="typescript"
const hasRepeatingChars: (
  string: string,
  maxCount: number
) => boolean;
```

## Usage
```ts title="typescript"
import { hasRepeatingChars } from '@modern-kit/utils';

hasRepeatingChars('aaabbbccc', 3); // true
hasRepeatingChars('aaabbbccc', 2); // false

hasRepeatingChars('123!!!123', -1); // Error
hasRepeatingChars('123!!!123', 1.1); // Error
hasRepeatingChars('123!!!123', Infinity); // Error
```
  