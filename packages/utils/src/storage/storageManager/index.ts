import { parseJSON } from '../../common/parseJSON';

interface StorageData<T> {
  key: keyof T;
  value: T[keyof T];
}

/**
 * @description 스토리지 관리 클래스
 *
 * @template T - 스토리지에 저장할 데이터의 타입
 * @param {'localStorage' | 'sessionStorage'} type - 스토리지 타입 (localStorage 또는 sessionStorage)
 *
 * @method setItem - 스토리지에 단일 데이터를 저장합니다.
 * @method getItem - 스토리지에서 단일 데이터를 가져옵니다.
 * @method setItems - 스토리지에 여러 데이터를 한번에 저장합니다.
 * @method getItems - 스토리지에서 여러 데이터를 한번에 가져옵니다.
 * @method removeItem - 스토리지에서 단일 데이터를 삭제합니다.
 * @method removeItems - 스토리지에서 여러 데이터를 한번에 삭제합니다.
 *
 * @method keys - 스토리지에 저장된 모든 키를 반환합니다.
 * @method values - 스토리지에 저장된 모든 값을 반환합니다.
 * @method entries - 스토리지에 저장된 모든 키-값 쌍을 반환합니다.
 * @method clear - 스토리지의 모든 데이터를 삭제합니다.
 * @method size - 스토리지에 저장된 데이터의 개수를 반환합니다.
 *
 * @method ownKeys - 현재 인스턴스가 관리하는 키를 반환합니다.
 * @method ownValues - 현재 인스턴스가 관리하는 값을 반환합니다.
 * @method ownEntries - 현재 인스턴스가 관리하는 키-값 쌍을 반환합니다.
 * @method ownClear - 현재 인스턴스가 관리하는 데이터를 스토리지에서 삭제합니다.
 * @method ownSize - 현재 인스턴스가 관리하는 데이터의 개수를 반환합니다.
 *
 * @example
 * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
 *
 * storage.setItem('name', 'John');
 * storage.getItem('name'); // 'John'
 * storage.removeItem('name');
 */
export class StorageManager<T extends Record<string, any>> {
  private storageType: 'localStorage' | 'sessionStorage';
  private managedKeys: Set<keyof T>;

  constructor(type: 'localStorage' | 'sessionStorage') {
    this.storageType = type;
    this.managedKeys = new Set();
  }

  private get storage(): Window['localStorage'] | Window['sessionStorage'] {
    if (typeof window === 'undefined') {
      throw new Error('Storage를 지원하는 환경이 아닙니다');
    }
    return window[this.storageType];
  }

  /**
   * @description 스토리지에 단일 데이터를 저장합니다.
   *
   * @param {keyof T} key - 저장할 데이터의 키
   * @param {T[keyof T]} value - 저장할 데이터의 값
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   * storage.setItem('name', 'John');
   */
  setItem<K extends keyof T>(key: K, value: T[K]): void {
    if (value == null) {
      return;
    }

    this.storage.setItem(key as string, JSON.stringify(value));
    this.managedKeys.add(key);
  }

  /**
   * @description 스토리지에 여러 데이터를 한번에 저장합니다.
   *
   * key가 같은 경우 뒤에 오는 데이터가 덮어씁니다.
   *
   * @param {StorageData<T>[]} data - 저장할 데이터의 배열
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   * storage.setItems([{ key: 'name', value: 'John' }, { key: 'age', value: 30 }]);
   */
  setItems(data: StorageData<T>[]): void {
    data.forEach(({ key, value }) => {
      this.setItem(key, value);
    });
  }

  /**
   * @description 스토리지에 저장된 단일 데이터를 가져옵니다.
   *
   * @param {keyof T} key - 가져올 데이터의 키
   *
   * @returns {T[keyof T] | null} - 가져온 데이터의 값
   *
   * @throws {Error} - 데이터를 가져오는데 실패할 경우 오류를 발생시킵니다.
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   * storage.getItem('name'); // 'John'
   * // type: string | null
   */
  getItem<K extends keyof T>(key: K): T[K] | null {
    try {
      const getItem = this.storage.getItem(key as string);

      if (getItem == null || getItem === 'undefined') {
        return null;
      }

      return parseJSON(getItem);
    } catch (err) {
      throw new Error(`"${String(key)}" 아이템을 가져오는데 실패했습니다"`, {
        cause: err,
      });
    }
  }

  /**
   * @description 스토리지에 저장된 여러 데이터를 한번에 가져옵니다.
   *
   * @template K - 가져올 데이터의 키 타입
   * @param {K[]} keys - 가져올 데이터의 키 배열
   *
   * @returns {{ key: K; value: T[K] | null }[]} - 가져온 데이터의 값 배열. 매칭되는 키에 대해 데이터가 없으면 null을 반환합니다.
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   * storage.getItems(['name', 'age']); // [{ key: 'name', value: 'John' }, { key: 'age', value: 30 }]
   * // type: {
   * //   key: "name" | "age";
   * //   value: string | number | null;
   * // }[]
   */
  getItems<K extends keyof T>(keys: K[]): { key: K; value: T[K] | null }[] {
    return keys.map((key) => {
      return {
        key,
        value: this.getItem(key),
      };
    });
  }

  /**
   * @description 스토리지에 저장된 데이터를 삭제합니다.
   *
   * @param {keyof T} key - 삭제할 데이터의 키
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   * storage.removeItem('name');
   */
  removeItem<K extends keyof T>(key: K): void {
    this.storage.removeItem(key as string);
    this.managedKeys.delete(key);
  }

  /**
   * @description 스토리지에 저장된 여러 데이터를 한번에 삭제합니다.
   *
   * @param {keyof T[]} keys - 삭제할 데이터의 키 배열
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   * storage.removeItems(['name', 'age']);
   */
  removeItems<K extends keyof T>(keys: K[]): void {
    keys.forEach((key) => {
      this.removeItem(key);
    });
  }

  /**
   * @description 스토리지에 저장된 데이터가 있는지 확인합니다.
   *
   * @param {keyof T} key - 확인할 데이터의 키
   *
   * @returns {boolean} - 데이터가 있으면 true, 없으면 false
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   *
   * storage.setItem('name', 'John');
   * localStorage.setItem('age', '30');
   *
   * storage.hasItem('name'); // true, 스토리지에 저장된 데이터가 있음
   * storage.hasItem('age'); // true, 스토리지에 저장된 데이터가 있음
   */
  hasItem<K extends keyof T>(key: K): boolean {
    return this.getItem(key) != null;
  }

  /**
   * @description 스토리지에 저장된 모든 키를 반환합니다.
   *
   * @returns {keyof T[]} - StorageManager 인스턴스에 관리하는 모든 키의 배열
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   *
   * storage.setItem('name', 'John');
   * localStorage.setItem('age', '30');
   *
   * storage.keys(); // ['name', 'age'], 스토리지에 저장된 모든 키 2개
   */
  keys(): (keyof T)[] {
    const keys: (keyof T)[] = [];

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key) {
        keys.push(key as keyof T);
      }
    }
    return keys;
  }

  /**
   * @description 스토리지에 저장된 모든 값을 반환합니다.
   *
   * @returns {T[keyof T][]} - 스토리지에 저장된 모든 값의 배열
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   *
   * storage.setItem('name', 'John');
   * localStorage.setItem('age', '30');
   *
   * storage.values(); // ['John', 30], 스토리지에 저장된 모든 값 2개
   */
  values(): (T[keyof T] | null)[] {
    const keys = this.keys();
    return keys.map((key) => this.getItem(key));
  }

  /**
   * @description 스토리지에 저장된 모든 키-값 쌍(entries)을 반환합니다.
   *
   * @returns {[keyof T, T[keyof T] | null][]} - 스토리지에 저장된 모든 키-값 쌍의 배열
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   *
   * storage.setItem('name', 'John');
   * localStorage.setItem('age', '30');
   *
   * storage.entries(); // [['name', 'John'], ['age', 30]], 스토리지에 저장된 모든 키-값 쌍 2개
   */
  entries(): [keyof T, T[keyof T] | null][] {
    const keys = this.keys();
    return keys.map((key) => [key, this.getItem(key)]);
  }

  /**
   * @description 스토리지에 저장된 모든 데이터를 스토리지에서 삭제합니다.
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   *
   * storage.setItem('name', 'John');
   * localStorage.setItem('age', '30');
   *
   * storage.clear();
   */
  clear(): void {
    this.storage.clear();
  }

  /**
   * @description 스토리지에 저장된 모든 데이터의 수를 반환합니다.
   *
   * @returns {number} - 스토리지에 저장된 모든 데이터의 수
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   *
   * storage.setItem('name', 'John');
   * localStorage.setItem('age', '30');
   *
   * storage.size; // 2, 스토리지에 저장된 모든 데이터의 수 2개
   */
  size(): number {
    return this.storage.length;
  }

  /**
   * @description 현재 인스턴스가 관리하는 키들만 반환합니다.
   *
   * @returns {(keyof T)[]} - 현재 인스턴스가 관리하는 키의 배열
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   *
   * storage.setItem('name', 'John');
   * localStorage.setItem('age', '30');
   *
   * storage.ownKeys(); // ['name'], 인스턴스가 관리하는 키 1개
   * storage.keys(); // ['name', 'age'], 스토리지에 저장된 모든 키 2개
   */
  ownKeys(): (keyof T)[] {
    return Array.from(this.managedKeys);
  }

  /**
   * @description 현재 인스턴스가 관리하는 값들만 반환합니다.
   *
   * @returns {(T[keyof T] | null)[]} - 현재 인스턴스가 관리하는 값의 배열
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   *
   * storage.setItem('name', 'John');
   * localStorage.setItem('age', '30');
   *
   * storage.ownValues(); // ['John'], 인스턴스가 관리하는 값 1개
   * storage.values(); // ['John', 30], 스토리지에 저장된 모든 값 2개
   */
  ownValues(): (T[keyof T] | null)[] {
    return Array.from(this.managedKeys).map((key) => this.getItem(key));
  }

  /**
   * @description 현재 인스턴스가 관리하는 키-값 쌍들만 반환합니다.
   *
   * @returns {[keyof T, T[keyof T] | null][]} - 현재 인스턴스가 관리하는 키-값 쌍의 배열
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   * storage.setItem('name', 'John');
   * localStorage.setItem('age', '30');
   *
   * storage.ownEntries(); // [['name', 'John']], 인스턴스가 관리하는 키-값 쌍 1개
   */
  ownEntries(): [keyof T, T[keyof T] | null][] {
    return Array.from(this.managedKeys).map((key) => [key, this.getItem(key)]);
  }

  /**
   * @description 현재 인스턴스가 관리하는 데이터를 스토리지에서 삭제합니다.
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   * storage.setItem('name', 'John');
   * localStorage.setItem('age', '30');
   *
   * storage.ownClear();
   *
   * storage.ownKeys(); // []
   * storage.keys(); // ['age']
   */
  ownClear(): void {
    const keys = this.ownKeys();
    keys.forEach((key) => {
      this.storage.removeItem(key as string);
    });
    this.managedKeys.clear();
  }

  /**
   * @description 현재 인스턴스가 관리하는 데이터의 수를 반환합니다.
   *
   * @returns {number} - 현재 인스턴스가 관리하는 데이터의 수
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   *
   * storage.setItem('name', 'John');
   * localStorage.setItem('age', '30');
   *
   * storage.ownSize(); // 1, 인스턴스가 관리하는 데이터의 수 1개
   * storage.size(); // 2, 스토리지에 저장된 모든 데이터의 수 2개
   */
  ownSize(): number {
    return this.managedKeys.size;
  }
}
