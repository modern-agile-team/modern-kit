# PropertyPath

주어진 객체 타입의 실제 유효한 프로퍼티 경로를 `점(.)`으로 구분하여 문자열로 반환합니다.
옵셔널 프로퍼티에만 `옵셔널 체이닝(?)`을 포함하며, 중첩된 객체의 경우 모든 깊이의 경로가 `유니온 타입`으로 표현됩니다.

- **PropertyAllPath와 차이점**
  - 깊이 제한 (10레벨)
  - 실제 옵셔널 프로퍼티에만 `옵셔널` 경로 포함

## Interface

```ts title="typescript"
type PropertyPath<
  T,
  Limit extends unknown[] = []
> = Limit['length'] extends 10
  ? never
  : {
      [K in keyof T & string]: T[K] extends
        | Record<PropertyKey, unknown>
        | undefined
        ?
            | K
            | (T[K] extends Record<PropertyKey, unknown>
                ? `${K}.${PropertyPath<T[K], [...Limit, unknown]>}`
                : `${K}?.${PropertyPath<
                    NonNullable<T[K]>,
                    [...Limit, unknown]
                  >}`)
        : K;
    }[keyof T & string];
```

## Usage

```ts title="typescript"
type Paths = PropertyPath<{ a: string; b: { c: number; d: string } }>;
// "a" | "b" | "b.c" | "b.d"

type Paths = PropertyPath<{ a: string; b?: { c: number; d: string } }>;
// "a" | "b" | "b?.c" | "b?.d"
```