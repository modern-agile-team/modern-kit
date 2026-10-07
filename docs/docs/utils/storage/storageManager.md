# StorageManager

타입 안전성을 제공하는 브라우저 스토리지 관리 클래스입니다. `localStorage`와 `sessionStorage`를 지원하며, 제네릭 타입을 통해 데이터의 타입을 보장합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/storage/storageManager/index.ts)

<br />

## Interface

```ts title="typescript"
interface StorageData<T> {
  key: keyof T;
  value: T[keyof T];
}

interface StorageManagerOptions {
  throwOnError?: boolean;
}

type GetItemOptions = StorageManagerOptions;

class StorageManager<T extends Record<string, any>> {
  constructor(
    type: 'localStorage' | 'sessionStorage',
    options?: StorageManagerOptions
  );

  setItem<K extends keyof T>(key: K, value: T[K]): void;
  setItems(data: StorageData<T>[]): void;
  getItem<K extends keyof T>(key: K, options?: GetItemOptions): T[K] | null;
  getRawItem<K extends keyof T>(
    key: K,
    options?: GetItemOptions
  ): string | null;
  getItems<K extends keyof T>(
    keys: K[],
    options?: GetItemOptions
  ): { key: K; value: T[K] | null }[];
  removeItem<K extends keyof T>(key: K): void;
  removeItems<K extends keyof T>(keys: K[]): void;
  hasItem<K extends keyof T>(key: K): boolean;
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

## Parameters

| Name                   | Type                                 | Default | Description                                                                                    |
| ---------------------- | ------------------------------------ | ------- | ---------------------------------------------------------------------------------------------- |
| `type`                 | `'localStorage' \| 'sessionStorage'` | -       | 사용할 스토리지 타입                                                                           |
| `options.throwOnError` | `boolean`                            | `true`  | 데이터를 가져오지 못했을 때 에러를 발생시킬지 여부. `false`이면 에러 대신 `null`을 반환합니다. |

<br />

## Remarks

:::caution 주의사항

- `null`, `undefined`도 기본 스토리지와 동일하게 문자열(`'null'`, `'undefined'`)로 저장되며, `getItem`은 각각 `null`, `undefined`를 반환합니다.
- `throwOnError`는 값을 **가져오는** 메서드(`getItem`, `getRawItem`, `getItems`와 이를 사용하는 `hasItem`, `values`, `entries` 등)에만 적용됩니다.
- `hasItem`은 값을 파싱하지 않고 키의 존재 여부만 확인합니다. 값이 `null`, `undefined`가 아닌지까지 확인하려면 `getItem(key) != null`을 사용하세요.
  :::

<br />

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

<br />

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

<br />

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

<br />

### 스토리지 전체 데이터 탐색 및 초기화

```ts title="typescript"
const storage = new StorageManager<UserData>('localStorage');

storage.setItem('name', 'Jane'); // 인스턴스가 관리하는 데이터1
storage.setItem('age', 25); // 인스턴스가 관리하는 데이터2
localStorage.setItem('preferences', { theme: 'dark', language: 'ko' }); // 인스턴스가 관리하지 않는 데이터

// 스토리지 전체 키 조회
const keys = storage.keys(); // ['name', 'age', 'preferences']

// 스토리지 전체 값 조회
const values = storage.values(); // ['Jane', 25, { theme: 'dark', language: 'ko' }]

// 스토리지 전체 키-값 쌍 조회
const entries = storage.entries(); // [['name', 'Jane'], ['age', 25], ['preferences', { theme: 'dark', language: 'ko' }]]

// 스토리지 전체 저장된 데이터 수
const count = storage.size(); // 3

// 스토리지 전체 데이터 삭제
storage.clear();
```

<br />

### 인스턴스가 관리하는 스토리지 데이터 탐색 및 초기화

```ts title="typescript"
const storage = new StorageManager<UserData>('localStorage');

storage.setItem('name', 'Jane'); // 인스턴스가 관리하는 데이터1
storage.setItem('age', 25); // 인스턴스가 관리하는 데이터2
localStorage.setItem('preferences', { theme: 'dark', language: 'ko' }); // 인스턴스가 관리하지 않는 데이터

// 인스턴스가 관리하는 모든 키 조회
const keys = storage.ownKeys(); // ['name', 'age']

// 인스턴스가 관리하는 모든 값 조회
const values = storage.ownValues(); // ['Jane', 25]

// 인스턴스가 관리하는 모든 키-값 쌍 조회
const entries = storage.ownEntries(); // [['name', 'Jane'], ['age', 25]]

// 인스턴스가 관리하는 저장된 데이터 수
const count = storage.ownSize(); // 2

// 인스턴스가 관리하는 모든 데이터 삭제
storage.ownClear();
```

<br />

### 원본 문자열 조회

`getRawItem`은 저장된 값을 파싱하지 않은 원본 문자열로 가져옵니다. JSON이 아닌 값이나 `getItem`으로 파싱하지 못하는 값을 확인할 때 사용합니다.

```ts title="typescript"
storage.setItem('name', 'John');

storage.getRawItem('name'); // '"John"'
```

<br />

### 키 존재 여부 확인

`hasItem`은 값을 파싱하지 않고 키가 있는지만 확인합니다. 값이 `null`, `undefined`가 아닌지까지 확인하려면 `getItem(key) != null`을 사용합니다.

```ts title="typescript"
const storage = new StorageManager<{ name: string | null }>('localStorage');

storage.setItem('name', null);

storage.hasItem('name'); // true, 키가 있음
storage.getItem('name') != null; // false, null로 저장됨
```

<br />

### 에러 처리 (throwOnError)

기본적으로 데이터를 가져오지 못하면(잘못된 JSON, 스토리지 접근 차단 등) 에러가 발생합니다. 인스턴스 옵션으로 기본 동작을 정하고, 호출 단위 옵션으로 덮어쓸 수 있습니다. 호출 옵션이 인스턴스 옵션보다 우선합니다.

```ts title="typescript"
// 인스턴스 단위: 실패하면 null 반환
const storage = new StorageManager<UserData>('localStorage', {
  throwOnError: false,
});

storage.getItem('name'); // 실패하면 null

// 호출 단위: 이번 호출만 에러 발생
storage.getItem('name', { throwOnError: true });
```
