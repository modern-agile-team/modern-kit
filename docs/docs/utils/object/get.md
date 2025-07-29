# get

주어진 객체에서 지정된 경로에 해당하는 값을 타입 안전하게 반환하는 함수입니다.
점 표기법(dot notation)을 사용하여 중첩된 객체의 깊은 속성에 접근할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/get/index.ts)

## Interface
```ts title="typescript"
/**
 * @description 주어진 객체 타입의 실제 유효한 프로퍼티 경로를 점(.)으로 구분하여 문자열로 반환합니다.
 * 옵셔널 프로퍼티라면 옵셔널 체이닝(?)을 포함하며, 중첩된 객체의 경우 모든 깊이의 경로가 유니온 타입으로 표현됩니다.
 *
 * @example
 * PropertyPath<{ a: { b: { c: 1 } } }> // 'a' | 'a.b' | 'a.b.c'
 *
 * @example
 * PropertyPath<{ a: { b?: { c: 1 } } }> // 'a' | 'a.b' | 'a.b?.c'
 */
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
```ts title="typescript"
/**
 * @description 주어진 객체 타입에서 지정된 경로에 해당하는 값의 타입을 반환합니다.
 * 점 표기법(dot notation)을 사용하여 중첩된 객체 속성 타입에 접근할 수 있습니다.
 *
 * 주어진 객체 타입에 옵셔널 키가 있는 경우, 옵셔널(?) 경로로 접근해야 합니다.
 *
 * @param {T} obj - 객체
 * @param {P} path - 점 표기법으로 구성된 키 경로
 * @param {isUndefinable} isUndefinable - 경로에 해당하는 값이 존재하지 않을 경우 undefined를 반환할지 여부
 * @returns {GetReturnType<T, P, isUndefinable>} 경로에 해당하는 값
 *
 * @example
 * GetReturnType<{ a: { b: { c: 1 } } }, 'a'> // { b: { c: 1 } }
 * GetReturnType<{ a: { b: { c: 1 } } }, 'a.b'> // { c: 1 }
 * GetReturnType<{ a: { b: { c: 1 } } }, 'a.b.c'> // 1
 *
 * @example
 * GetReturnType<{ a: { b?: { c: 1 } } }, 'a.b?.c'> // 1 | undefined
 *
 * @example
 * GetReturnType<{ a: { b: { c: 1 } } }, 'a.b.c', true> // 1 | undefined
 */
type GetReturnType<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>,
  isUndefinable extends boolean = false
> = P extends `${infer LeftPath}.${infer RightPath}`
  ? LeftPath extends `${infer OptionalLeft}?`
    ? NonNullable<T[OptionalLeft]> extends Record<string, unknown>
      ? GetReturnType<NonNullable<T[OptionalLeft]>, RightPath, true>
      : never
    : T[LeftPath] extends Record<string, unknown>
    ? GetReturnType<T[LeftPath], RightPath, isUndefinable>
    : never
  : isUndefinable extends false
  ? T[P]
  : T[P] | undefined;
```
```ts title="typescript"
function get<T extends Record<PropertyKey, any>, K extends PropertyPath<T>>(
  obj: T,
  path: K,
  defaultValue?: GetReturnType<T, K>
): GetReturnType<T, K>;
```

## Usage
### 기본 사용법
```ts title="typescript"
import { get } from '@modern-kit/utils';

const obj: { a: { b: { c: number } } } = { a: { b: { c: 1 } } };

// 단일 속성 접근
get(obj, 'a'); // { b: { c: 1 } }

// 중첩 속성 접근
get(obj, 'a.b'); // { c: 1 }
get(obj, 'a.b.c'); // 1
```

<br />

### 옵셔널 속성 접근
```ts title="typescript"
const obj: { a: { b?: { c: number } } } = { a: { b: { c: 1 } } };

// 옵셔널 속성 접근
get(obj, 'a.b');
// value: { c: 1 }
// type: { c: 1 } | undefined

get(obj, 'a.b?.c'); 
// value: 1
// type: 1 | undefined
```

<br />

### 기본값 설정
```ts title="typescript"
const obj: { a?: { b?: { c?: number } } } = {};

get(obj, 'a', { b: { c: 1 } }); // { b: { c: 1 } }
get(obj, 'a?.b', { c: 1 }); // { c: 1 }
get(obj, 'a?.b?.c', 1); // 1
```