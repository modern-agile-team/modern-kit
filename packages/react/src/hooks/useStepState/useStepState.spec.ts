import { renderHook, waitFor } from '@testing-library/react';
import { useStepState } from '.';

describe('useStepState', () => {
  it('should initialize state with the provided initial state and update it correctly', async () => {
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

  it('should initialize state as null and update it correctly', async () => {
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

  it('should save state to sessionStorage and then to localStorage on rerender with new storage options', async () => {
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

  it('should save state to sessionStorage, clear state, and restore initial state on command', async () => {
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

  it('should go to the next step and call the provided action', async () => {
    const { result } = renderHook(() => useStepState({ maxStep: 3 }));

    await waitFor(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStep).toBe(1);
    expect(result.current.hasNextStep).toBe(true);
  });

  it('should go to the previous step', async () => {
    const { result } = renderHook(() =>
      useStepState({ maxStep: 4, initialStep: 3 })
    );

    await waitFor(() => {
      result.current.goToPrevStep();
    });

    expect(result.current.currentStep).toBe(2);
    expect(result.current.hasPrevStep).toBe(true);
  });

  it('should set the step correctly', async () => {
    const { result } = renderHook(() => useStepState({ maxStep: 3 }));

    await waitFor(() => {
      result.current.setStep(2);
    });

    expect(result.current.currentStep).toBe(2);
  });

  it('should reset to the initial step', async () => {
    const { result } = renderHook(() => useStepState({ maxStep: 3 }));

    await waitFor(() => {
      result.current.resetStep();
    });

    expect(result.current.currentStep).toBe(0);
  });
});
