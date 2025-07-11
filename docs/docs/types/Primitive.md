# Primitive

JavaScript의 기본 원시 타입들을 정의하는 타입입니다. 모든 원시 타입을 포함하는 유니온 타입으로 구성되어 있습니다.

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

## Usage

```ts title="typescript"
type StringValue: Primitive = "hello";
type NumberValue: Primitive = 42;
type BooleanValue: Primitive = true;
type SymbolValue: Primitive = Symbol("key");
type BigIntValue: Primitive = 123n;
type NullValue: Primitive = null;
type UndefinedValue: Primitive = undefined;
``` 