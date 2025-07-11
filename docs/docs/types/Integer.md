# Integer

주어진 숫자 타입이 `정수`인지 확인하는 타입입니다. 정수가 아닐 경우 `never`를 반환합니다.

## Interface

```ts title="typescript"
type Integer<T extends number> = `${T}` extends `${string}.${string}`
  ? never
  : T;
```

## Usage

```ts title="typescript"
type ValidInteger = Integer<1>; // 1

type InvalidInteger = Integer<1.5>; // never
``` 