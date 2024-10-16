# excludeElements

1번째 매개변수로 전달된 배열을 기준으로 2번째 배열의 요소들을 제외하는 유틸 함수입니다.

원시값의 경우 명확한 타입체크를 위해 `as const` 사용을 권장드립니다.  
기본적으로 원시값에 대한 비교를 진행하며, 참조형의 경우 3번째 `iteratee` 함수 결과를 통해 제외 할 요소를 결정 할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/excludeElements/index.ts)

## Interface
```ts title="typescript"
const excludeElements: <T, U>(
  arr: T[] | readonly T[],
  target: T[] | readonly T[],
  iteratee?: ((item: T) => U) | undefined
) => T[];
```

## Usage
```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = [1, 2, 3, 4];
const excluded = [3, 4]

excludeElements(array, excluded); // [1, 2]
```

```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = ['a', 'b', 'c', 'd'];
const excluded = ['a']

excludeElements(array, excluded); // ['b', 'c', 'd']
```

```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = [[3, 'a'], [4, 'b']];
const excluded = [[3, 'a']]

excludeElements(array, excluded, (item) => JSON.stringify(item)); // [4, 'b']
```

```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = [
  { name: 'kim', address: { city: 'Seoul' } },
  { name: 'lee', address: { city: 'NewYork' } },
];
const excluded = [{ name: 'kim', address: { city: 'Seoul' } }];

excludeElements(array, excluded, (item) => item.name); // { name: 'lee', address: { city: 'NewYork' } }
```