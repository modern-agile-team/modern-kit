import React from 'react';
import { useIsMounted } from '../../hooks/useIsMounted';

interface MountedProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * @description 컴포넌트가 마운트된 후에만 children을 렌더링하는 컴포넌트입니다.
 *
 * @param {MountedProps} props
 * @param {React.ReactNode} props.children - 마운트된 후 렌더링될 자식 컴포넌트
 * @param {React.ReactNode} props.fallback - 마운트되기 전에 표시될 대체 컴포넌트 (선택사항)
 * @returns {React.JSX.Element} 마운트 상태에 따라 children 또는 fallback을 렌더링
 *
 * @example
 * <Mounted fallback={<div>fallback component</div>}>
 *   <div>children component</div>
 * </Mounted>
 */
export const Mounted = ({ fallback, children }: MountedProps): React.JSX.Element => {
  const isMounted = useIsMounted();

  if (!isMounted) return <>{fallback}</>;
  return <>{children}</>;
};
