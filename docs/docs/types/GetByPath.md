# GetByPath

주어진 객체 타입에서 지정된 경로에 해당하는 값의 타입을 반환합니다.
`점 표기법(dot notation)`을 사용하여 중첩된 객체 속성 타입에 접근할 수 있습니다.

주어진 객체 타입에 옵셔널 키가 있는 경우, `옵셔널(?) 경로`로 접근해야 합니다. 옵셔널 경로로 접근하는 경우, `undefined`를 타입에 포함하여 반환합니다.

`isUndefinable` 파라미터를 `true`로 설정하면, undefined를 타입에 포함하여 반환합니다.

## Interface
```ts title="typescript"
import type { PropertyPath } from '../PropertyPath';

type GetByPath<
  T extends Record<PropertyKey, unknown>,
  P extends PropertyPath<T>,
  isUndefinable extends boolean = false
> = P extends `${infer LeftPath}.${infer RightPath}`
  ? LeftPath extends `${infer OptionalLeft}?`
    ? NonNullable<T[OptionalLeft]> extends Record<PropertyKey, unknown>
      ? GetByPath<NonNullable<T[OptionalLeft]>, RightPath, true>
      : never
    : T[LeftPath] extends Record<PropertyKey, unknown>
    ? GetByPath<T[LeftPath], RightPath, isUndefinable>
    : never
  : isUndefinable extends false
  ? T[P]
  : T[P] | undefined;
```

## Usage
### 기본 케이스
```ts title="typescript"
type Example1 = GetByPath<{ a: { b: { c: 1 } } }, 'a'> // { b: { c: 1 } }
type Example2 = GetByPath<{ a: { b: { c: 1 } } }, 'a.b'> // { c: 1 }
type Example3 = GetByPath<{ a: { b: { c: 1 } } }, 'a.b.c'> // 1
```

<br />

### 옵셔널 프로퍼티 사용 케이스
```ts title="typescript"
type Example4 = GetByPath<{ a: { b?: { c: 1 } } }, 'a.b?.c'> // 1 | undefined
```

<br />

### isUndefinable 사용 케이스
```ts title="typescript"
type Example5 = GetByPath<{ a: { b: { c: 1 } } }, 'a.b.c', true> // 1 | undefined
``` 