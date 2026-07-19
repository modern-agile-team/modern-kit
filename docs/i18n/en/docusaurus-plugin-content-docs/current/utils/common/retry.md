# retry

A function that retries a Promise-returning function until it succeeds.

You can configure the number of retries (`count`) and the interval between retries. The interval can be a fixed interval (`delay`) or exponential backoff (`backoff`). You can control whether to retry with `shouldRetry`, and cancel the retry operation with `signal`.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/retry/index.ts)

<br />

## Interface

`retry` is overloaded into the following 4 signatures depending on the arguments.

```ts title="typescript"
interface RetryOptionsBase {
  count: number;
  signal?: AbortSignal;
  shouldRetry?: ((error: unknown, attempt: number) => boolean) | boolean;
}

interface RetryOptionsWithDelay extends RetryOptionsBase {
  delay: number;
}

interface RetryOptionsWithBackoff extends RetryOptionsBase {
  backoff: number;
}

// 1. Called without options (retries with no delay)
function retry<T>(func: () => Promise<T>): Promise<T>;

// 2. Passing only the retry count (retries with no delay)
function retry<T>(func: () => Promise<T>, count: number): Promise<T>;

// 3. Passing fixed-interval (delay) options
function retry<T>(
  func: () => Promise<T>,
  options: RetryOptionsWithDelay
): Promise<T>;

// 4. Passing exponential-backoff (backoff) options
function retry<T>(
  func: () => Promise<T>,
  options: RetryOptionsWithBackoff
): Promise<T>;
```

<br />

## Parameters

| Name      | Type                                                         | Default | Description                                            |
| --------- | ------------------------------------------------------------ | ------- | ------------------------------------------------------ |
| `func`    | `() => Promise<T>`                                           | -       | The Promise-returning function to retry.               |
| `options` | `number \| RetryOptionsWithDelay \| RetryOptionsWithBackoff` | -       | The number of retries (`number`) or an options object. |

### Options

`RetryOptionsWithDelay` uses a fixed interval (`delay`), while `RetryOptionsWithBackoff` uses exponential backoff (`backoff`). The two option types share all properties except `delay`/`backoff`.

| Name          | Type                                                        | Default | Description                                                                                                                                                                                                                                                   |
| ------------- | ----------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `count`       | `number`                                                    | `0`     | The number of retries.                                                                                                                                                                                                                                        |
| `delay`       | `number`                                                    | `0`     | (`RetryOptionsWithDelay`) The fixed interval (ms) between retries.                                                                                                                                                                                            |
| `backoff`     | `number`                                                    | -       | (`RetryOptionsWithBackoff`) The starting interval (ms) for exponential backoff. It doubles each attempt as `backoff * 2 ** count`.                                                                                                                            |
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

### Using Exponential Backoff (backoff)

```ts title="typescript"
import { retry } from '@modern-kit/utils';

// Retries fetchData up to 5 times with exponential backoff intervals: 300ms, 600ms, 1200ms...
const data = await retry(fetchData, { count: 5, backoff: 300 });
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
