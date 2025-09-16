# StorageManager

타입 안전성을 제공하는 브라우저 스토리지 관리 클래스입니다. `localStorage`와 `sessionStorage`를 지원하며, 제네릭 타입을 통해 데이터의 타입을 보장합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/storage/storageManager/index.ts)

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
}
```

## Usage

### 기본 사용법
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

// localStorage 사용
const localStorage = new StorageManager<UserData>('localStorage');

// sessionStorage 사용
const sessionStorage = new StorageManager<UserData>('sessionStorage');
```

### 단일 데이터 조작
```ts title="typescript"
// 데이터 저장
localStorage.setItem('name', 'John');
localStorage.setItem('age', 30);
localStorage.setItem('preferences', { theme: 'dark', language: 'ko' });

// 데이터 조회
const name = localStorage.getItem('name'); 
// value: 'John'
// type: string | null

const age = localStorage.getItem('age'); 
// value: 30
// type: number | null

// 데이터 삭제
localStorage.removeItem('name');
```

### 다중 데이터 조작
```ts title="typescript"
// 여러 데이터 한번에 저장
localStorage.setItems([
  { key: 'name', value: 'Jane' },
  { key: 'age', value: 25 },
]);

// 여러 데이터 한번에 조회
const items = localStorage.getItems(['name', 'age']);
// value: [{ key: 'name', value: 'Jane' }, { key: 'age', value: 25 }]
// type: { key: 'name' | 'age'; value: string | number | null }[]

// 여러 데이터 한번에 삭제
localStorage.removeItems(['name', 'age']);
```

### 스토리지 탐색
```ts title="typescript"
// * name, age, preferences 저장되어 있는 상태 가정

// 모든 키 조회
const keys = localStorage.keys(); 
// value: ['name', 'age', 'preferences']
// type: (keyof UserData)[]

// 모든 값 조회
const values = localStorage.values(); 
// value: ['John', 30, { theme: 'dark', language: 'ko' }]
// (string | number | { theme: 'light' | 'dark'; language: string; } | null)[]

// 모든 키-값 쌍 조회
const entries = localStorage.entries();
// value: [['name', 'John'], ['age', 30], ['preferences', { theme: 'dark', language: 'ko' }]]
// type: [keyof UserData, string | number | { theme: 'light' | 'dark'; language: string; } | null][]

// 저장된 데이터 수
const count = localStorage.size(); 
// value: 3
// type: number
```

### 스토리지 초기화
```ts title="typescript"
// 모든 데이터 삭제
localStorage.clear();
```