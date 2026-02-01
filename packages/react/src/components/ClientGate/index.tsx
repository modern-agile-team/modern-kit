import React from 'react';
import { useIsClient } from '../../hooks/useIsClient';

interface ClientGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * @description `ClientGate`는 렌더링 환경에 따라 다른 컨텐츠를 보여주는 컴포넌트입니다:
 * - Client Side: `children` 컴포넌트를 렌더링
 * - Server Side: `fallback` 컴포넌트를 렌더링
 *
 * `CSR(Client-Side Rendering)` 환경에서는 컴포넌트가 마운트되기 전부터 children이 렌더링됩니다.
 *
 * 일반적인 `useEffect` 사용하여 클라이언트 사이드 렌더링을 감지할 경우, 다음과 같은 문제가 발생할 수 있습니다:
 * - 초기 렌더링에서 fallback이 표시됨
 * - `useEffect` 실행 후 children으로 리렌더링되는 `이중 렌더링` 발생
 *
 * `useSyncExternalStore`를 사용하여 서버와 클라이언트 간의 hydration mismatch를 방지합니다.
 * @see https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store#usesyncexternalstore
 *
 * @param {ClientGateProps} props - 컴포넌트의 속성
 * @param {React.ReactNode} props.children - 클라이언트에서 렌더링할 자식 요소
 * @param {React.ReactNode} props.fallback - 서버 렌더링 시 표시할 대체 요소
 * @returns {JSX.Element} - 서버에서는 fallback을, 클라이언트에서는 children을 반환
 *
 * @example
 * <ClientGate fallback={<div>서버 환경입니다.</div>}>
 *   <div>클라이언트 환경입니다.</div>
 * </ClientGate>
 */
export function ClientGate({
  fallback,
  children,
}: ClientGateProps): React.JSX.Element {
  const isClient = useIsClient();

  return <>{isClient ? children : fallback}</>;
}
