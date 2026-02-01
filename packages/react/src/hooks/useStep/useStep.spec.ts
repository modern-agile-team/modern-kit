import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useStep } from '.';

describe('useStep', () => {
  const goToNextStepActionMockFn = vi.fn();
  const goToPrevStepActionMockFn = vi.fn();
  const setStepActionMockFn = vi.fn();
  const resetStepActionMockFn = vi.fn();

  it('initialStep로 초기화되어야 합니다.', () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, initialStep: 2 })
    );

    expect(result.current.currentStep).toBe(2);
    expect(result.current.hasNextStep).toBe(true);
    expect(result.current.hasPrevStep).toBe(true);
  });

  it('다음 단계로 이동하며, action 함수 제공 시 호출해야 합니다.', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 2 }));

    // nextStep
    result.current.goToNextStep()

    await waitFor(() => {
      expect(result.current.currentStep).toBe(1);
      expect(result.current.hasNextStep).toBe(true);
    });

    // nextStep
    result.current.goToNextStep(goToNextStepActionMockFn);
    await waitFor(() => {
      expect(result.current.currentStep).toBe(2);
      expect(result.current.hasNextStep).toBe(false);
      expect(goToNextStepActionMockFn).toBeCalledTimes(1);
    });
  });

  it('이전 단계로 이동하며, action 함수 제공 시 호출해야 합니다.', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, initialStep: 2 })
    );

    // prevStep
    result.current.goToPrevStep()
    await waitFor(() => {
      expect(result.current.currentStep).toBe(1);
      expect(result.current.hasPrevStep).toBe(true);
    });

    // prevStep with Function
    result.current.goToPrevStep(goToPrevStepActionMockFn)
    await waitFor(() => {
      expect(result.current.currentStep).toBe(0);
      expect(result.current.hasPrevStep).toBe(false);
      expect(goToPrevStepActionMockFn).toBeCalledTimes(1);
    });
  });

  it('infinite 옵션이 true인 경우 무한 루프를 처리해야 합니다.', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, infinite: true })
    );

    // prevStep
    result.current.goToPrevStep()
    await waitFor(() => expect(result.current.currentStep).toBe(3));

    // prevStep
    result.current.goToPrevStep()
    await waitFor(() => expect(result.current.currentStep).toBe(2));

    // prevStep
    result.current.goToPrevStep()
    await waitFor(() => expect(result.current.currentStep).toBe(1));

    // prevStep
    result.current.goToPrevStep()
    await waitFor(() => expect(result.current.currentStep).toBe(0));
  });

  it('setStep 함수를 통해 특정 step로 이동하며, action 함수 제공 시 호출해야 합니다.', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    // setStep number
    result.current.setStep(2, setStepActionMockFn);

    await waitFor(() => {
      expect(result.current.currentStep).toBe(2);
      expect(setStepActionMockFn).toBeCalledTimes(1);
    });

    // setStep Function

    result.current.setStep(
      (currentStep) => currentStep + 1,
      setStepActionMockFn
    );

    await waitFor(() => {
      expect(result.current.currentStep).toBe(3);
      expect(setStepActionMockFn).toBeCalledTimes(2);
    });
  });

  it('초기 step으로 이동해야 하며, action 함수 제공 시 호출해야 합니다.', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, initialStep: 2 })
    );

    result.current.goToNextStep();
    await waitFor(() => expect(result.current.currentStep).toBe(3));

    result.current.resetStep(resetStepActionMockFn);
    await waitFor(() => {
      expect(result.current.currentStep).toBe(2);
      expect(resetStepActionMockFn).toBeCalledTimes(1);
    });


  });

  it('유효하지 않은 step 일 시 에러를 던져야 합니다.', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    expect(() => result.current.setStep(4)).toThrow(
      '유효하지 않은 step입니다.'
    );
  });
});
