# isWindow

주어진 인자가 `window` 객체인지 확인하고, 맞다면 인자의 타입을 `Window`로 타입을 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isWindow/index.ts)

## Interface
```ts title="typescript"
function isWindow(element: unknown): element is Window
```

## Usage
```ts title="typescript"
import { isWindow } from '@modern-kit/utils';

const div = document.createElement('div');

isWindow(window); // true

isWindow(window.document); // false
isWindow({}); // false
isWindow(div); // false
isWindow(1); // false
isWindow(''); // false
```