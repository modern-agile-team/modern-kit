# createSingleRequest

단일 비동기 실행만 허용하는 함수 래퍼를 생성하는 팩토리 함수입니다.

반환된 함수로 래핑한 비동기 함수는 진행 중인 호출이 있을 때 중복 실행되지 않고, 완료 후에는 다시 호출할 수 있습니다. 

`debounce/throttle`는 함수의 중복 호출을 방지하는 데 대부분의 경우에 효과적입니다.
하지만, `debounce/throttle`는 비동기 작업의 완료를 보장하지 않기 때문에 다음과 같은 한계가 있습니다:

1. `debounce/throttle` 시간이 API 응답 시간보다 짧을 경우: 비동기 작업이 완료되지 않은 상태에서 `다시 호출`될 수 있습니다.
2. `debounce/throttle` 시간이 API 응답 시간보다 길 경우: 비동기 작업이 완료되었지만 `버튼`과 같은 요소가 여전히 `비활성화`되어 있을 수 있습니다.
3. `즉각적인 반응`을 원하는 경우: `debounce/throttle`는 호출을 지연시키기 때문에 사용자에게 `즉각적인 반응`을 보여주기에 제한적입니다.
4. `debounce/throttle`은 `시간`을 기반으로 동작하기 때문에 `얼마나 자주 실행`되는지가 중요하지 `중복 호출 여부`를 파악하기 어렵습니다.

위와 같은 한계점을 대응하고자 한다면 `createSingleRequest`를 사용할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/createSingleRequest/index.ts)

## Interface
```ts title="typescript"
function createSingleRequest(key?: string): <T, Args extends unknown[]>(
  callback: (...args: Args) => Promise<T>
) => (...args: Args) => Promise<T | undefined>;
```

## Parameters
| Name | Type | Description | Required |
|------|------|-------------|----------|
| key | string | 고유한 식별자 | No | 

## Usage
### 기본 사용법
```ts title="typescript"
import { createSingleRequest } from '@modern-kit/utils';

const singleRequest = createSingleRequest();
const wrappedFetch = singleRequest(fetchData);

wrappedFetch(); // 실행됨
wrappedFetch(); // 진행 중이므로 무시됨 (undefined 반환)
wrappedFetch(); // 진행 중이므로 무시됨 (undefined 반환)
// 첫 번째 호출이 완료된 뒤에는 다시 호출 가능
```

### 여러 비동기 함수가 하나의 잠금 공유
```ts title="typescript"
import { createSingleRequest } from '@modern-kit/utils';

const singleRequest = createSingleRequest();
const wrappedSubmit = singleRequest(submitForm);
const wrappedSync = singleRequest(syncData);

// wrappedSubmit이 진행 중이면 wrappedSync 호출도 블록됨 (같은 잠금 공유)
wrappedSubmit();
wrappedSync(); // undefined 반환, 실행되지 않음
```

### 다중 인스턴스 사용(key 전달 권장)
```ts title="typescript"
import { createSingleRequest } from '@modern-kit/utils';

const singleRequest1 = createSingleRequest('test1');
const singleRequest2 = createSingleRequest('test2');

const wrappedSubmit1 = singleRequest1(submitForm);
const wrappedSubmit2 = singleRequest2(submitForm);
```

### 인자 전달
```ts title="typescript"
import { createSingleRequest } from '@modern-kit/utils';

const singleRequest = createSingleRequest();
const wrappedFetch = singleRequest(async (id: number) => {
  const res = await fetch(`/api/items/${id}`);
  return res.json();
});

const data = await wrappedFetch(42); // 콜백에 42가 전달됩니다.
```
