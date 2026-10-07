import { describe, it, expectTypeOf } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSessionStorage } from '.';
import { describeStorageHook } from '../../_internal/test/storageHookTestSuite';

describe('useSessionStorage', () => {
  describeStorageHook(useSessionStorage, 'sessionStorage');

  it('초기값 여부에 따라 유형을 적절히 추론해야 합니다.', () => {
    const { result: result1 } = renderHook(() =>
      useSessionStorage<string>({ key: 'test' })
    );
    expectTypeOf(result1.current.state).toEqualTypeOf<string | null>();

    const { result: result2 } = renderHook(() =>
      useSessionStorage<string>({ key: 'test', initialValue: 'default' })
    );
    expectTypeOf(result2.current.state).toEqualTypeOf<string>();
  });
});
