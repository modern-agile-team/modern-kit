import { renderHook, waitFor } from '@testing-library/react';
import { useStepState } from '.';

describe('useStepState', () => {
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

  it('should initialize state with the provided initial state and update it correctly', async () => {
    const { result } = renderHook(() =>
      useStepState<{ name: string }>({
        maxStep: 3,
        initialState: { name: 'foo' },
      })
    );

    expect(result.current.state).toEqual({
      name: 'foo',
    });

    await waitFor(() => {
      result.current.setState({
        name: 'bar',
      });
    });

    expect(result.current.state).toEqual({
      name: 'bar',
    });

    expectTypeOf(result.current.state).toEqualTypeOf<{
      name: string;
    }>();
  });

  it('should go to the next step and call the provided action', async () => {
    const { result } = renderHook(() => useStepState({ maxStep: 3 }));

    await waitFor(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStep).toBe(2);
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

    expect(result.current.currentStep).toBe(1);
  });
});
