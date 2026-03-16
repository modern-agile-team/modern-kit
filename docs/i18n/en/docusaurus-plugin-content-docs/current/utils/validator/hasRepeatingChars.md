# hasRepeatingChars

A function that checks whether the count of consecutive characters in a given string exceeds `maxCount`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/hasRepeatingChars/index.ts)

## Interface
```ts title="typescript"
const hasRepeatingChars: (
  string: string,
  maxCount: number
) => boolean;
```

<br />

## Usage
```ts title="typescript"
import { hasRepeatingChars } from '@modern-kit/utils';

hasRepeatingChars('aaabbbccc', 3); // true
hasRepeatingChars('aaabbbccc', 2); // false

hasRepeatingChars('123!!!123', -1); // Error
hasRepeatingChars('123!!!123', 1.1); // Error
hasRepeatingChars('123!!!123', Infinity); // Error
```
