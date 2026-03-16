# throttle

스로틀링된 함수를 생성합니다.

스로틀링된 함수는 첫 번째 호출은 즉시 실행 되고, 이후 지연 시간(`wait` 밀리초) 간격으로만 실행됩니다.

지정된 시간 간격마다 최대 한 번만 실행하여 호출 빈도를 제한합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/throttle/index.ts)

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
### 기본 사용법
```ts title="typescript"
import { throttle } from '@modern-kit/utils';

const logMessage = (message: string) => {
  console.log(message);
};

const throttledLog = throttle(logMessage, 1000);

throttledLog('첫 번째 호출'); // 즉시 실행
throttledLog('두 번째 호출'); // 지연 시간 간격으로 실행됩니다.
```

<br />

### AbortSignal 사용법
```ts title="typescript"
import { throttle } from '@modern-kit/utils';

const handleScroll = () => {
  console.log('스크롤 이벤트');
};

const controller = new AbortController();
controller.abort(); // 스로틀링된 함수 호출을 취소합니다.

const throttledScroll = throttle(handleScroll, 1000, { signal: controller.signal });

throttledScroll(); // 호출되지 않습니다.
```