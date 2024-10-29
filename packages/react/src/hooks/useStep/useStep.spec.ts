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

    await waitFor(() => result.current.goToNextStep());

    expect(result.current.currentStep).toBe(1);
    expect(result.current.hasNextStep).toBe(true);

    await waitFor(() => result.current.goToNextStep(goToNextStepActionMockFn));

    expect(result.current.currentStep).toBe(2);
    expect(result.current.hasNextStep).toBe(false);
    expect(goToNextStepActionMockFn).toBeCalledTimes(1);

    await waitFor(() => result.current.goToNextStep());

    expect(result.current.currentStep).toBe(2);
    expect(result.current.hasNextStep).toBe(false);
  });

  it('이전 단계로 이동하며, action 함수 제공 시 호출해야 합니다.', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, initialStep: 2 })
    );

    await waitFor(() => result.current.goToPrevStep());

    expect(result.current.currentStep).toBe(1);
    expect(result.current.hasPrevStep).toBe(true);

    await waitFor(() => result.current.goToPrevStep(goToPrevStepActionMockFn));

    expect(result.current.currentStep).toBe(0);
    expect(result.current.hasPrevStep).toBe(false);
    expect(goToPrevStepActionMockFn).toBeCalledTimes(1);

    await waitFor(() => result.current.goToPrevStep());

    expect(result.current.currentStep).toBe(0);
    expect(result.current.hasPrevStep).toBe(false);
  });

  it('infinite 옵션이 true인 경우 무한 루프를 처리해야 합니다.', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, infinite: true })
    );

    await waitFor(() => result.current.goToPrevStep());

    expect(result.current.currentStep).toBe(3);

    await waitFor(() => result.current.goToPrevStep());

    expect(result.current.currentStep).toBe(2);

    await waitFor(() => result.current.goToPrevStep());

    expect(result.current.currentStep).toBe(1);

    await waitFor(() => result.current.goToPrevStep());

    expect(result.current.currentStep).toBe(0);

    await waitFor(() => result.current.goToPrevStep());

    expect(result.current.currentStep).toBe(3);
  });

  it('setStep 함수를 통해 특정 step로 이동하며, action 함수 제공 시 호출해야 합니다.', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    // setStep number
    await waitFor(() => {
      result.current.setStep(2, setStepActionMockFn);
    });

    expect(result.current.currentStep).toBe(2);
    expect(setStepActionMockFn).toBeCalledTimes(1);

    // setStep Function
    await waitFor(() => {
      result.current.setStep((currentStep) => currentStep + 1);
    });

    expect(result.current.currentStep).toBe(3);
  });

  it('초기 step으로 이동해야 하며, action 함수 제공 시 호출해야 합니다.', async () => {
    const { result } = renderHook(() =>
      useStep({ maxStep: 3, initialStep: 2 })
    );

    await waitFor(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStep).toBe(3);

    await waitFor(() => {
      result.current.resetStep(resetStepActionMockFn);
    });

    expect(result.current.currentStep).toBe(2);
    expect(resetStepActionMockFn).toBeCalledTimes(1);
  });

  it('유효하지 않은 step 일 시 에러를 던져야 합니다.', async () => {
    const { result } = renderHook(() => useStep({ maxStep: 3 }));

    await waitFor(() => {
      expect(() => result.current.setStep(4)).toThrow('Step not valid');
    });
  });
});
