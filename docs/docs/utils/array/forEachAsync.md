# forEachAsync

주어진 배열의 각 요소에 대해 제공된 `콜백 함수`를 호출하되, 콜백이 반환한 Promise 의 완료를 기다립니다.

기본값은 **순차 실행**으로, 이전 요소의 콜백이 완료된 뒤에 다음 요소의 콜백을 호출합니다. 병렬 실행을 원하면 `options.parallel`을 `true`로 설정하세요. 단, 병렬 실행 시 각 요소의 완료 순서는 보장되지 않습니다.

콜백에서 에러가 발생하면 (순차 실행 시) 남은 요소를 처리하지 않고 reject 됩니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/forEachAsync/index.ts)

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

### 순차 실행

```ts title="typescript"
import { forEachAsync } from '@modern-kit/utils';

const ids = [1, 2, 3];

await forEachAsync(ids, async (id, index) => {
  await deleteProduct(id);
  console.log(index, '번째 삭제 완료');
  // 0 번째 삭제 완료
  // 1 번째 삭제 완료
  // 2 번째 삭제 완료
});

console.log('모두 삭제되었습니다.');
```

### 병렬 실행

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
