# mapValues

주어진 객체의 각 값에 대해 제공된 `변환 함수`를 호출하여 새 객체를 생성하는 함수입니다. 반환된 객체는 원본 객체의 값들을 복사하여 변환한 후 생성된 새로운 객체입니다.

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/mapValues/index.ts)

## Interface

```ts title="typescript"
function mapValues<T extends Record<PropertyKey, any>, V>(
  object: T,
  iteratee: (iterateData: { key: keyof T; value: T[keyof T]; object: T }) => V
): Record<keyof T, V>
```

## Usage

```ts title="typescript"
import { mapValues } from '@modern-kit/utils';

const users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 }
};

const newUsers = mapValues(users, ({ value }) => value.age);
// { fred: 40, pebbles: 1 }
```