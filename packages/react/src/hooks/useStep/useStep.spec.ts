import { renderHook, waitFor } from '@testing-library/react';
import { useStep } from '.';

describe('useStep', () => {
  const nextStepActionMockFn = vi.fn();
  const prevStepActionMockFn = vi.fn();
  const setStepActionMockFn = vi.fn();
  const resetStepActionMockFn = vi.fn();

  it('should initialize with the initial step', () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, initialStep: 2 })
    );

    expect(result.current.currentStep).toBe(2);
    expect(result.current.hasNextStep).toBe(true);
    expect(result.current.hasPrevStep).toBe(true);
  });

  it('should go to the next step and update state correctly', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    await waitFor(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(2);
    expect(result.current.hasNextStep).toBe(true);

    await waitFor(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(3);
    expect(result.current.hasNextStep).toBe(false);

    await waitFor(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(3);
    expect(result.current.hasNextStep).toBe(false);
  });

  it('should go to the next step and call the provided action', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    await waitFor(() => {
      result.current.nextStep(nextStepActionMockFn);
    });

    expect(result.current.currentStep).toBe(2);
    expect(nextStepActionMockFn).toBeCalled();
  });

  it('should go to the previous step and update state correctly', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 4, initialStep: 3 })
    );

    await waitFor(() => {
      result.current.prevStep();
    });

    expect(result.current.currentStep).toBe(2);
    expect(result.current.hasPrevStep).toBe(true);

    await waitFor(() => {
      result.current.prevStep();
    });

    expect(result.current.currentStep).toBe(1);
    expect(result.current.hasPrevStep).toBe(false);

    await waitFor(() => {
      result.current.prevStep();
    });

    expect(result.current.currentStep).toBe(1);
    expect(result.current.hasPrevStep).toBe(false);
  });

  it('should go to the previous step and call the provided action', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, initialStep: 2 })
    );

    await waitFor(() => {
      result.current.prevStep(prevStepActionMockFn);
    });

    expect(result.current.currentStep).toBe(1);
    expect(prevStepActionMockFn).toBeCalled();
  });

  it('should set the step correctly when a number is provided', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    // setStep number
    await waitFor(() => {
      result.current.setStep(2);
    });

    expect(result.current.currentStep).toBe(2);
    expect(result.current.hasNextStep).toBe(true);
    expect(result.current.hasPrevStep).toBe(true);

    // setStep Function
    await waitFor(() => {
      result.current.setStep((currentStep) => currentStep + 1);
    });

    expect(result.current.currentStep).toBe(3);
    expect(result.current.hasNextStep).toBe(false);
    expect(result.current.hasPrevStep).toBe(true);
  });

  it('should set the step correctly and call the provided action', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    await waitFor(() => {
      result.current.setStep(2, setStepActionMockFn);
    });

    expect(result.current.currentStep).toBe(2);
    expect(setStepActionMockFn).toBeCalledTimes(1);
  });

  it('should reset to the initial step and update state correctly', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, initialStep: 2 })
    );

    await waitFor(() => {
      result.current.resetStep();
    });

    expect(result.current.currentStep).toBe(2);
    expect(result.current.hasPrevStep).toBe(true);
    expect(result.current.hasNextStep).toBe(true);
  });

  it('should reset to the initial step and call the provided action', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    await waitFor(() => {
      result.current.resetStep(resetStepActionMockFn);
    });

    expect(result.current.currentStep).toBe(1);
    expect(resetStepActionMockFn).toBeCalledTimes(1);
  });

  it('should throw error for invalid step', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    await waitFor(() => {
      expect(() => result.current.setStep(4)).toThrow('Step not valid');
    });
  });
});
