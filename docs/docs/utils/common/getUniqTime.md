# getUniqTime

기본적으로 `new Date().getTime()` 값을 반환하는 함수이지만, 동일 시간에 여러번 호출 할 경우 유니크 값을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/getUniqTime/index.ts)

## Interface
```ts title="typescript"
const getUniqTime: () => number
```

## Usage
```ts title="typescript"
import { getUniqTime } from '@modern-kit/utils';

const uniqTime = getUniqTime();
```