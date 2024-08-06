import { useCallback, useState } from 'react';

/**
 * @description 카운터를 관리하는 커스텀 훅으로, 증가, 감소 및 리셋 기능을 제공합니다.
 *
 * @param {UseCounterProps} props - 카운터 초기화를 위한 속성들.
 * @returns {Object} 카운터 값, 설정 함수 및 제어 함수들을 포함한 객체.
 * @property {number} counter - 현재 카운터 값.
 * @property {React.Dispatch<React.SetStateAction<number>>} setCounter - 카운터 값을 수동으로 설정하는 함수.
 * @property {() => void} increment - 카운터를 1씩 증가시키는 함수
 * @property {() => void} decrement - 카운터를 1씩 감소시키는 함수
 * @property {() => void} reset - 카운터를 초기 값으로 리셋하는 함수.
 *
 * @example
 * const { counter, setCounter, increment, decrement, reset } = useCounter(10);
 *
 * increment(); // counter: 11
 * decrement(); // counter: 10
 * setCounter(20); // counter: 20
 * reset(); // counter: 10
 */
export function useCounter(initialValue: number = 0) {
  const [counter, setCounter] = useState(initialValue);

  const increment = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCounter((prev) => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCounter(initialValue);
  }, [initialValue]);

  return { counter, setCounter, increment, decrement, reset };
}
