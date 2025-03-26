import { useSyncExternalStore } from 'react';
import { noop } from '@modern-kit/utils';

const subscribe = () => noop;
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * @description 현재 렌더링 환경이 클라이언트인지 여부를 반환하는 커스텀 훅입니다.
 *
 * mount 여부를 확인하는 것이 아니라 현재 렌더링 환경이 클라이언트인지 여부를 확인합니다.
 * - mount 여부를 확인하려면 `useIsMounted`를 사용하세요.
 *
 * 일반적인 `useEffect`를 사용하여 클라이언트 환경임을 감지할 경우 다음과 같은 문제가 발생할 수 있습니다:
 * - 초기 렌더링에서 false를 반환
 * - `useEffect` 실행 후 true를 반환하는 `이중 렌더링` 발생
 *
 * @returns {boolean} 클라이언트 환경이면 true, 서버 환경이면 false를 반환합니다.
 *
 * @example
 * ```tsx
 * const isClient = useIsClient();
 *
 * return <div>{isClient ? 'client' : 'server'}</div>
 * ```
 */
export const useIsClient = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
