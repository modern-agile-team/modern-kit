import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  expectTypeOf,
} from 'vitest';
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

let storage: StorageManager<TestStorageData>;

beforeEach(() => {
  storage = new StorageManager<TestStorageData>('localStorage');
});

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
    it('문자열 값을 저장할 수 있어야 합니다.', () => {
      storage.setItem('name', 'John');

      expect(localStorage.getItem('name')).toBe('"John"');
    });

    it('숫자 값을 저장할 수 있어야 합니다.', () => {
      storage.setItem('age', 30);

      expect(localStorage.getItem('age')).toBe('30');
    });

    it('불린 값을 저장할 수 있어야 합니다.', () => {
      storage.setItem('isActive', true);

      expect(localStorage.getItem('isActive')).toBe('true');
    });

    it('객체 값을 저장할 수 있어야 합니다.', () => {
      const settings = { theme: 'dark' as const, notifications: true };
      storage.setItem('settings', settings);

      expect(localStorage.getItem('settings')).toBe(JSON.stringify(settings));
    });
  });

  describe('setItems', () => {
    it('여러 아이템을 한번에 저장할 수 있어야 합니다.', () => {
      const data = [
        { key: 'name' as const, value: 'John' },
        { key: 'age' as const, value: 30 },
        { key: 'isActive' as const, value: true },
      ];

      storage.setItems(data);

      expect(localStorage.getItem('name')).toBe('"John"');
      expect(localStorage.getItem('age')).toBe('30');
      expect(localStorage.getItem('isActive')).toBe('true');
    });

    it('null 값은 저장하지 않아야 합니다.', () => {
      const data = [
        { key: 'name' as const, value: 'John' },
        { key: 'age' as const, value: null as any },
      ];

      storage.setItems(data);

      expect(localStorage.getItem('name')).toBe('"John"');
      expect(localStorage.getItem('age')).toBeNull();
    });

    it('undefined 값은 저장하지 않아야 합니다.', () => {
      const data = [
        { key: 'name' as const, value: 'John' },
        { key: 'age' as const, value: undefined as any },
      ];

      storage.setItems(data);

      expect(localStorage.getItem('name')).toBe('"John"');
      expect(localStorage.getItem('age')).toBeNull();
    });
  });

  describe('getItem', () => {
    it('저장된 문자열 값을 가져올 수 있어야 합니다.', () => {
      localStorage.setItem('name', '"John"');

      const result = storage.getItem('name');

      expect(result).toBe('John');
      expectTypeOf(result).toEqualTypeOf<string | null>();
    });

    it('저장된 숫자 값을 가져올 수 있어야 합니다.', () => {
      localStorage.setItem('age', '30');

      const result = storage.getItem('age');

      expect(result).toBe(30);
      expectTypeOf(result).toEqualTypeOf<number | null>();
    });

    it('저장된 객체 값을 가져올 수 있어야 합니다.', () => {
      const settings = { theme: 'dark', notifications: true };
      localStorage.setItem('settings', JSON.stringify(settings));

      const result = storage.getItem('settings');

      expect(result).toEqual(settings);
      expectTypeOf(result).toEqualTypeOf<{
        theme: 'light' | 'dark';
        notifications: boolean;
      } | null>();
    });

    it('존재하지 않는 키의 경우 null을 반환해야 합니다.', () => {
      const result = storage.getItem('name');

      expect(result).toBeNull();
      expectTypeOf(result).toEqualTypeOf<string | null>();
    });

    it('undefined 문자열의 경우 null을 반환해야 합니다.', () => {
      localStorage.setItem('name', 'undefined');

      const result = storage.getItem('name');

      expect(result).toBeNull();
      expectTypeOf(result).toEqualTypeOf<string | null>();
    });

    it('잘못된 JSON 형식의 경우 에러가 발생해야 합니다.', () => {
      localStorage.setItem('name', '{invalid: json}');

      expect(() => {
        storage.getItem('name');
      }).toThrow('"name" 아이템을 가져오는데 실패했습니다');
    });
  });

  describe('getItems', () => {
    it('여러 아이템을 한번에 가져올 수 있어야 합니다. { key, value } 형태로 이루어진 배열을 반환해야 합니다.', () => {
      localStorage.setItem('name', '"John"');
      localStorage.setItem('age', '30');
      localStorage.setItem('isActive', 'true');

      const result = storage.getItems(['name', 'age', 'isActive']);

      expect(result).toEqual([
        { key: 'name', value: 'John' },
        { key: 'age', value: 30 },
        { key: 'isActive', value: true },
      ]);
      expectTypeOf(result).toEqualTypeOf<
        {
          key: 'name' | 'age' | 'isActive';
          value: string | number | boolean | null;
        }[]
      >();
    });

    it('존재하지 않는 키의 경우 null을 반환해야 합니다.', () => {
      localStorage.setItem('name', '"John"');
      localStorage.setItem('age', '30');
      const result = storage.getItems(['name', 'age', 'isActive']);

      expect(result).toEqual([
        { key: 'name', value: 'John' },
        { key: 'age', value: 30 },
        { key: 'isActive', value: null },
      ]);
      expectTypeOf(result).toEqualTypeOf<
        {
          key: 'name' | 'age' | 'isActive';
          value: string | number | boolean | null;
        }[]
      >();
    });
  });

  describe('removeItem', () => {
    it('단일 아이템을 삭제할 수 있어야 합니다.', () => {
      localStorage.setItem('name', '"John"');

      storage.removeItem('name');

      expect(localStorage.getItem('name')).toBeNull();
    });
  });

  describe('removeItems', () => {
    it('여러 아이템을 한번에 삭제할 수 있어야 합니다.', () => {
      localStorage.setItem('name', '"John"');
      localStorage.setItem('age', '30');
      localStorage.setItem('isActive', 'true');

      storage.removeItems(['name', 'age', 'isActive']);

      expect(localStorage.getItem('name')).toBeNull();
      expect(localStorage.getItem('age')).toBeNull();
      expect(localStorage.getItem('isActive')).toBeNull();
    });
  });

  describe('keys', () => {
    it('저장된 모든 키를 반환해야 합니다.', () => {
      localStorage.setItem('name', '"John"');
      localStorage.setItem('age', '30');
      localStorage.setItem('isActive', 'true');

      const result = storage.keys();

      expect(result).toEqual(['name', 'age', 'isActive']);
      expectTypeOf(result).toEqualTypeOf<(keyof TestStorageData)[]>();
    });
  });

  describe('values', () => {
    it('저장된 모든 값을 반환해야 합니다.', () => {
      localStorage.setItem('name', '"John"');
      localStorage.setItem('age', '30');

      const result = storage.values();

      expect(result).toEqual(['John', 30]);
      expectTypeOf(result).toEqualTypeOf<
        (TestStorageData[keyof TestStorageData] | null)[]
      >();
    });
  });

  describe('entries', () => {
    it('저장된 모든 키-값 쌍을 반환해야 합니다.', () => {
      localStorage.setItem('name', '"John"');
      localStorage.setItem('age', '30');

      const result = storage.entries();

      expect(result).toEqual([
        ['name', 'John'],
        ['age', 30],
      ]);
      expectTypeOf(result).toEqualTypeOf<
        [keyof TestStorageData, TestStorageData[keyof TestStorageData] | null][]
      >();
    });
  });

  describe('clear', () => {
    it('모든 데이터를 삭제할 수 있어야 합니다.', () => {
      localStorage.setItem('name', '"John"');
      localStorage.setItem('age', '30');

      storage.clear();

      expect(localStorage.getItem('name')).toBeNull();
      expect(localStorage.getItem('age')).toBeNull();
      expect(storage.size()).toBe(0);
    });
  });

  describe('size', () => {
    it('저장된 아이템 수를 반환해야 합니다.', () => {
      localStorage.setItem('name', '"John"');
      localStorage.setItem('age', '30');
      localStorage.setItem('isActive', 'true');

      const result = storage.size();

      expect(result).toBe(3);
    });
  });

  describe('sessionStorage 사용', () => {
    it('sessionStorage를 사용하는 경우 올바른 스토리지를 사용해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('sessionStorage');
      storage.setItem('name', 'Jane');

      expect(sessionStorage.getItem('name')).toBe('"Jane"');
      expect(localStorage.getItem('name')).toBeNull();
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
  });
});
