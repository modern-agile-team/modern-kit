# throttle

Creates a throttled function.

The throttled function executes the first call immediately, and subsequent calls are executed only at intervals of `wait` milliseconds.

It limits the frequency of calls by executing at most once per specified time interval.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/throttle/index.ts)

<br />

## Interface
```ts title="typescript"
interface ThrottleOptions {
  signal?: AbortSignal;
  leading?: boolean;
  trailing?: boolean;
}

interface ThrottledFunction<F extends (...args: any[]) => void> {
  (...args: Parameters<F>): void;
  cancel: () => void;
  flush: () => void;
}

const throttle: <F extends (...args: any[]) => void>(
  func: F,
  wait: number,
  options?: ThrottleOptions
) => ThrottledFunction<F>;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { throttle } from '@modern-kit/utils';

const logMessage = (message: string) => {
  console.log(message);
};

const throttledLog = throttle(logMessage, 1000);

throttledLog('first call'); // Executed immediately
throttledLog('second call'); // Executed at the delay interval.
```

<br />

### Using AbortSignal
```ts title="typescript"
import { throttle } from '@modern-kit/utils';

const handleScroll = () => {
  console.log('scroll event');
};

const controller = new AbortController();
controller.abort(); // Cancels the throttled function call.

const throttledScroll = throttle(handleScroll, 1000, { signal: controller.signal });

throttledScroll(); // Not called.
```
