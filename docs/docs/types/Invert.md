# Invert

객체의 키(key)와 값(value)을 서로 바꾸는 타입입니다.

<br />

## Interface

```ts title="typescript"
type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T as T[K]]: K;
};
```

<br />

## Usage

```ts title="typescript"
import { Invert } from '@modern-kit/types';

type OriginObj = { a: 'x', b: 'y' };
type InvertedObj = Invert<OriginObj>; // { x: 'a', y: 'b' }
```
