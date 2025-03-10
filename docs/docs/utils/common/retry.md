# retry

Promise를 반환하는 함수가 성공할 때까지 다시 시도하는 함수입니다.

재시도 횟수와 재시도 사이 간격을 설정할 수 있습니다. AbortSignal을 전달하여 재시도 작업을 중단할 수 있습니다.

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/retry/index.ts)


## Interface
```ts title="typescript"
function retry<T>(func: () => Promise<T>): Promise<T>;
function retry<T>(func: () => Promise<T>, count: number = 3): Promise<T>;
function retry<T>(func: () => Promise<T>, { count, delay, signal }: RetryOptions): Promise<T>;
```

## Usage
```ts title="typescript"
import { retry } from '@modern-kit/utils';

// fetchData 함수가 성공할 때까지 최대 5번 재시도합니다.
const data = await retry(fetchData, 5);

// fetchData 함수가 실패할 경우 1초 간격으로 최대 5번 재시도합니다.
const data = await retry(fetchData, { count: 5, delay: 1000 });

const controller = new AbortController();

// controller.abort()가 호출되면 재시도 작업이 중단됩니다.
const data = await retry(fetchData, { count: 5, controller.signal });
```