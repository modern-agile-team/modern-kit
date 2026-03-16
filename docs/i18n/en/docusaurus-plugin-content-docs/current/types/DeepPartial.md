# DeepPartial

A utility type that makes all properties of an object optional. It recursively transforms all properties of nested objects to optional as well.

<br />

## Interface

```ts title="typescript"
type DeepPartial<T extends Record<PropertyKey, any>> = {
  [P in keyof T]?: T[P] extends Record<PropertyKey, any>
    ? DeepPartial<T[P]>
    : T[P];
};
```

<br />

## Usage

```ts title="typescript"
import { DeepPartial } from '@modern-kit/types';

interface User {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
}

type PartialUser = DeepPartial<User>;
// {
//   name?: string;
//   age?: number;
//   address?: {
//     street?: string;
//     city?: string;
//   };
// }
```
