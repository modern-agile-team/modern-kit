# isNumber

a function that checks if the given argument is a `number` and, if so, narrows the argument's type to `number`.

<br />

## Interface
```tsx title="typescript"
const isNumber: (arg: unknown) => arg is number
```

## Usage
```ts
import { isNumber } from '@devgrace/utils';


isNumber(123); // true

isNumber(() => {}); // false
isNumber('123'); // false
isNumber(true); // false
isNumber({}); // false
isNumber([]); // false
```