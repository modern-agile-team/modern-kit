# delay

주어진 시간만큼 기다린 뒤 다음 동작을 수행할 수 있도록 하는 함수입니다.

setTimeout을 사용하여 특정 시간 뒤의 동작을 정의할 경우, 해당 시간 뒤 동작해야하는 함수 다음에 Promise가 존재한다면 setTimeout은 macroTaskQueue에 속하고 Promise는 microTaskQueue에 속하게 되어 의도한 바와 같이 순서대로의 동작을 보장하지 못할 수 있습니다. delay 함수를 사용한다면 이러한 문제를 해결할 수 있습니다.

<br />

## Interface
```tsx
const delay: (time: number) => Promise<void>
```

## Usage
```ts
import { delay } from '@modern-kit/utils';

const something = () => Promise.resolve()

const doSomethingAfterDelay = async () => {
  await delay(1000)
  await something()
}
```