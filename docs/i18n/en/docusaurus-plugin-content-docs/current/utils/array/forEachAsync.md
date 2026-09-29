# forEachAsync

Invokes the provided `callback function` for each element of the given array, waiting for the Promise returned by the callback to settle.

By default it runs **sequentially**, calling the next element's callback only after the previous one has completed. Set `options.parallel` to `true` to run in parallel. Note that the completion order of each element is not guaranteed when running in parallel.

If a callback throws, (in sequential mode) the remaining elements are not processed and the returned Promise rejects.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/forEachAsync/index.ts)

<br />

## Interface

```ts title="typescript"
interface ForEachAsyncOptions {
  parallel?: boolean;
}

function forEachAsync<T>(
  arr: T[] | readonly T[],
  callback: (
    currentValue: T,
    index: number,
    arr: T[] | readonly T[]
  ) => void | Promise<void>,
  options?: ForEachAsyncOptions
): Promise<void>;
```

<br />

## Usage

### Sequential execution

```ts title="typescript"
import { forEachAsync } from '@modern-kit/utils';

const ids = [1, 2, 3];

await forEachAsync(ids, async (id, index) => {
  await deleteProduct(id);
  console.log(index, 'deleted');
  // 0 deleted
  // 1 deleted
  // 2 deleted
});

console.log('All deleted.');
```

### Parallel execution

```ts title="typescript"
import { forEachAsync } from '@modern-kit/utils';

await forEachAsync(
  [1, 2, 3],
  async (id) => {
    await deleteProduct(id);
  },
  { parallel: true }
);
```
