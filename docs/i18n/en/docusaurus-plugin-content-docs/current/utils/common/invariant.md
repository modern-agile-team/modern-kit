# invariant

A runtime type-checking function that verifies whether the given condition is truthy, and throws an error if it is falsy.

This function supports TypeScript's type narrowing.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/invariant/index.ts)

<br />

## Interface
```ts title="typescript"
function invariant(value: boolean, message: string): asserts value;

function invariant<T>(
  value: T | null | undefined,
  message: string
): asserts value is T;
```

<br />

## Usage
### Boolean Condition Check
```ts title="typescript"
import { invariant } from '@modern-kit/utils';

invariant(user.isAdmin, "Admin privileges are required");
// After this point, user.isAdmin is guaranteed to be true.
```

<br />

### Narrowing null/undefined Types
```ts title="typescript"
import { invariant } from '@modern-kit/utils';

invariant(user, "User does not exist");
// After this point, user is guaranteed to be the User type.
```
