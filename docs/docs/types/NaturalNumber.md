# NaturalNumber

자연수를 나타내는 타입입니다. (0보다 큰 양의 정수)

## Interface

```ts title="typescript"
type NaturalNumber<T extends number> = `${T}` extends
  | `${number}.${number}`
  | `-${string}`
  | '0'
  ? never
  : T;
```

## Usage

```ts title="typescript"
type ValidNaturalNumber1 = NaturalNumber<1>; // 1
type ValidNaturalNumber2 = NaturalNumber<10>; // 10

type InvalidNaturalNumber1 = NaturalNumber<0>; // never
type InvalidNaturalNumber2 = NaturalNumber<-1>; // never
type InvalidNaturalNumber3 = NaturalNumber<1.5>; // never
``` 