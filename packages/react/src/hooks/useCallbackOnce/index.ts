import { usePreservedCallback } from '../usePreservedCallback';
import { useRef } from 'react';
/**
 * @description
 * 주어진 콜백 함수가 최초 실행 이후 다시 실행되지 않도록 보장하는 커스텀 훅입니다.
 * 이 훅은 콜백 함수가 **한 번만 실행**되도록 하여, 불필요한 콜백 호출을 방지하고 최적화를 도와줍니다.
 *
 * @template F - 콜백 함수의 타입. 콜백 함수는 인자들을 받을 수 있는 함수여야 합니다.
 * @param {F} callback - 최초 한 번 실행될 콜백 함수.
 *
 * @returns {F} - 최초 한 번만 실행되는 메모이제이션된 콜백 함수.
 *
 * @example
 * const MyComponent = () => {
 *   const handleClick = useCallbackOnce((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
 *     console.log('최초 한번만 실행됩니다.');
 *   });
 *
 *   return <div onClick={handleClick}>Click me</div>;
 * };
 */
export function useCallbackOnce<F extends (...args: any[]) => void>(
  callback: F
) {
  const hasExecuted = useRef(false);
  const memoizedCallback = usePreservedCallback((...args: Parameters<F>) => {
    if (hasExecuted.current) return;
    callback(...args);
    hasExecuted.current = true;
  });

  return memoizedCallback;
}
