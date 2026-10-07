// @vitest-environment happy-dom
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
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

const INVALID_JSON = '{invalid: json}';

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe('StorageManager', () => {
  describe('setItem / setItems', () => {
    it('값을 JSON 문자열로 저장해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItems([
        { key: 'age', value: 30 },
        { key: 'settings', value: { theme: 'dark', notifications: true } },
      ]);

      expect(localStorage.getItem('name')).toBe('"John"');
      expect(localStorage.getItem('age')).toBe('30');
      expect(localStorage.getItem('settings')).toBe(
        JSON.stringify({ theme: 'dark', notifications: true })
      );
    });

    it('null/undefined 값은 기본 스토리지와 동일하게 문자열로 저장해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', null as any);
      storage.setItem('age', undefined as any);

      expect(localStorage.getItem('name')).toBe('null');
      expect(localStorage.getItem('age')).toBe('undefined');
      expect(storage.ownKeys()).toEqual(['name', 'age']);
    });
  });

  describe('getItem / getItems', () => {
    it('저장된 데이터를 파싱해서 가져와야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('isActive', true);
      storage.setItem('settings', { theme: 'dark', notifications: true });

      expect(storage.getItem('name')).toBe('John');
      expect(storage.getItem('isActive')).toBe(true);
      expect(storage.getItem('settings')).toEqual({
        theme: 'dark',
        notifications: true,
      });
    });

    it.each([
      ['키가 없는 경우', null, null],
      ['null 문자열', 'null', null],
      ['undefined 문자열', 'undefined', undefined],
    ])('%s 은 %s 를 반환해야 합니다.', (_, rawValue, expected) => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      if (rawValue !== null) {
        localStorage.setItem('name', rawValue);
      }

      expect(storage.getItem('name')).toBe(expected);
    });

    it('여러 아이템을 { key, value } 배열로 가져오고, 없는 키는 null을 반환해야 합니다.', () => {
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

  describe('getRawItem', () => {
    it.each([
      ['JSON 값', '"John"'],
      ['JSON이 아닌 값', INVALID_JSON],
    ])('%s 을 파싱하지 않은 원본 문자열로 가져와야 합니다.', (_, rawValue) => {
      const storage = new StorageManager<TestStorageData>('localStorage');
      localStorage.setItem('name', rawValue);

      expect(storage.getRawItem('name')).toBe(rawValue);
    });

    it('존재하지 않는 키의 경우 null을 반환해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      expect(storage.getRawItem('name')).toBeNull();
    });
  });

  describe('removeItem / removeItems', () => {
    it('단일 또는 여러 아이템을 삭제할 수 있어야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');

      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      storage.setItem('isActive', true);

      storage.removeItem('name');
      storage.removeItems(['age', 'isActive']);

      expect(localStorage.length).toBe(0);
      expect(storage.ownKeys()).toEqual([]);
    });
  });

  describe('스토리지 전체 / 인스턴스 관리 데이터', () => {
    let storage: StorageManager<TestStorageData>;

    beforeEach(() => {
      storage = new StorageManager<TestStorageData>('localStorage');
      storage.setItem('name', 'John');
      storage.setItem('age', 30);
      localStorage.setItem('isActive', JSON.stringify(true)); // 인스턴스가 관리하지 않는 데이터
    });

    it('keys/values/entries/size는 스토리지에 저장된 모든 데이터를 대상으로 해야 합니다.', () => {
      expect(storage.keys()).toEqual(['name', 'age', 'isActive']);
      expect(storage.values()).toEqual(['John', 30, true]);
      expect(storage.entries()).toEqual([
        ['name', 'John'],
        ['age', 30],
        ['isActive', true],
      ]);
      expect(storage.size()).toBe(3);
    });

    it('ownKeys/ownValues/ownEntries/ownSize는 인스턴스가 관리하는 데이터만 대상으로 해야 합니다.', () => {
      expect(storage.ownKeys()).toEqual(['name', 'age']);
      expect(storage.ownValues()).toEqual(['John', 30]);
      expect(storage.ownEntries()).toEqual([
        ['name', 'John'],
        ['age', 30],
      ]);
      expect(storage.ownSize()).toBe(2);
    });

    it('clear는 스토리지의 모든 데이터를 삭제해야 합니다.', () => {
      storage.clear();

      expect(storage.size()).toBe(0);
    });

    it('ownClear는 인스턴스가 관리하는 데이터만 삭제해야 합니다.', () => {
      storage.ownClear();

      expect(storage.keys()).toEqual(['isActive']);
      expect(storage.ownKeys()).toEqual([]);
    });
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

    expect(localStorage.getItem('name')).toBe('"Local"');
    expect(sessionStorage.getItem('name')).toBe('"Session"');
    expect(localStorageManager.getItem('name')).toBe('Local');
    expect(sessionStorageManager.getItem('name')).toBe('Session');
  });

  describe('throwOnError 옵션', () => {
    it.each([
      { instance: undefined, call: undefined, throws: true },
      { instance: false, call: undefined, throws: false },
      { instance: undefined, call: false, throws: false },
      { instance: false, call: true, throws: true },
      { instance: true, call: false, throws: false },
    ])(
      '인스턴스 옵션이 $instance, 호출 옵션이 $call 이면 에러 발생 여부는 $throws 여야 합니다.',
      ({ instance, call, throws }) => {
        const storage = new StorageManager<TestStorageData>('localStorage', {
          throwOnError: instance,
        });
        localStorage.setItem('name', INVALID_JSON);

        const getItem = () => storage.getItem('name', { throwOnError: call });

        if (throws) {
          expect(getItem).toThrow('"name" 아이템을 가져오는데 실패했습니다');
        } else {
          expect(getItem()).toBeNull();
        }
      }
    );

    it('getItems에 전달한 옵션을 각 아이템에 적용해야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage');
      localStorage.setItem('name', INVALID_JSON);
      localStorage.setItem('age', '30');

      expect(
        storage.getItems(['name', 'age'], { throwOnError: false })
      ).toEqual([
        { key: 'name', value: null },
        { key: 'age', value: 30 },
      ]);
    });

    it('인스턴스 옵션이 false이면 values/entries/hasItem도 에러를 발생시키지 않아야 합니다.', () => {
      const storage = new StorageManager<TestStorageData>('localStorage', {
        throwOnError: false,
      });
      localStorage.setItem('name', INVALID_JSON);
      localStorage.setItem('age', '30');

      expect(storage.values()).toEqual([null, 30]);
      expect(storage.entries()).toEqual([
        ['name', null],
        ['age', 30],
      ]);
      expect(storage.hasItem('name')).toBe(false);
    });
  });
});
