# Promiseable

주어진 타입과 해당 타입의 `Promise` 타입을 모두 허용하는 타입입니다.

## Interface

```ts title="typescript"
type Promiseable<T> = T | Promise<T>;
```

## Usage

```ts title="typescript"
type Result = Promiseable<string>; // string | Promise<string>
``` 