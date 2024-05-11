# asyncNoop

아무 동작 하지 않고, `Promise<void>`를 반환하는 async 함수입니다.

<br />

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/asyncNoop/index.ts)

## Interface
```ts title="typescript"
const asyncNoop: () => Promise<void>
```

## Usage
```ts title="typescript"
import { asyncNoop } from '@modern-kit/utils';

const handleAsyncClick = (callback = asyncNoop) => {
  callback();
};
```