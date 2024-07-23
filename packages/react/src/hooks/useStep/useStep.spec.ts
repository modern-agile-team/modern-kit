import { renderHook, waitFor } from '@testing-library/react';
import { useStep } from '.';

describe('useStep', () => {
  const goToNextStepActionMockFn = vi.fn();
  const goToPrevStepActionMockFn = vi.fn();
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

  it('should go to the next step and call the provided action', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 2 }));

    await waitFor(() => {
      result.current.goToNextStep();
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(1);
      expect(result.current.hasNextStep).toBe(true);
    });

    await waitFor(() => {
      result.current.goToNextStep(goToNextStepActionMockFn);
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(2);
      expect(result.current.hasNextStep).toBe(false);
      expect(goToNextStepActionMockFn).toBeCalledTimes(1);
    });

    await waitFor(() => {
      result.current.goToNextStep();
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(2);
      expect(result.current.hasNextStep).toBe(false);
    });
  });

  it('should go to the previous step and call the provided action', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, initialStep: 2 })
    );

    await waitFor(() => {
      result.current.goToPrevStep();
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(1);
      expect(result.current.hasPrevStep).toBe(true);
    });

    await waitFor(() => {
      result.current.goToPrevStep(goToPrevStepActionMockFn);
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(0);
      expect(result.current.hasPrevStep).toBe(false);
      expect(goToPrevStepActionMockFn).toBeCalledTimes(1);
    });

    await waitFor(() => {
      result.current.goToPrevStep();
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(0);
      expect(result.current.hasPrevStep).toBe(false);
    });
  });

  it('should handle infinite steps and call the provided action', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, infinite: true })
    );

    await waitFor(() => {
      result.current.goToPrevStep();
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(3);
    });

    await waitFor(() => {
      result.current.goToNextStep(goToPrevStepActionMockFn);
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(0);
      expect(goToPrevStepActionMockFn).toBeCalledTimes(1);
    });
  });

  it('should set the step correctly when a number is provided', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    // setStep number
    await waitFor(() => {
      result.current.setStep(2);
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(2);
      expect(result.current.hasNextStep).toBe(true);
      expect(result.current.hasPrevStep).toBe(true);
    });

    // setStep Function
    await waitFor(() => {
      result.current.setStep((currentStep) => currentStep + 1);
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(3);
      expect(result.current.hasNextStep).toBe(false);
      expect(result.current.hasPrevStep).toBe(true);
    });
  });

  it('should set the step correctly and call the provided action', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    await waitFor(() => {
      result.current.setStep(2, setStepActionMockFn);
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(2);
      expect(setStepActionMockFn).toBeCalledTimes(1);
    });
  });

  it('should reset to the initial step', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, initialStep: 2 })
    );

    await waitFor(() => {
      result.current.resetStep();
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(2);
      expect(result.current.hasPrevStep).toBe(true);
      expect(result.current.hasNextStep).toBe(true);
    });
  });

  it('should reset to the initial step and call the provided action', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    await waitFor(() => {
      result.current.resetStep(resetStepActionMockFn);
    });

    await waitFor(() => {
      expect(result.current.currentStep).toBe(0);
      expect(resetStepActionMockFn).toBeCalledTimes(1);
    });
  });

  it('should throw error for invalid step', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    await waitFor(() => {
      expect(() => result.current.setStep(4)).toThrow('Step not valid');
    });
  });
});
