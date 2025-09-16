import { parseJSON } from '../../common/parseJSON';

interface StorageData<T> {
  key: keyof T;
  value: T[keyof T];
}

/**
 * @description 타입 안전성을 제공하는 브라우저 스토리지 관리 클래스입니다.
 * `localStorage`와 `sessionStorage`를 지원하며, 제네릭 타입을 통해 데이터의 타입을 보장합니다.
 *
 * @template T - 스토리지에 저장할 데이터의 타입
 *
 * @param {'localStorage' | 'sessionStorage'} type - 스토리지 타입 (localStorage 또는 sessionStorage)
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

  constructor(type: 'localStorage' | 'sessionStorage') {
    this.storageType = type;
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
    this.storage.setItem(key as string, JSON.stringify(value));
  }

  /**
   * @description 여러 데이터를 한번에 저장합니다.
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
      if (value != null) {
        this.setItem(key, value);
      }
    });
  }

  /**
   * @description 스토리지에서 단일 데이터를 가져옵니다.
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
      throw new Error(
        `"${String(key)}" 아이템을 가져오는데 실패했습니다: ${err}`
      );
    }
  }

  /**
   * @description 여러 데이터를 한번에 가져옵니다.
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
   * @description 스토리지에서 데이터를 삭제합니다.
   *
   * @param {keyof T} key - 삭제할 데이터의 키
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   * storage.removeItem('name');
   */
  removeItem<K extends keyof T>(key: K): void {
    this.storage.removeItem(key as string);
  }

  /**
   * @description 여러 데이터를 한번에 삭제합니다.
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
   * @description 스토리지에 저장된 모든 키를 반환합니다.
   *
   * @returns {keyof T[]} - 스토리지에 저장된 모든 키의 배열
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   * storage.keys(); // ['name', 'age']
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
   * storage.values(); // ['John', '30']
   */
  values(): (T[keyof T] | null)[] {
    const keys = this.keys();
    return keys.map((key) => this.getItem(key));
  }

  /**
   * @description 스토리지에 저장된 모든 키-값 쌍을 반환합니다.
   *
   * @returns {[keyof T, T[keyof T] | null][]} - 스토리지에 저장된 모든 키-값 쌍의 배열
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
   * storage.entries(); // [['name', 'John'], ['age', '30']]
   */
  entries(): [keyof T, T[keyof T] | null][] {
    const keys = this.keys();
    return keys.map((key) => [key, this.getItem(key)]);
  }

  /**
   * @description 스토리지를 초기화합니다.
   *
   * @example
   * const storage = new StorageManager<{ name: string, age: number }>('localStorage');
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
   * storage.size; // 2
   */
  size(): number {
    return this.storage.length;
  }
}
