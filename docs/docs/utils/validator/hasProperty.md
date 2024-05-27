# hasProperty

객체가 지정된 프로퍼티를 포함하고 있는지를 나타내는 `boolean`을 반환하는 함수입니다. 만약, true라면 프로퍼티의 타입이 좁혀집니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/hasProperty/index.ts)

## Interface
```ts title="typescript"
const hasProperty: <T extends Record<PropertyKey, any>, K extends PropertyKey>(
  obj: T,
  key: K
) => key is K & keyof T;
```

## Usage
```ts title="typescript"
import { hasProperty } from '@modern-kit/utils';

const exampleObj = { foo: 'foo', bar: 'bar' } as const;

const exampleKey1 = 'foo' as string;
const exampleKey2 = 'zoo' as string;

hasProperty(exampleObj, exampleKey1); // true
// const exampleKey1: "foo" | "bar"
hasProperty(exampleObj, exampleKey2); // false
// const exampleKey2: string
```
