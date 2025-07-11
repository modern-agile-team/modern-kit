# ObjectPath

객체의 모든 프로퍼티 경로를 `점(.)`으로 구분된 문자열로 반환하는 타입입니다.

중첩된 객체의 경우 각 깊이의 경로가 유니온으로 결합됩니다.

## Interface

```ts title="typescript"
type ObjectPath<T> = T extends Record<PropertyKey, any>
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends Record<PropertyKey, any> | undefined
          ? `${K}` | `${K}.${ObjectPath<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;
```

## Usage

```ts title="typescript"
type Paths = ObjectPath<{ a: string; b: { c: number; d: string } }>;
// "a" | "b" | "b.c" | "b.d"

type Paths = ObjectPath<string>;
// never
``` 