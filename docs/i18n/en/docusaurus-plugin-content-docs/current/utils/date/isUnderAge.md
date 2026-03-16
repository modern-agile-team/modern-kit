# isUnderAge

Checks whether a person is younger than a specific age based on a given birth date.

The `inclusive` value determines whether the target age itself is included in the comparison.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/date/isUnderAge/index.ts)

<br />

## Interface
```ts title="typescript"
interface IsUnderAgeParams {
  birthDate: string | number | Date;
  targetAge: number;
  inclusive?: boolean;
}
```
```ts title="typescript"
function isUnderAge({
  birthDate,
  targetAge,
  inclusive = false,
}: IsUnderAgeParams): boolean;
```

<br />

## Usage

### without inclusive

```ts title="typescript"
import { isUnderAge } from '@modern-kit/utils';

// Based on the current date January 1, 2025
isUnderAge({ birthDate: new Date('2006-01-02'), targetAge: 19 }); // true
isUnderAge({ birthDate: new Date('2006-01-01'), targetAge: 19 }); // false, exactly 19 years old
isUnderAge({ birthDate: new Date('2005-12-31'), targetAge: 19 }); // false

isUnderAge({ birthDate: '2006-01-02', targetAge: 19 }); // true
isUnderAge({ birthDate: '2006-01-01', targetAge: 19 }); // false, exactly 19 years old
isUnderAge({ birthDate: '2005-12-31', targetAge: 19 }); // false
```

<br />

### with inclusive

- Determines whether the target age is included in the comparison based on the `inclusive` value. (default: `false`)
- When `inclusive` is `true`, the target age is included; when `false`, it is not.

```ts title="typescript"
// Based on January 01, 2025
// The inclusive value determines whether to include the target age.
isUnderAge({ birthDate: '2006-01-01', targetAge: 19, inclusive: true }); // true
isUnderAge({ birthDate: '2006-01-01', targetAge: 19, inclusive: false }); // false
```
