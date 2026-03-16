# Primitive

JavaScript의 기본 원시 타입들을 정의하는 타입입니다. 모든 원시 타입을 포함하는 유니온 타입으로 구성되어 있습니다.

<br />

## Interface

```ts title="typescript"
type Primitive =
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined;
```

<br />

## Usage

```ts title="typescript"
import { Primitive } from '@modern-kit/types';

const stringValue: Primitive = 'hello';
const numberValue: Primitive = 42;
const booleanValue: Primitive = true;
const symbolValue: Primitive = Symbol('key');
const bigIntValue: Primitive = 123n;
const nullValue: Primitive = null;
const undefinedValue: Primitive = undefined;
```
