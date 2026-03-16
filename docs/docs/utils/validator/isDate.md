# isDate

주어진 값이 `Date` 타입인지 확인합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isDate/index.ts)

## Interface
```ts title="typescript"
function isDate(value: unknown): value is Date
```

<br />

## Usage
```ts title="typescript"
import { isDate } from '@modern-kit/utils';

isDate(new Date()); // true
isDate(new Date('2024-12-31 12:00:00')); // true

isDate([]); // false
isDate(() => {}); // false
isDate('123'); // false
isDate(123); // false
isDate({}); // false
```
