import { SetStateAction, useCallback } from 'react';
import { StepAction, useStep } from '../useStep';

interface UseCycleListReturnType<T> {
  currentItem: T;
  nextIndex: (action?: StepAction) => void;
  prevIndex: (action?: StepAction) => void;
  setIndex: (index: SetStateAction<number>, action?: StepAction) => void;
  resetIndex: (action?: StepAction) => void;
}
/**
 * @description 배열을 요소를 `순환`하며 다음(`nextIndex`), 이전(`prevIndex`) 또는 특정 인덱스로 이동(`setIndex`) 할 수 있는 기능을 제공하는 훅입니다.
 *
 * @template T - 배열 요소의 타입.
 * @param {[T[] | readonly T[]]} arr - 순환할 요소들을 포함한 배열입니다. 읽기 전용 배열일 수도 있습니다.
 * @param {number} [initialIndex=0] - 순환을 시작할 초기 인덱스입니다. 기본값은 0입니다.
 * @returns {UseCycleListReturnType<T>} 현재 배열의 요소와 인덱스를 조작할 수 있는 함수들을 반환합니다:
 * - `currentItem`: 현재 인덱스에 해당하는 배열 요소입니다.
 * - `nextIndex`: 배열의 다음 요소로 인덱스를 이동하는 함수입니다.
 * - `prevIndex`: 배열의 이전 요소로 인덱스를 이동하는 함수입니다.
 * - `setIndex`: 인덱스를 지정된 값으로 설정하는 함수입니다. 함수형 업데이트도 지원합니다.
 * - `resetIndex`: 인덱스를 초기 값으로 설정하는 함수입니다.
 *
 * @example
 * const { currentItem, nextIndex, prevIndex, setIndex } = useCycleList(['a', 'b', 'c']);
 *
 * currentItem; // 'a'
 *
 * nextIndex();
 * currentItem; // 'b'
 *
 * prevIndex();
 * currentItem; // 'a'
 *
 * setIndex(2);
 * currentItem; // 'c'
 *
 * resetIndex();
 * currentItem; // 'a'
 */
export function useCycleList<T>(
  arr: T[] | readonly T[],
  initialIndex: number = 0
): UseCycleListReturnType<T> {
  const { currentStep, goToNextStep, goToPrevStep, setStep, resetStep } =
    useStep({
      maxStep: arr.length - 1,
      initialStep: initialIndex,
      infinite: true,
    });

  return {
    currentItem: arr[currentStep],
    nextIndex: goToNextStep,
    prevIndex: goToPrevStep,
    setIndex: setStep,
    resetIndex: resetStep,
  };
}
