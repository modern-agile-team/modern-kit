# delay

A function that waits for the given amount of time before proceeding to the next operation.

When using `setTimeout` to define an action after a specific time, if there is a Promise after the function that should execute at that time, `setTimeout` belongs to the `macroTaskQueue` and the Promise belongs to the `microTaskQueue`, which may not guarantee sequential execution as intended.

Using the delay function can solve this problem.

By passing a function as the second argument, you can call that function after the given time.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/delay/index.ts)

<br />

## Interface
```ts title="typescript"
const delay: (time: number) => Promise<void>;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { delay } from '@modern-kit/utils';

const something = () => Promise.resolve()

const doSomethingAfterDelay = async () => {
  await delay(1000)
  await something()
};
```
