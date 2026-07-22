# retry

A function that retries a Promise-returning function until it succeeds.

You can configure the number of retries (`count`) and the interval (`delay`) between retries. `delay` can be a number for a fixed interval, or a `(attempt, error) => number` function that computes a different interval for each attempt (e.g., exponential backoff). You can control whether to retry with `shouldRetry`, and cancel the retry operation with `signal`.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/retry/index.ts)

<br />

## Interface

`retry` is overloaded into the following 3 signatures depending on the arguments.

```ts title="typescript"
type RetryDelay = number | ((attempt: number, error: unknown) => number);

interface RetryOptions {
  count?: number;
  delay?: RetryDelay;
  signal?: AbortSignal;
  shouldRetry?: ((error: unknown, attempt: number) => boolean) | boolean;
}

// 1. Called without options (does not retry)
function retry<T>(func: () => Promise<T>): Promise<T>;

// 2. Passing only the retry count (retries with no delay)
function retry<T>(func: () => Promise<T>, count: number): Promise<T>;

// 3. Passing an options object
function retry<T>(
  func: () => Promise<T>,
  options: RetryOptions
): Promise<T>;
```

<br />

## Parameters

| Name      | Type                       | Default | Description                                            |
| --------- | -------------------------- | ------- | ------------------------------------------------------ |
| `func`    | `() => Promise<T>`         | -       | The Promise-returning function to retry.               |
| `options` | `number \| RetryOptions`   | -       | The number of retries (`number`) or an options object. |

### Options

| Name          | Type                                                        | Default | Description                                                                                                                                                                                                                                                   |
| ------------- | ----------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `count`       | `number`                                                    | `0`     | The number of retries.                                                                                                                                                                                                                                        |
| `delay`       | `number \| ((attempt: number, error: unknown) => number)`   | `0`     | The wait time (ms) between retries. A number specifies a **fixed interval**, while a function receives the attempt index (`attempt`, starting from 0) and the thrown error, and returns the wait time (ms). Use a function when a different interval is needed for each attempt (e.g., exponential backoff). |
| `shouldRetry` | `((error: unknown, attempt: number) => boolean) \| boolean` | `true`  | Determines whether to retry. If a function is passed, it receives the thrown error and the current attempt index (`attempt`, starting from 0) and returns a `boolean`; when `false` (or returns `false`), it does not retry and throws the error immediately. |
| `signal`      | `AbortSignal`                                               | -       | An `AbortSignal` that can cancel the retry operation.                                                                                                                                                                                                         |

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { retry } from '@modern-kit/utils';

// Retries fetchData up to 5 times with no delay until it succeeds.
const data = await retry(fetchData, 5);
```

<br />

### Using a Fixed Interval (delay)

```ts title="typescript"
import { retry } from '@modern-kit/utils';

// Retries fetchData up to 5 times with a 1-second (1000ms) interval on failure.
const data = await retry(fetchData, { count: 5, delay: 1000 });
```

<br />

### Using Exponential Backoff

By passing a function to `delay`, you can compute a different wait time for each attempt using the attempt index (`attempt`, starting from 0).

```ts title="typescript"
import { retry } from '@modern-kit/utils';

// Retries fetchData up to 5 times with exponential backoff intervals: 300ms, 600ms, 1200ms...
const data = await retry(fetchData, {
  count: 5,
  delay: (attempt) => 300 * 2 ** attempt,
});
```

<br />

### Controlling Retries (shouldRetry)

The `shouldRetry` function receives the thrown error and the current attempt index (`attempt`, starting from 0).

```ts title="typescript"
import { retry } from '@modern-kit/utils';

// Errors for which isRetryable returns false are thrown immediately without retrying.
const data = await retry(fetchData, {
  count: 5,
  delay: 1000,
  shouldRetry: (error) => isRetryable(error),
});

// You can use attempt (starting from 0) to stop retrying after a certain attempt.
const data2 = await retry(fetchData, {
  count: 5,
  delay: 1000,
  shouldRetry: (error, attempt) => isRetryable(error) && attempt < 2,
});
```

<br />

### Using AbortSignal

```ts title="typescript"
import { retry } from '@modern-kit/utils';

const controller = new AbortController();

// The retry operation is cancelled when controller.abort() is called.
const data = await retry(fetchData, { count: 5, signal: controller.signal });
```
