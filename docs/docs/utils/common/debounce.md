# debounce

디바운스된 함수를 생성합니다.

디바운스된 함수는 마지막으로 호출된 시점으로부터 `wait` 밀리초가 경과할 때까지 제공된 함수의 실행을 지연시킵니다.

연속 호출 시 이전 호출은 취소되고 새로운 타이머가 시작됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/debounce/index.ts)

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

## Usage
### 기본 사용법
```ts title="typescript"
import { debounce } from '@modern-kit/utils';

const logMessage = (message: string) => {
  console.log(message);
};

const debouncedLog = debounce(logMessage, 1000);

debouncedLog('첫 번째 호출'); // 지연 시간(1초) 이후에 실행됩니다.
```


### AbortSignal 사용법
```ts title="typescript"
import { debounce } from '@modern-kit/utils';

const handleClick = () => {
  console.log('클릭 이벤트');
};

const controller = new AbortController();

const debouncedClick = debounce(handleClick, 1000, { signal: controller.signal });

debouncedClick();

controller.abort(); // 디바운스된 함수 호출을 취소합니다.
```