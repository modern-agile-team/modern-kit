# PropertyAllPath

주어진 객체 타입의 모든 프로퍼티 경로를 `점(.)`으로 구분하여 문자열로 반환합니다.
`옵셔널 체이닝(?)` 경로도 모두 포함하며, 중첩된 객체의 경우 모든 깊이의 경로가 `유니온 타입`으로 표현됩니다.

- **PropertyPath와 차이점**
  - 모든 프로퍼티에 대해 옵셔널/논옵셔널 경로를 모두 포함
  - 깊이 제한 없음

## Interface

```ts title="typescript"
type PropertyAllPath<T> = T extends Record<PropertyKey, any>
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends Record<PropertyKey, any> | undefined
          ?
              | `${K}`
              | `${K}.${PropertyAllPath<T[K]>}`
              | `${K}?.${PropertyAllPath<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;
```

## Usage

```ts title="typescript"
type Paths = PropertyAllPath<{ a: string; b: { c: number; d: string } }>;
// "a" | "b" | "b.c" | "b.d" | "b?.c" | "b?.d"
``` 