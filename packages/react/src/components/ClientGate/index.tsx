import { PropsWithChildren, ReactNode, useSyncExternalStore } from 'react';

import { noop } from '@modern-kit/utils';

interface ClientGateProps {
  fallback?: JSX.Element;
}

const subscribe = () => noop;
const getSnapshot = () => false;
const getServerSnapshot = () => true;

/**
 * @description Client Side에서는 children을, Server Side에서는 fallback component를 보여주는 컴포넌트입니다.
 *
 * @param {ClientGateProps} props - 컴포넌트의 속성
 * @param {JSX.Element} props.fallback - 서버 렌더링 시 표시할 대체 요소
 * @param {React.ReactNode} props.children - 클라이언트에서 렌더링할 자식 요소
 * @returns {React.ReactNode} - 서버에서는 fallback을, 클라이언트에서는 children을 반환
 */
export function ClientGate({
  fallback = <></>,
  children,
}: PropsWithChildren<ClientGateProps>): ReactNode {
  const isServer = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return isServer ? fallback : children;
}
