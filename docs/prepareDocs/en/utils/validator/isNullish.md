# isNullish

A function that checks if the given argument is `null` or `undefined`, and if so, narrows the argument type to `undefined | null`.

<br />

## Interface
```tsx title="typescript"
const isNullish: <T>(val: T | null | undefined) => val is null | undefined
```

## Usage
```ts
import { isNullish } from '@devgrace/utils';

isNullish(undefined); // true
isNullish(null); // true

isNullish(1); // false
isNullish(false); // false
isNullish("str"); // false
isNullish({}); // false
```
