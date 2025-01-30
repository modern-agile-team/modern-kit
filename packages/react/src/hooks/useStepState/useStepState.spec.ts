import { describe, it, expect, expectTypeOf } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useStepState } from '.';

describe('useStepState', () => {
  it('초기 상태를 제공된 값으로 초기화하고 올바르게 업데이트해야 합니다', async () => {
    const { result } = renderHook(() =>
      useStepState({
        maxStep: 3,
        initialState: { name: 'foo' },
      })
    );

    expect(result.current.state).toEqual({
      name: 'foo',
    });

    expectTypeOf(result.current.state).toEqualTypeOf<{
      name: string;
    }>();
  });

  it('상태를 null로 초기화하고 올바르게 업데이트해야 합니다', async () => {
    const { result } = renderHook(() =>
      useStepState<{ name: string }>({ maxStep: 3 })
    );

    expect(result.current.state).toBe(null);

    await waitFor(() => {
      result.current.setState({
        name: 'foo',
      });
    });

    expect(result.current.state).toEqual({
      name: 'foo',
    });

    expectTypeOf(result.current.state).toEqualTypeOf<{
      name: string;
    } | null>();
  });

  it('새로운 스토리지 옵션으로 리렌더링 시 해당 스토리지에 저장해야 합니다', async () => {
    const { result, rerender } = renderHook(
      ({ storageOptions }) =>
        useStepState<{ name: string }>({
          maxStep: 3,
          storageOptions,
        }),
      {
        initialProps: {
          storageOptions: {
            key: 'stepState',
            type: 'sessionStorage' as 'localStorage' | 'sessionStorage',
          },
        },
      }
    );

    await waitFor(() => {
      result.current.setState({
        name: 'foo',
      });
    });

    await waitFor(() => {
      expect(result.current.state).toEqual({
        name: 'foo',
      });
      expect(sessionStorage.getItem('stepState')).toBe(
        JSON.stringify({
          name: 'foo',
        })
      );
    });

    rerender({
      storageOptions: {
        key: 'test',
        type: 'localStorage',
      },
    });

    await waitFor(() => {
      result.current.setState(() => ({
        name: 'bar',
      }));
    });

    await waitFor(() => {
      expect(result.current.state).toEqual({
        name: 'bar',
      });
      expect(localStorage.getItem('test')).toBe(
        JSON.stringify({
          name: 'bar',
        })
      );
    });
  });

  it('상태를 sessionStorage에 저장하고, 상태를 초기화한 다음, 명령에 따라 초기 상태를 복원해야 합니다', async () => {
    const { result } = renderHook(() =>
      useStepState<{ name: string }>({
        maxStep: 3,
        storageOptions: {
          key: 'stepState',
          type: 'sessionStorage',
        },
        initialState: { name: 'foo' },
      })
    );

    await waitFor(() => {
      result.current.setState({
        name: 'bar',
      });
    });

    await waitFor(() => {
      result.current.clearState();
    });

    expect(result.current.state).toEqual(null);
    expect(sessionStorage.getItem('stepState')).toBe(null);
  });

  it('다음 단계로 이동하고 제공된 액션을 호출해야 합니다', async () => {
    const { result } = renderHook(() => useStepState({ maxStep: 3 }));

    await waitFor(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStep).toBe(1);
    expect(result.current.hasNextStep).toBe(true);
  });

  it('이전 단계로 이동해야 합니다', async () => {
    const { result } = renderHook(() =>
      useStepState({ maxStep: 4, initialStep: 3 })
    );

    await waitFor(() => {
      result.current.goToPrevStep();
    });

    expect(result.current.currentStep).toBe(2);
    expect(result.current.hasPrevStep).toBe(true);
  });

  it('단계를 올바르게 설정해야 합니다', async () => {
    const { result } = renderHook(() => useStepState({ maxStep: 3 }));

    await waitFor(() => {
      result.current.setStep(2);
    });

    expect(result.current.currentStep).toBe(2);
  });

  it('초기 단계로 리셋해야 합니다', async () => {
    const { result } = renderHook(() => useStepState({ maxStep: 3 }));

    await waitFor(() => {
      result.current.resetStep();
    });

    expect(result.current.currentStep).toBe(0);
  });
});
