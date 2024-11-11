// /*
//   callback: 실행 할 콜백
//   delay: timeout delay
//   deps: 의존성 배열
//   callOnMount: 최초 마운트 시에 callback 호출 할 것인지 결정
// */
// useDependencyTimeout(callback, delay, deps, { callOnMount });

import { useEffect, useRef } from 'react';
import { useTimeout } from '../useTimeout';

export default function useDependencyTimeout(
  callback: () => void,
  delay: number,
  deps: unknown[],
  { callOnMount }: { callOnMount: boolean }
) {
  const isFirstMount = useRef(true);
  const { set, reset, clear } = useTimeout(callback, delay);

  useEffect(() => {
    if (isFirstMount.current) {
      if (callOnMount) {
        callback();
      }
      isFirstMount.current = false;
    }
    reset();
  }, [callOnMount, callback, ...deps]);

  return { set, reset, clear };
}
