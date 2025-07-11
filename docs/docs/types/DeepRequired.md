# DeepRequired

객체의 모든 속성을 필수(required)로 만드는 유틸 타입입니다. 중첩된 객체의 경우에도 재귀적으로 모든 속성을 필수로 변환합니다.

## Interface

```ts title="typescript"
type DeepRequired<T extends Record<PropertyKey, any>> = {
  [P in keyof T]-?: T[P] extends Record<PropertyKey, any> | undefined
    ? DeepRequired<T[P]>
    : T[P];
};
```

## Usage

```ts title="typescript"
interface User {
  name?: string;
  age?: number;
  address?: {
    street?: string;
    city?: string;
  };
}

type RequiredUser = DeepRequired<User>;
// {
//   name: string;
//   age: number;
//   address: {
//     street: string;
//     city: string;
//   };
// }
``` 