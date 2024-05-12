# getViewportSize

현재 `Viewport Size`를 반환하는 함수입니다.
서버 환경에서는 `{ width: 0, height: 0} `을 반환한다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/getViewportSize/index.tsx)

## Interface
```ts title="typescript"
const getViewportSize: () => {
  readonly width: number;
  readonly height: number;
}
```

## Usage
```ts title="typescript"
import { getViewportSize } from '@modern-kit/utils';

const { width, height } = getViewportSize();
```