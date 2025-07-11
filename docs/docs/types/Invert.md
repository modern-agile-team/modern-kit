# Invert

객체의 key와 value을 서로 바꾸는 타입입니다.

## Interface

```ts title="typescript"
type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T as T[K]]: K;
};
```

## Usage

```ts title="typescript"
type originObj = { a: "x", b: "y" };
type invertedObj = Invert<originObj>; // { x: "a", y: "b" }
``` 