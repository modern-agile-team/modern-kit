# once

주어진 콜백 함수를 `한 번만 실행`하게 하는 함수입니다. 첫 번째 호출 이후에는 `이전에 실행된 결과를 반환`합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/once/index.ts)

## Interface
```ts title="typescript"
function once<T extends (...args: any[]) => any>(callback: T): T
```

## Usage
```ts title="typescript"
import { once } from '@modern-kit/utils';

const initialize = once(() => {
  console.log('초기화 완료');
  return true;
});

initialize(); // '초기화 완료'가 출력되며, true를 반환합니다.
initialize(); // 아무 것도 출력되지 않으며, 이전 결과인 true를 반환합니다.
```

```ts title="typescript"
import { once } from '@modern-kit/utils';

const onceSum = once((a: number, b: number) => {
  return a + b;
});

onceSum(2, 3); // 5
onceSum(3, 10); // 5, 후속 호출은 인자가 바뀌더라도 이전 결과를 반환합니다.
```