# getAge

Calculates the `current age` based on a given `birth date`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/getAge/index.ts)

<br />

## Interface
```ts title="typescript"
function getAge(birthDate: string | number | Date): number
```

<br />

## Usage

```ts title="typescript"
import { getAge } from '@modern-kit/utils';

// When the current date is January 1, 2025
getAge(new Date('2006-01-01')); // 19

// String format is also accepted.
getAge('2006-01-01'); // 19
```
