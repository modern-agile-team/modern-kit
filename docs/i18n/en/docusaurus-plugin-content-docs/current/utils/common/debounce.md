# debounce

Creates a debounced function.

The debounced function delays execution of the provided function until `wait` milliseconds have elapsed since the last time it was called.

On consecutive calls, the previous call is cancelled and a new timer starts.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/debounce/index.ts)

<br />

## Interface
```ts title="typescript"
interface DebounceOptions {
  signal?: AbortSignal;
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
}

interface DebouncedFunction<F extends (...args: any[]) => void> {
  (...args: Parameters<F>): void;
  cancel: () => void;
  flush: () => void;
}

const debounce: <F extends (...args: any[]) => void>(
  func: F,
  wait: number,
  options?: DebounceOptions
) => DebouncedFunction<F>;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { debounce } from '@modern-kit/utils';

const logMessage = (message: string) => {
  console.log(message);
};

const debouncedLog = debounce(logMessage, 1000);

debouncedLog('first call'); // Executed after the delay time (1 second).
```

<br />

### Using AbortSignal
```ts title="typescript"
import { debounce } from '@modern-kit/utils';

const handleClick = () => {
  console.log('click event');
};

const controller = new AbortController();

const debouncedClick = debounce(handleClick, 1000, { signal: controller.signal });

debouncedClick();

controller.abort(); // Cancels the debounced function call.
```
