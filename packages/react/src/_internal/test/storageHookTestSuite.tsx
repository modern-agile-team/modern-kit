import { describe, it, expect, afterEach, vi, onTestFinished } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import type { useSessionStorage } from '../../hooks/useSessionStorage';
import type { StorageType } from '../storage/storageStore';

type StorageHook = typeof useSessionStorage;

const blockStorageAccess = (storage: Storage) => {
  const getItemSpy = vi.spyOn(storage, 'getItem').mockImplementation(() => {
    throw new DOMException('blocked', 'SecurityError');
  });
  onTestFinished(() => getItemSpy.mockRestore());
};

/**
 * @description `useLocalStorage` / `useSessionStorage` 가 공통으로 만족해야 하는 동작을 검증합니다.
 *
 * @param {StorageHook} useStorage - 검증할 훅
 * @param {StorageType} storageType - 훅이 사용하는 스토리지 타입
 */
export function describeStorageHook(
  useStorage: StorageHook,
  storageType: StorageType
) {
  const storage = () => window[storageType];

  describe(`공통 동작 (${storageType})`, () => {
    afterEach(() => {
      storage().clear();
    });

    it.each([
      ['값', 'default'],
      ['함수', () => 'default'],
    ])(
      '스토리지에 값이 없으면 initialValue(%s)로 초기화해야 합니다.',
      (_, initialValue) => {
        const { result } = renderHook(() =>
          useStorage({ key: 'test', initialValue })
        );

        expect(result.current.state).toBe('default');
      }
    );

    it('스토리지에 값이 있으면 해당 값으로 초기화해야 합니다.', () => {
      storage().setItem('test', JSON.stringify('storedValue'));

      const { result } = renderHook(() =>
        useStorage({ key: 'test', initialValue: 'default' })
      );

      expect(result.current.state).toBe('storedValue');
    });

    it('리렌더링되어도 initialValue를 다시 계산하지 않고 state와 setState 참조를 유지해야 합니다.', () => {
      const initialValue = vi.fn(() => ({ count: 0 }));
      const { result, rerender } = renderHook(() =>
        useStorage({ key: 'test', initialValue })
      );
      const { state, setState } = result.current;

      rerender();

      expect(initialValue).toHaveBeenCalledOnce();
      expect(result.current.state).toBe(state);
      expect(result.current.setState).toBe(setState);
    });

    it('값 또는 이전 상태를 받는 함수로 state를 변경하고 스토리지에 저장해야 합니다.', async () => {
      const { result } = renderHook(() =>
        useStorage({ key: 'test', initialValue: [1, 2, 3] })
      );

      await waitFor(() => {
        result.current.setState([1]);
      });
      await waitFor(() => {
        result.current.setState((prev) => [...prev, 2]);
      });

      expect(result.current.state).toEqual([1, 2]);
      expect(storage().getItem('test')).toBe(JSON.stringify([1, 2]));
    });

    it.each([
      ['null', null, 'null'],
      ['undefined', undefined, 'undefined'],
    ])(
      'setState(%s)로 저장하면 initialValue가 아닌 저장한 값을 반환해야 합니다.',
      async (_, value, storedValue) => {
        const { result } = renderHook(() =>
          useStorage<string | null | undefined>({
            key: 'test',
            initialValue: 'default',
          })
        );

        await waitFor(() => {
          result.current.setState(value);
        });

        expect(storage().getItem('test')).toBe(storedValue);
        expect(result.current.state).toBe(value);
      }
    );

    it('state를 삭제하면 스토리지 값이 제거되고 initialValue로 돌아가야 합니다.', async () => {
      storage().setItem('test', JSON.stringify('storedValue'));

      const { result } = renderHook(() =>
        useStorage({ key: 'test', initialValue: 'default' })
      );

      await waitFor(() => {
        result.current.removeState();
      });

      expect(result.current.state).toBe('default');
      expect(storage().getItem('test')).toBeNull();
    });

    it('서버 사이드 렌더링의 경우 initialValue로 렌더링해야 합니다.', () => {
      const TestComponent = () => {
        const { state } = useStorage({ key: 'test', initialValue: 'ssr' });
        return <p>{state}</p>;
      };

      expect(renderToString(<TestComponent />)).toContain('ssr');
    });

    describe.each([
      ['잘못된 JSON', () => storage().setItem('test', "{key: 'value'}")],
      ['스토리지 접근 차단', () => blockStorageAccess(storage())],
    ])('저장된 값을 가져오지 못한 경우 (%s)', (_, setupFailure) => {
      it('기본적으로 오류가 발생해야 합니다.', () => {
        setupFailure();

        expect(() => {
          return renderHook(() =>
            useStorage({ key: 'test', initialValue: 'default' })
          );
        }).toThrow();
      });

      it('throwOnError가 false이면 initialValue(없으면 null)를 사용해야 합니다.', () => {
        setupFailure();

        const { result: withInitialValue } = renderHook(() =>
          useStorage({
            key: 'test',
            initialValue: 'default',
            throwOnError: false,
          })
        );
        const { result: withoutInitialValue } = renderHook(() =>
          useStorage({ key: 'test', throwOnError: false })
        );

        expect(withInitialValue.current.state).toBe('default');
        expect(withoutInitialValue.current.state).toBeNull();
      });
    });

    it('throwOnError가 false이면 잘못된 JSON 위에 새 값을 저장할 수 있어야 합니다.', async () => {
      storage().setItem('test', "{key: 'value'}");

      const { result } = renderHook(() =>
        useStorage({
          key: 'test',
          initialValue: 'default',
          throwOnError: false,
        })
      );

      await waitFor(() => {
        result.current.setState((prev) => `${prev}-updated`);
      });

      expect(result.current.state).toBe('default-updated');
      expect(storage().getItem('test')).toBe(JSON.stringify('default-updated'));
    });

    it.each([
      ['setState', 'setItem'],
      ['removeState', 'removeItem'],
    ] as const)(
      '%s 에서 스토리지 %s 가 실패하면 오류가 발생해야 합니다.',
      (action, storageMethod) => {
        const { result } = renderHook(() => useStorage({ key: 'test' }));
        const spy = vi
          .spyOn(storage(), storageMethod)
          .mockImplementation(() => {
            throw new Error();
          });
        onTestFinished(() => spy.mockRestore());

        expect(() => {
          if (action === 'setState') {
            result.current.setState('error');
          } else {
            result.current.removeState();
          }
        }).toThrowError();
      }
    );
  });
}
