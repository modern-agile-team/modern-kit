# noop

아무 동작 하지 않고, `undefined`를 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/noop/index.ts)

## Interface
```ts title="typescript"
const noop: () => void
```

## Usage
```ts title="typescript"
import { noop } from '@modern-kit/utils';

const handleClick = (callback = noop) => {
  callback();
};
```