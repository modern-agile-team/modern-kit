import { useCallback, useState } from 'react';
import { isFunction } from '@modern-kit/utils';

type StepType = 'nextStep' | 'prevStep';

interface UseStepProps {
  maxStep: number;
  initialStep?: number;
  infinite?: boolean;
}

type StepAction = ({
  prevStep,
  nextStep,
}: {
  prevStep: number;
  nextStep: number;
}) => void;

export const useStep = ({
  maxStep,
  initialStep = 1,
  infinite = false,
}: UseStepProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const hasNextStep = currentStep < maxStep;
  const hasPrevStep = currentStep > 1;

  const setStep = useCallback(
    (step: number | ((step: number) => number), action?: StepAction) => {
      const nextStep = isFunction(step) ? step(currentStep) : step;
      const isValidNextStep = nextStep >= 1 && nextStep <= maxStep;

      if (isValidNextStep) {
        if (action) {
          action({ prevStep: currentStep, nextStep });
        }
        setCurrentStep(step);
        return;
      }
      throw new Error('Step not valid');
    },
    [currentStep, maxStep]
  );

  const getNextStep = useCallback(
    (type: StepType, isOverflow: boolean) => {
      const isNextStepType = type === 'nextStep';

      if (isOverflow) {
        return isNextStepType ? 1 : maxStep;
      }
      return isNextStepType ? currentStep + 1 : currentStep - 1;
    },
    [maxStep, currentStep]
  );

  const handleStepOverflow = useCallback(
    (type: StepType, action?: StepAction) => {
      if (!infinite) return;

      const nextStep = getNextStep(type, true);

      if (action) {
        action({ prevStep: currentStep, nextStep });
      }
      setCurrentStep(nextStep);
    },
    [infinite, currentStep, getNextStep]
  );

  const handleStepWithinBounds = useCallback(
    (type: StepType, action?: StepAction) => {
      const nextStep = getNextStep(type, false);

      if (action) {
        action({ prevStep: currentStep, nextStep });
      }
      setCurrentStep(nextStep);
    },
    [currentStep, getNextStep]
  );

  const goToNextStep = useCallback(
    (action?: StepAction) => {
      if (!hasNextStep) {
        handleStepOverflow('nextStep', action);
        return;
      }
      handleStepWithinBounds('nextStep', action);
    },
    [hasNextStep, handleStepWithinBounds, handleStepOverflow]
  );

  const goToPrevStep = useCallback(
    (action?: StepAction) => {
      if (!hasPrevStep) {
        handleStepOverflow('prevStep', action);
        return;
      }
      handleStepWithinBounds('prevStep', action);
    },
    [hasPrevStep, handleStepWithinBounds, handleStepOverflow]
  );

  const resetStep = useCallback(
    (action?: StepAction) => {
      if (action) {
        action({ prevStep: currentStep, nextStep: initialStep });
      }
      setCurrentStep(initialStep);
    },
    [currentStep, initialStep]
  );

  return {
    currentStep,
    hasNextStep,
    hasPrevStep,
    setStep,
    goToNextStep,
    goToPrevStep,
    resetStep,
  } as const;
};
