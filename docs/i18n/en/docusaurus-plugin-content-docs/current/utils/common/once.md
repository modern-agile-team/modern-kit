# once

A function that ensures the given callback is `executed only once`. After the first call, it `returns the previously computed result`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/once/index.ts)

<br />

## Interface
```ts title="typescript"
function once<T extends (...args: any[]) => any>(callback: T): T
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { once } from '@modern-kit/utils';

const initialize = once(() => {
  console.log('Initialization complete');
  return true;
});

initialize(); // Logs 'Initialization complete' and returns true.
initialize(); // Nothing is logged, and the previous result true is returned.
```

<br />

### With Arguments
```ts title="typescript"
import { once } from '@modern-kit/utils';

const onceSum = once((a: number, b: number) => {
  return a + b;
});

onceSum(2, 3); // 5
onceSum(3, 10); // 5, subsequent calls return the previous result even if arguments change.
```
