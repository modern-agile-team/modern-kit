# retry

Promise를 반환하는 함수가 성공할 때까지 다시 시도하는 함수입니다.

재시도 횟수(`count`)와 재시도 사이 간격을 설정할 수 있습니다. 간격은 고정 간격(`delay`) 또는 지수 백오프(`backoff`)로 지정할 수 있으며, `shouldRetry`로 재시도 여부를 제어하고 `signal`로 재시도 작업을 중단할 수 있습니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/retry/index.ts)

<br />

## Interface

`retry`는 인자에 따라 아래 4가지 시그니처로 오버로딩되어 있습니다.

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

// 1. 옵션 없이 호출 (지연 없이 재시도)
function retry<T>(func: () => Promise<T>): Promise<T>;

// 2. 재시도 횟수만 전달 (지연 없이 재시도)
function retry<T>(func: () => Promise<T>, count: number): Promise<T>;

// 3. 고정 간격(delay) 옵션 전달
function retry<T>(
  func: () => Promise<T>,
  options: RetryOptionsWithDelay
): Promise<T>;

// 4. 지수 백오프(backoff) 옵션 전달
function retry<T>(
  func: () => Promise<T>,
  options: RetryOptionsWithBackoff
): Promise<T>;
```

<br />

## Parameters

| Name      | Type                                                         | Default | Description                                 |
| --------- | ------------------------------------------------------------ | ------- | ------------------------------------------- |
| `func`    | `() => Promise<T>`                                           | -       | 재시도할 Promise를 반환하는 함수입니다.     |
| `options` | `number \| RetryOptionsWithDelay \| RetryOptionsWithBackoff` | -       | 재시도 횟수(`number`) 또는 옵션 객체입니다. |

### Options

`RetryOptionsWithDelay`는 고정 간격(`delay`), `RetryOptionsWithBackoff`는 지수 백오프(`backoff`)를 사용하며, 두 옵션 타입은 `delay`/`backoff`를 제외한 나머지 속성을 공유합니다.

| Name          | Type                                                        | Default | Description                                                                                                                                                                                             |
| ------------- | ----------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `count`       | `number`                                                    | `0`     | 재시도 횟수입니다.                                                                                                                                                                                      |
| `delay`       | `number`                                                    | `0`     | (`RetryOptionsWithDelay`) 재시도 사이의 고정 간격(밀리초)입니다.                                                                                                                                        |
| `backoff`     | `number`                                                    | -       | (`RetryOptionsWithBackoff`) 지수 백오프의 시작 간격(밀리초)입니다. 매 시도마다 `backoff * 2 ** count`로 2배씩 증가합니다.                                                                               |
| `shouldRetry` | `((error: unknown, attempt: number) => boolean) \| boolean` | `true`  | 재시도 여부를 결정합니다. 함수를 전달하면 발생한 에러와 현재 시도 인덱스(`attempt`, 0부터 시작)를 인자로 받아 `boolean`을 반환하며, `false`(또는 `false` 반환) 시 재시도하지 않고 즉시 에러를 던집니다. |
| `signal`      | `AbortSignal`                                               | -       | 재시도 작업을 중단할 수 있는 `AbortSignal`입니다.                                                                                                                                                       |

<br />

## Usage

### 기본 사용법

```ts title="typescript"
import { retry } from '@modern-kit/utils';

// fetchData 함수가 성공할 때까지 지연 없이 최대 5번 재시도합니다.
const data = await retry(fetchData, 5);
```

<br />

### 고정 간격(delay) 사용

```ts title="typescript"
import { retry } from '@modern-kit/utils';

// fetchData 함수가 실패할 경우 1초(1000ms) 간격으로 최대 5번 재시도합니다.
const data = await retry(fetchData, { count: 5, delay: 1000 });
```

<br />

### 지수 백오프(backoff) 사용

```ts title="typescript"
import { retry } from '@modern-kit/utils';

// 300ms, 600ms, 1200ms... 지수 백오프 간격으로 최대 5번 재시도합니다.
const data = await retry(fetchData, { count: 5, backoff: 300 });
```

<br />

### 재시도 여부 제어(shouldRetry)

`shouldRetry` 함수는 발생한 에러와 현재 시도 인덱스(`attempt`, 0부터 시작)를 인자로 받습니다.

```ts title="typescript"
import { retry } from '@modern-kit/utils';

// isRetryable가 false를 반환하는 에러는 재시도하지 않고 즉시 던집니다.
const data = await retry(fetchData, {
  count: 5,
  delay: 1000,
  shouldRetry: (error) => isRetryable(error),
});

// attempt(0부터 시작)를 활용해 특정 시도 이후에는 재시도를 멈출 수 있습니다.
const data2 = await retry(fetchData, {
  count: 5,
  delay: 1000,
  shouldRetry: (error, attempt) => isRetryable(error) && attempt < 2,
});
```

<br />

### AbortSignal 사용

```ts title="typescript"
import { retry } from '@modern-kit/utils';

const controller = new AbortController();

// controller.abort()가 호출되면 재시도 작업이 중단됩니다.
const data = await retry(fetchData, { count: 5, signal: controller.signal });
```
