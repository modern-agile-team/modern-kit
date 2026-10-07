import { describe, it, expect, afterEach, vi, expectTypeOf } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useLocalStorage } from '.';
import { describeStorageHook } from '../../_internal/test/storageHookTestSuite';

const visibilityStateSpyOn = vi.spyOn(document, 'visibilityState', 'get');
const event = new Event('visibilitychange');

afterEach(() => {
  localStorage.clear();
});

describe('useLocalStorage', () => {
  describeStorageHook(useLocalStorage, 'localStorage');

  it('초기값 여부에 따라 유형을 적절히 추론해야 합니다.', () => {
    const { result: result1 } = renderHook(() =>
      useLocalStorage<string>({ key: 'test' })
    );
    expectTypeOf(result1.current.state).toEqualTypeOf<string | null>();

    const { result: result2 } = renderHook(() =>
      useLocalStorage<string>({ key: 'test', initialValue: 'default' })
    );
    expectTypeOf(result2.current.state).toEqualTypeOf<string>();
  });

  it('visibilityChange 옵션이 true인 경우 가시성 변경 이벤트 핸들러를 등록해야 합니다.', async () => {
    const { result } = renderHook(() =>
      useLocalStorage({ key: 'test', visibilityChange: true })
    );

    // 외부에서 값을 설정했다고 가정
    localStorage.setItem('test', JSON.stringify('visible'));
    expect(result.current.state).toBeNull();

    await waitFor(() => {
      visibilityStateSpyOn.mockReturnValue('visible');
      document.dispatchEvent(event);
    });

    // visible되면 값이 업데이트
    expect(result.current.state).toBe('visible');
  });
});
