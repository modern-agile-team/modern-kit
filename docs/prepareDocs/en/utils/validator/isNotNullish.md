# isNotNullish

A function that checks that the given argument is not `null` or `undefined`, and if not, narrows it down to the given argument type.

<br />

## Interface
```tsx title="typescript"
const isNotNullish: <T>(val: T | null | undefined) => val is T
```

## Usage
```ts
import { isNotNullish } from '@modern-kit/utils';

isNotNullish(1); // true
isNotNullish(false); // true
isNotNullish("str"); // true
isNotNullish({}); // true

isNotNullish(undefined); // false
isNotNullish(null); // false
```
