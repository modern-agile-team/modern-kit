# Arrayable

주어진 원시 타입과 해당 원시 타입으로 이뤄진 배열 타입을 모두 허용하는 타입입니다.

## Interface

```ts title="typescript"
type Arrayable<T> = T | T[];
```

## Usage

```ts title="typescript"
type Result = Arrayable<string>; // string | string[]
```
