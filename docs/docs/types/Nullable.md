# Nullable

제네릭 타입으로 넣어준 타입과 더불어 `null`을 허용하는 타입입니다.

## Interface

```ts title="typescript"
type Nullable<T> = T | null;
```

## Usage

```ts title="typescript"
type Test = Nullable<string>; // string | null

const test: Nullable<string> = 'test';
const test2: Nullable<string> = null;
``` 