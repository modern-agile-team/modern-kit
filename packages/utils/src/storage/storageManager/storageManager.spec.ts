import { describe, it, expect, afterEach } from 'vitest';
import { StorageManager } from '.';

interface TestStorageData {
  name: string;
  age: number;
  isActive: boolean;
  settings: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe('StorageManager', () => {
  describe('constructor', () => {
    it('localStorage로 StorageManager 인스턴스를 생성할 수 있어야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');
      expect(storage).toBeInstanceOf(StorageManager);
    });

    it('sessionStorage로 StorageManager 인스턴스를 생성할 수 있어야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('sessionStorage');
      expect(storage).toBeInstanceOf(StorageManager);
    });
  });

  describe('setItem', () => {
    it('값을 저장할 수 있어야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      storage.setItem('isActive', true);
      storage.setItem('settings', { theme: 'dark', notifications: true });

      expect(localStorage.getItem('name')).toBe('"John"');
      expect(localStorage.getItem('age')).toBe('30');
      expect(localStorage.getItem('isActive')).toBe('true');
      expect(localStorage.getItem('settings')).toBe(
        JSON.stringify({ theme: 'dark', notifications: true })
      );
    });

    it('null/undefined 값은 저장하지 않아야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');
      storage.setItem('name', null as any);
      storage.setItem('age', undefined as any);

      expect(localStorage.getItem('name')).toBeNull();
      expect(localStorage.getItem('age')).toBeNull();
    });
  });

  describe('setItems', () => {
    it('여러 아이템을 한번에 저장할 수 있어야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');
      const data = [
        { key: 'name' as const, value: 'John' },
        { key: 'age' as const, value: 30 },
        { key: 'isActive' as const, value: true },
      ];

      storage.setItems(data);

      expect(localStorage.getItem('age')).toBe('30');
      expect(localStorage.getItem('isActive')).toBe('true');
    });

    it('null/undefined 값은 저장하지 않아야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');
      const data = [
        { key: 'age' as const, value: null as any },
        { key: 'isActive' as const, value: undefined as any },
      ];

      storage.setItems(data);

      expect(localStorage.getItem('age')).toBeNull();
      expect(localStorage.getItem('isActive')).toBeNull();
    });
  });

  describe('getItem', () => {
    it('저장된 데이터를 값을 가져올 수 있어야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      localStorage.setItem('name', '"John"');
      localStorage.setItem('age', '30');
      localStorage.setItem('isActive', 'true');
      localStorage.setItem(
        'settings',
        JSON.stringify({ theme: 'dark', notifications: true })
      );

      expect(storage.getItem('name')).toBe('John');
      expect(storage.getItem('age')).toBe(30);
      expect(storage.getItem('isActive')).toBe(true);
      expect(storage.getItem('settings')).toEqual({
        theme: 'dark',
        notifications: true,
      });
    });

    it('존재하지 않는 키의 경우 null을 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');
      const result = storage.getItem('name');

      expect(result).toBeNull();
    });

    it('undefined 문자열의 경우 null을 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');
      localStorage.setItem('name', 'undefined');

      const result = storage.getItem('name');

      expect(result).toBeNull();
    });
  });

  describe('getItems', () => {
    it('여러 아이템을 한번에 가져올 수 있어야 합니다. { key, value } 형태로 이루어진 배열을 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      storage.setItem('isActive', true);

      expect(storage.getItems(['name', 'age', 'isActive'])).toEqual([
        { key: 'name', value: 'John' },
        { key: 'age', value: 30 },
        { key: 'isActive', value: true },
      ]);
    });

    it('존재하지 않는 키의 경우 null을 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);

      expect(storage.getItems(['name', 'age', 'isActive'])).toEqual([
        { key: 'name', value: 'John' },
        { key: 'age', value: 30 },
        { key: 'isActive', value: null },
      ]);
    });
  });

  describe('removeItem', () => {
    it('단일 아이템을 삭제할 수 있어야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      localStorage.setItem('name', '"John"');

      expect(storage.getItem('name')).toBe('John');
      expect(localStorage.getItem('name')).toBe('"John"');

      storage.removeItem('name');

      expect(storage.getItem('name')).toBeNull();
      expect(localStorage.getItem('name')).toBeNull();
    });
  });

  describe('removeItems', () => {
    it('여러 아이템을 한번에 삭제할 수 있어야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      localStorage.setItem('name', '"John"');
      localStorage.setItem('age', '30');
      localStorage.setItem('isActive', 'true');

      expect(storage.getItem('name')).toBe('John');
      expect(storage.getItem('age')).toBe(30);
      expect(storage.getItem('isActive')).toBe(true);

      storage.removeItems(['name', 'age', 'isActive']);

      expect(storage.getItem('name')).toBeNull();
      expect(storage.getItem('age')).toBeNull();
      expect(storage.getItem('isActive')).toBeNull();
    });
  });

  describe('스토리지 전체 데이터 keys/values/entries/clear/size', () => {
    it('스토리지에 저장된 모든 키를 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      localStorage.setItem('isActive', JSON.stringify(true)); // 인스턴스가 관리하지 않는 데이터

      expect(storage.keys()).toEqual(['name', 'age', 'isActive']);
    });

    it('스토리지에 저장된 모든 값을 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      localStorage.setItem('isActive', JSON.stringify(true)); // 인스턴스가 관리하지 않는 데이터

      expect(storage.values()).toEqual(['John', 30, true]);
    });

    it('스토리지에 저장된 모든 키-값 쌍을 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      localStorage.setItem('isActive', JSON.stringify(true)); // 인스턴스가 관리하지 않는 데이터

      expect(storage.entries()).toEqual([
        ['name', 'John'],
        ['age', 30],
        ['isActive', true],
      ]);
    });

    it('스토리지에 저장된 모든 데이터를 삭제할 수 있어야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      localStorage.setItem('isActive', JSON.stringify(true)); // 인스턴스가 관리하지 않는 데이터

      expect(storage.getItem('name')).toBe('John');
      expect(storage.getItem('age')).toBe(30);
      expect(storage.getItem('isActive')).toBe(true);

      storage.clear();

      expect(storage.getItem('name')).toBeNull();
      expect(storage.getItem('age')).toBeNull();
      expect(storage.getItem('isActive')).toBeNull();
    });

    it('스토리지에 저장된 모든 데이터의 수를 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      localStorage.setItem('isActive', JSON.stringify(true)); // 인스턴스가 관리하지 않는 데이터

      expect(storage.size()).toBe(3);
    });
  });

  describe('인스턴스 관리 데이터 ownKeys/ownValues/ownEntries/ownClear/ownSize', () => {
    it('인스턴스가 관리하는 모든 키를 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      localStorage.setItem('isActive', JSON.stringify(true)); // 인스턴스가 관리하지 않는 데이터

      expect(storage.ownKeys()).toEqual(['name', 'age']);
    });

    it('인스턴스가 관리하는 모든 값을 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      localStorage.setItem('isActive', JSON.stringify(true)); // 인스턴스가 관리하지 않는 데이터

      expect(storage.ownValues()).toEqual(['John', 30]);
    });

    it('인스턴스가 관리하는 모든 키-값 쌍을 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      localStorage.setItem('isActive', JSON.stringify(true)); // 인스턴스가 관리하지 않는 데이터

      expect(storage.ownEntries()).toEqual([
        ['name', 'John'],
        ['age', 30],
      ]);
    });

    it('인스턴스가 관리하는 모든 데이터를 삭제할 수 있어야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');
      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      localStorage.setItem('isActive', JSON.stringify(true)); // 인스턴스가 관리하지 않는 데이터

      storage.ownClear();

      expect(storage.getItem('name')).toBeNull();
      expect(storage.getItem('age')).toBeNull();
      expect(storage.getItem('isActive')).toBe(true);
    });

    it('인스턴스가 관리하는 데이터의 수를 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');
      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      localStorage.setItem('isActive', JSON.stringify(true)); // 인스턴스가 관리하지 않는 데이터

      expect(storage.ownSize()).toBe(2);
    });
  });

  describe('sessionStorage 사용', () => {
    it('sessionStorage를 사용하는 경우 올바른 스토리지를 사용해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('sessionStorage');
      storage.setItem('name', 'Jane');

      expect(sessionStorage.getItem('name')).toBe('"Jane"');
      expect(localStorage.getItem('name')).toBeNull();

      expect(storage.getItem('name')).toBe('Jane');
      expect(storage.size()).toBe(1);
    });

    it('localStorage와 sessionStorage는 독립적으로 동작해야 합니다.', () => {
      const localStorageManager = new StorageManager<TestStorageData>(
        'localStorage'
      );
      const sessionStorageManager = new StorageManager<TestStorageData>(
        'sessionStorage'
      );

      localStorageManager.setItem('name', 'Local');
      sessionStorageManager.setItem('name', 'Session');

      expect(localStorageManager.getItem('name')).toBe('Local');
      expect(sessionStorageManager.getItem('name')).toBe('Session');
    });
  });

  describe('에러 케이스', () => {
    it('서버 환경에서는 에러를 발생시켜야 합니다.', () => {
      const originalWindow = globalThis.window;

      // @ts-expect-error 서버 환경에서 테스트
      delete globalThis.window;

      const storage = new StorageManager<TestStorageData>('localStorage');

      expect(() => {
        storage.setItem('name', 'John');
      }).toThrow('Storage를 지원하는 환경이 아닙니다');

      globalThis.window = originalWindow;
    });

    it('잘못된 JSON 형식의 경우 에러가 발생해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');
      localStorage.setItem('name', '{invalid: json}');

      expect(() => {
        storage.getItem('name');
      }).toThrow('"name" 아이템을 가져오는데 실패했습니다');
    });
  });
});
