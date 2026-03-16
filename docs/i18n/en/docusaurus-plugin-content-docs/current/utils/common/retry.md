# retry

A function that retries a Promise-returning function until it succeeds.

You can configure the number of retries and the interval between retries. You can pass an AbortSignal to cancel the retry operation.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/retry/index.ts)

<br />

## Interface
```ts title="typescript"
function retry<T>(func: () => Promise<T>): Promise<T>;
function retry<T>(func: () => Promise<T>, count: number): Promise<T>;
function retry<T>(func: () => Promise<T>, options: RetryOptions): Promise<T>;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { retry } from '@modern-kit/utils';

// Retries fetchData up to 5 times until it succeeds.
const data = await retry(fetchData, 5);
```

<br />

### Using Options
```ts title="typescript"
import { retry } from '@modern-kit/utils';

// Retries fetchData up to 5 times with a 1-second interval on failure.
const data = await retry(fetchData, { count: 5, delay: 1000 });
```

<br />

### Using AbortSignal
```ts title="typescript"
import { retry } from '@modern-kit/utils';

const controller = new AbortController();

// The retry operation is cancelled when controller.abort() is called.
const data = await retry(fetchData, { count: 5, signal: controller.signal });
```
