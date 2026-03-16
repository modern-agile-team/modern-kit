# DeepRequired

A utility type that makes all properties of an object required. It recursively transforms all properties of nested objects to required as well.

<br />

## Interface

```ts title="typescript"
type DeepRequired<T extends Record<PropertyKey, any>> = {
  [P in keyof T]-?: T[P] extends Record<PropertyKey, any> | undefined
    ? DeepRequired<T[P]>
    : T[P];
};
```

<br />

## Usage

```ts title="typescript"
import { DeepRequired } from '@modern-kit/types';

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
