import { useCallback } from 'react';
import { useStep } from '../useStep';

export const useCycleList = <T>(
  array: T[] | readonly T[],
  initialIndex = 0
) => {
  const { currentStep, goToNextStep, goToPrevStep, setStep } = useStep({
    maxStep: array.length - 1,
    initialStep: initialIndex,
    infinite: true,
  });

  const setIndex = useCallback(
    (
      index: number | ((index: number) => number),
      action?: Parameters<typeof setStep>[1]
    ) => {
      setStep(index, action);
    },
    [setStep]
  );

  return {
    currentItem: array[currentStep],
    nextIndex: goToNextStep,
    prevIndex: goToPrevStep,
    setIndex,
  } as const;
};
