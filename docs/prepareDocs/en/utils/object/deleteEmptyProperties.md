# deleteEmptyProperties

A utility function that traverses all properties of an object, including nested objects/arrays, and if the value is one of the empty values listed below, returns a new object with those properties removed.

What to remove: `Empty String("")`, `Empty Array([])`, `Empty Object({})`, `null`, `undefined`

<br />

## Interface
```tsx
const deleteEmptyProperties: <T extends Record<PropertyKey, any>>(obj: T) => T
```

## Usage
```ts
import { deleteEmptyProperties } from '@modern-kit/utils';

const obj = deleteEmptyProperties({
  prop1: 1,
  prop2: 0,
  prop3: '',
  prop4: '1',
  prop5: true,
  prop6: false,
  prop7: null,
  prop8: undefined,
  prop9: [],
  prop10: {},
});

/**
 * obj = {
    prop1: 1,
    prop2: 0,
    prop4: '1',
    prop5: true,
    prop6: false,
  };
 */
```