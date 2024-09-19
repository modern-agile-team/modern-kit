import { useReducer } from 'react';

const updateReducer = (num: number) => (num + 1) % 10000000;

/**
 * @description 컴포넌트의 리렌더링을 강제하는 커스텀 훅입니다.
 * 이 훅은 `forceUpdate` 함수를 제공하며, 이 함수를 호출하면 컴포넌트를 강제로 리렌더링합니다.
 *
 * @returns {() => void} - 호출 시 컴포넌트를 강제로 리렌더링하는 함수입니다.
 *
 * @example
 * const forceUpdate = useForceUpdate();
 */
export function useForceUpdate(): () => void {
  const [, forceUpdate] = useReducer(updateReducer, 0);

  return forceUpdate;
}
