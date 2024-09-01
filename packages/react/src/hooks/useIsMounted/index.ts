import { useEffect, useState } from 'react';

/**
 * @description `마운트`된 상태인지 여부를 확인할 수 있는 상태 값을 제공하는 커스텀 훅입니다.
 *
 * 이 훅은 컴포넌트가 처음 마운트되면 `true` 값을 반환하며, 마운트되기 전에는 `false`를 반환합니다.
 * 이를 통해 컴포넌트의 `생명 주기`에 따라 특정 로직을 처리할 수 있습니다.
 *
 * `SSR` 환경에서 실제 컴포넌트가 브라우저에 mount 되었다는 것을 보장하기 위해 사용할 수 있습니다.
 *
 * @returns {boolean} 컴포넌트가 마운트된 상태(`true` 또는 `false`).
 *
 * @example
 * const isMounted = useIsMounted();
 */
export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
