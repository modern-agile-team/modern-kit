import {
  useEffect,
  useRef,
  type DependencyList,
  type EffectCallback,
} from 'react';
import { isFunction } from '@modern-kit/utils';

/**
 * @description 주어진 조건이 true일 때 effect를 실행하는 커스텀 훅입니다.
 *
 * 의존성 배열이 변경될 때마다 주어진 조건을 확인하고 true일 때 effectCallback 함수를 실행합니다.
 *
 * 조건 함수인 경우 이전 의존성 배열(prevDeps)과 현재 의존성 배열(currentDeps)을 인자로 받아 더 세밀한 조건 판단을 할 수 있습니다.
 *
 * @template D - 의존성 리스트의 타입
 * @param {EffectCallback} effectCallback - 실행할 effectCallback 함수
 * @param {D} deps - 의존성 리스트
 * @param {boolean | ((prevDeps: D | undefined, currentDeps: D) => boolean)} condition - effectCallback 함수를 실행할 조건을 결정하는 함수 또는 불리언 값.
 * @example
 * useConditionalEffect(
 *   () => {
 *     console.log('effect');
 *   },
 *   [count],
 *   // 의존성 배열의 count가 증가할 때만 effect 실행
 *   (prevDeps, currentDeps) => prevDeps != null && prevDeps[0] < currentDeps[0]
 * );
 */
export function useConditionalEffect<D extends DependencyList>(
  effectCallback: EffectCallback,
  deps: D,
  condition: boolean | ((prevDeps: D | undefined, currentDeps: D) => boolean)
) {
  const prevDeps = useRef<D | undefined>(undefined);

  useEffect(() => {
    const conditionToUse = isFunction(condition)
      ? condition(prevDeps.current, deps)
      : condition;

    if (conditionToUse) {
      const cleanup = effectCallback();
      prevDeps.current = deps;
      return cleanup;
    }
    prevDeps.current = deps;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
