import { SetStateAction, useCallback, useState } from 'react';
import { isFunction } from '@modern-kit/utils';

type StepType = 'nextStep' | 'prevStep';

export type StepAction = ({
  prev,
  next,
}: {
  prev: number;
  next: number;
}) => void;

export interface UseStepProps {
  maxStep: number;
  initialStep?: number;
  infinite?: boolean;
}

interface UseStepReturnType {
  currentStep: number;
  hasNextStep: boolean;
  hasPrevStep: boolean;
  goToNextStep: (action?: StepAction) => void;
  goToPrevStep: (action?: StepAction) => void;
  setStep: (step: SetStateAction<number>, action?: StepAction) => void;
  resetStep: (action?: StepAction) => void;
}

/**
 * @description 단계별로 이동할 수 있는 기능을 제공하며, 초기 단계 설정, 다음 단계로의 이동, 이전 단계로의 이동, 특정 단계로의 설정 등의 기능을 포함합니다.
 * 스텝 설정 함수 호출 시 `action` 함수를 인자로 넣어 원하는 action을 실행 시킬 수 있습니다.
 *
 * @param {Object} props - 훅에 전달되는 매개변수 객체
 * @property {number} props.maxStep - 가능한 최대 단계. 이 값은 필수이며, 최종 단계의 번호를 정의합니다.
 * @property {number} [props.initialStep=0] - 초기 단계. 기본값은 0이며, 이 값으로 훅을 처음 사용할 때 설정될 단계가 결정됩니다.
 * @property {boolean} [props.infinite=false] - 무한 반복 여부. true일 경우, 마지막 단계에서 'nextStep'을 호출하면 첫 단계로 돌아가며, 첫 단계에서 'prevStep'을 호출하면 마지막 단계로 이동합니다. 기본값은 false입니다.
 *
 * @returns {UseStepReturnType} 단계 관리 기능을 제공하는 여러 함수 및 값들을 반환합니다.
 * - `currentStep`: 현재 단계. 현재 진행 중인 단계를 나타냅니다.
 * - `hasNextStep`: 다음 단계가 있는지 여부를 반환합니다.
 * - `hasPrevStep`: 이전 단계가 있는지 여부를 반환합니다.
 * - `goToNextStep`: 다음 단계로 이동하는 함수입니다.
 * - `goToPrevStep`: 이전 단계로 이동하는 함수입니다.
 * - `setStep`: 특정 단계로 이동하는 함수입니다.
 * - `resetStep`: 초기 단계로 리셋하는 함수입니다.
 *
 * @example
 * const {
 *   currentStep,
 *   goToNextStep,
 *   goToPrevStep,
 *   setStep,
 *   resetStep,
 * } = useStep({ maxStep: 5 });
 *
 * currentStep; // 0, 초기값
 *
 * goToNextStep(); // 다음 단계로 이동
 * currentStep; // 1
 *
 * goToPrevStep(); // 이전 단계로 이동
 * currentStep; // 0
 *
 * setStep(3); // 3단계로 이동
 * currentStep // 3;
 *
 * resetStep(); // 초기 단계로 리셋
 * currentStep; // 0
 */
export function useStep({
  maxStep,
  initialStep = 0,
  infinite = false,
}: UseStepProps): UseStepReturnType {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const hasNextStep = currentStep < maxStep;
  const hasPrevStep = currentStep > 0;

  const getNextStep = useCallback(
    (type: StepType, isOverflow: boolean) => {
      const isNextStepType = type === 'nextStep';

      if (isOverflow) {
        return isNextStepType ? 0 : maxStep;
      }
      return isNextStepType ? currentStep + 1 : currentStep - 1;
    },
    [maxStep, currentStep]
  );

  const handleStep = useCallback(
    (type: StepType, isOverflow: boolean, action?: StepAction) => {
      if (isOverflow && !infinite) return;

      const nextStep = getNextStep(type, isOverflow);

      if (action) {
        action({ prev: currentStep, next: nextStep });
      }
      setCurrentStep(nextStep);
    },
    [infinite, currentStep, getNextStep]
  );

  const goToNextStep = useCallback(
    (action?: StepAction) => {
      handleStep('nextStep', !hasNextStep, action);
    },
    [hasNextStep, handleStep]
  );

  const goToPrevStep = useCallback(
    (action?: StepAction) => {
      handleStep('prevStep', !hasPrevStep, action);
    },
    [hasPrevStep, handleStep]
  );

  const setStep = useCallback(
    (step: SetStateAction<number>, action?: StepAction) => {
      const nextStep = isFunction(step) ? step(currentStep) : step;
      const isValidNextStep = nextStep >= 0 && nextStep <= maxStep;

      if (isValidNextStep) {
        if (action) {
          action({ prev: currentStep, next: nextStep });
        }
        setCurrentStep(step);
        return;
      }
      throw new Error('Step not valid');
    },
    [currentStep, maxStep]
  );

  const resetStep = useCallback(
    (action?: StepAction) => {
      if (action) {
        action({ prev: currentStep, next: initialStep });
      }
      setCurrentStep(initialStep);
    },
    [currentStep, initialStep]
  );

  return {
    currentStep,
    hasNextStep,
    hasPrevStep,
    goToNextStep,
    goToPrevStep,
    setStep,
    resetStep,
  };
}
