# StorageManager

A browser storage management class that provides type safety. It supports both `localStorage` and `sessionStorage`, and guarantees data types through generic types.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/storage/storageManager/index.ts)

<br />

## Interface
```ts title="typescript"
interface StorageData<T> {
  key: keyof T;
  value: T[keyof T];
}

class StorageManager<T extends Record<string, any>> {
  constructor(type: 'localStorage' | 'sessionStorage');

  setItem<K extends keyof T>(key: K, value: T[K]): void;
  setItems(data: StorageData<T>[]): void;
  getItem<K extends keyof T>(key: K): T[K] | null;
  getItems<K extends keyof T>(keys: K[]): { key: K; value: T[K] | null }[];
  removeItem<K extends keyof T>(key: K): void;
  removeItems<K extends keyof T>(keys: K[]): void;
  keys(): (keyof T)[];
  values(): (T[keyof T] | null)[];
  entries(): [keyof T, T[keyof T] | null][];
  clear(): void;
  size(): number;
  ownKeys(): (keyof T)[];
  ownValues(): (T[keyof T] | null)[];
  ownEntries(): [keyof T, T[keyof T] | null][];
  ownClear(): void;
  ownSize(): number;
}
```

<br />

## Usage

### Basic Usage
```ts title="typescript"
import { StorageManager } from '@modern-kit/utils';

interface UserData {
  name: string;
  age: number;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
  };
}

// Using localStorage
const localStorage = new StorageManager<UserData>('localStorage');

// Using sessionStorage
const sessionStorage = new StorageManager<UserData>('sessionStorage');
```

<br />

### Single Item Operations
```ts title="typescript"
// Save data
localStorage.setItem('name', 'John');
localStorage.setItem('age', 30);
localStorage.setItem('preferences', { theme: 'dark', language: 'ko' });

// Read data
const name = localStorage.getItem('name');
// value: 'John'
// type: string | null

const age = localStorage.getItem('age');
// value: 30
// type: number | null

// Delete data
localStorage.removeItem('name');
```

<br />

### Multiple Items Operations
```ts title="typescript"
// Save multiple items at once
localStorage.setItems([
  { key: 'name', value: 'Jane' },
  { key: 'age', value: 25 },
]);

// Read multiple items at once
const items = localStorage.getItems(['name', 'age']);
// value: [{ key: 'name', value: 'Jane' }, { key: 'age', value: 25 }]
// type: { key: 'name' | 'age'; value: string | number | null }[]

// Delete multiple items at once
localStorage.removeItems(['name', 'age']);
```

<br />

### Browsing and Clearing All Storage Data
```ts title="typescript"
const storage = new StorageManager<UserData>('localStorage');

storage.setItem('name', 'Jane'); // data1 managed by the instance
storage.setItem('age', 25); // data2 managed by the instance
localStorage.setItem('preferences', { theme: 'dark', language: 'ko' }); // data not managed by the instance

// Get all keys in storage
const keys = storage.keys(); // ['name', 'age', 'preferences']

// Get all values in storage
const values = storage.values(); // ['Jane', 25, { theme: 'dark', language: 'ko' }]

// Get all key-value pairs in storage
const entries = storage.entries(); // [['name', 'Jane'], ['age', 25], ['preferences', { theme: 'dark', language: 'ko' }]]

// Total number of items stored in storage
const count = storage.size(); // 3

// Delete all data in storage
storage.clear();
```

<br />

### Browsing and Clearing Instance-Managed Storage Data
```ts title="typescript"
const storage = new StorageManager<UserData>('localStorage');

storage.setItem('name', 'Jane'); // data1 managed by the instance
storage.setItem('age', 25); // data2 managed by the instance
localStorage.setItem('preferences', { theme: 'dark', language: 'ko' }); // data not managed by the instance

// Get all keys managed by the instance
const keys = storage.ownKeys(); // ['name', 'age']

// Get all values managed by the instance
const values = storage.ownValues(); // ['Jane', 25]

// Get all key-value pairs managed by the instance
const entries = storage.ownEntries(); // [['name', 'Jane'], ['age', 25]]

// Number of items stored managed by the instance
const count = storage.ownSize(); // 2

// Delete all data managed by the instance
storage.ownClear();
```
