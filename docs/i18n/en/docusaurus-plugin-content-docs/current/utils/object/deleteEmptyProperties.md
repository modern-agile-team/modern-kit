# deleteEmptyProperties

A utility function that traverses all properties of an object, including nested objects and arrays, and returns a new object with properties removed if their values are one of the empty values listed below.

Removed values: `empty string ("")`, `empty array ([])`, `empty object ({})`, `null`, `undefined`

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/deleteFalsyProperties/index.ts)

<br />

## Interface
```ts title="typescript"
const deleteFalsyProperties: <T extends Record<PropertyKey, any>>(source: T) => T
```

<br />

## Usage
```ts title="typescript"
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
