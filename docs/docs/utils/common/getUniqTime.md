# getUniqTime

기본적으로 `new Date().getTime()` 값을 반환하는 함수이지만, 동일 시간에 여러번 호출 할 경우 유니크 값을 반환하는 함수입니다.


<br />

## Interface
```tsx
const getUniqTime: () => number
```

## Usage
```ts
import { getUniqTime } from '@modern-kit/utils';

const uniqTime = getUniqTime();
```