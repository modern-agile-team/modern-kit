# createSingleRequest

A factory function that creates a function wrapper allowing only a single async execution at a time.

An async function wrapped by the returned wrapper will not execute again while a call is in progress, but can be called again after the current execution completes.

`debounce/throttle` is effective in most cases for preventing duplicate calls of a function.
However, `debounce/throttle` does not guarantee the completion of async operations, so it has the following limitations:

1. If the `debounce/throttle` time is shorter than the API response time: the async operation may be `called again` before it completes.
2. If the `debounce/throttle` time is longer than the API response time: the async operation has completed but elements like `buttons` may still be `disabled`.
3. When you want `immediate feedback`: `debounce/throttle` delays calls, making it limited for showing users an `immediate response`.
4. Since `debounce/throttle` operates based on `time`, it is hard to determine `whether duplicate calls have occurred` — only `how often` it runs matters.

If you want to address these limitations, you can use `createSingleRequest`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/createSingleRequest/index.ts)

<br />

## Interface
```ts title="typescript"
function createSingleRequest(
  key?: string
): <T, Args extends unknown[]>(
  callback: (...args: Args) => Promise<T>
) => (...args: Args) => Promise<T | undefined>;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { createSingleRequest } from '@modern-kit/utils';

const singleRequest = createSingleRequest();
const wrappedFetch = singleRequest(fetchData);

wrappedFetch(); // executed
wrappedFetch(); // ignored because a call is in progress (returns undefined)
wrappedFetch(); // ignored because a call is in progress (returns undefined)
// Can be called again after the first call completes
```

<br />

### Sharing a Single Lock Across Multiple Async Functions
```ts title="typescript"
import { createSingleRequest } from '@modern-kit/utils';

const singleRequest = createSingleRequest();
const wrappedSubmit = singleRequest(submitForm);
const wrappedSync = singleRequest(syncData);

// If wrappedSubmit is in progress, wrappedSync calls are also blocked (shared lock)
wrappedSubmit();
wrappedSync(); // returns undefined, not executed
```

<br />

### Passing Arguments
```ts title="typescript"
import { createSingleRequest } from '@modern-kit/utils';

const singleRequest = createSingleRequest();
const wrappedFetch = singleRequest(async (id: number) => {
  const res = await fetch(`/api/items/${id}`);
  return res.json();
});

const data = await wrappedFetch(42); // 42 is passed to the callback.
```
