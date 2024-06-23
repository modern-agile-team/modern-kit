import { useCallback, useState } from 'react';
import { isFunction } from '@modern-kit/utils';

interface UseStepProps {
  maxStep: number;
  initialStep?: number;
}

type StepAction = ({
  prevStep,
  nextStep,
}: {
  prevStep: number;
  nextStep: number;
}) => void;

export const useStep = ({ maxStep, initialStep = 1 }: UseStepProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const hasNextStep = currentStep < maxStep;
  const hasPrevStep = currentStep > 1;

  const setStep = useCallback(
    (step: number | ((step: number) => number), action?: StepAction) => {
      const nextStep = isFunction(step) ? step(currentStep) : step;
      const isValidNextStep = nextStep >= 1 && nextStep <= maxStep;

      if (isValidNextStep) {
        if (action) action({ prevStep: currentStep, nextStep: nextStep });
        setCurrentStep(step);
        return;
      }
      throw new Error('Step not valid');
    },
    [currentStep, maxStep]
  );

  const nextStep = useCallback(
    (action?: StepAction) => {
      if (!hasNextStep) return;

      if (action) action({ prevStep: currentStep, nextStep: currentStep + 1 });
      setCurrentStep((step) => step + 1);
    },
    [currentStep, hasNextStep]
  );

  const prevStep = useCallback(
    (action?: StepAction) => {
      if (!hasPrevStep) return;

      if (action) action({ prevStep: currentStep, nextStep: currentStep - 1 });
      setCurrentStep((step) => step - 1);
    },
    [currentStep, hasPrevStep]
  );

  const resetStep = useCallback(
    (action?: StepAction) => {
      if (action) action({ prevStep: currentStep, nextStep: initialStep });
      setCurrentStep(initialStep);
    },
    [currentStep, initialStep]
  );

  return {
    currentStep,
    hasNextStep,
    hasPrevStep,
    setStep,
    nextStep,
    prevStep,
    resetStep,
  } as const;
};
