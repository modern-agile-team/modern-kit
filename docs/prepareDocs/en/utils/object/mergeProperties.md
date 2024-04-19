# mergeProperties

a utility function that merges the properties of the target and source objects.

When the keys are the same, the value is overwritten with the value from source if it is a primitive type, or returns an array with both target and source elements if it is an array.

<br />

## Interface
```tsx
const mergeProperties: <
  T extends Record<PropertyKey, any>,
  K extends Record<PropertyKey, any>
>(
  target: T,
  source: K
) => T & K;
```

## Usage
```ts
import { mergeProperties } from '@modern-kit/utils';

  const target = {
    a: 1,
    b: 2,
    c: {
      c_a: 1,
      c_b: 2,
    },
    d: 4,
    e: [1, 2],
  };
  const source = {
    c: {
      c_c: 3,
      c_d: 4,
    },
    d: 5,
    e: [3, 4],
  };

  const obj = mergeProperties(target, source);

/**
 *  obj = {
    a: 1,
    b: 2,
    c: {
      c_a: 1,
      c_b: 2,
      c_c: 3,
      c_d: 4,
    },
    d: 5,
    e: [1, 2, 3, 4],
  };
  */
```