# excludeElements

1번째 매개변수로 전달된 배열에서, 2번째 이후의 값을 제외하여 반환하는 유틸 함수입니다.

원시값의 경우 명확한 타입체크를 위해 `as const` 사용을 권장드립니다.  
원시값이 아닌 `object` 타입인 경우 `JSON.stringify`를 통해 동등성을 비교합니다.


<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/excludeElements/index.ts)

## Interface
```ts title="typescript"
const excludeElements: <T, U extends T>(
  array: T[] | readonly T[],
  ...args: U[] | readonly U[]
) => T[];
```

## Usage
```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = [1, 2, 3, 4];
const excluded = [3, 4]

excludeElements(array, ...excluded); // [1, 2]
```

```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = ['a', 'b', 'c', 'd'];
const excluded = ['a']

excludeElements(array, ...excluded); // ['b', 'c', 'd']
```

```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = [[3, 'a'], [4, 'b']];
const excluded = [[3, 'a']]

excludeElements(array, ...excluded); // [4, 'b']
```

```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = [
  { name: 'kim', address: { city: 'Seoul' } },
  { name: 'lee', address: { city: 'NewYork' } },
];
const excluded = [{ name: 'kim', address: { city: 'Seoul' } }];

excludeElements(array, ...excluded); // { name: 'lee', address: { city: 'NewYork' } }
```

## Caveats

- 2번째 이후의 매개변수의 형태는 `이터러블` 혹은 `리스트(1, 2, 3..)` 형태입니다.