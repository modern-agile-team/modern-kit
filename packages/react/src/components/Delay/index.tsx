import { useTimeout } from '../../hooks/useTimeout';
import React, { useState } from 'react';

interface DelayProps {
  children: React.ReactNode;
  delay: number;
  fallback?: React.ReactNode;
}

/**
 * @description 지정된 시간이 지난 후에 자식 컴포넌트를 렌더링하는 컴포넌트입니다.
 * 지연 시간 동안에는 fallback 컴포넌트가 렌더링됩니다.
 *
 * @param {DelayProps} props - 컴포넌트 속성
 * @param {React.ReactNode} props.children - 지연 후 렌더링할 자식 컴포넌트
 * @param {number} props.delay - 지연 시간 (밀리초)
 * @param {React.ReactNode} props.fallback - 지연 시간 동안 표시할 대체 컴포넌트
 *
 * @example
 * ```tsx
 * <Delay delay={1000} fallback={<Fallback />}>
 *   <Component />
 * </Delay>
 * ```
 */
export const Delay = ({ children, delay, fallback }: DelayProps) => {
  const [isReady, setIsReady] = useState(() => delay <= 0);

  useTimeout(() => setIsReady(true), delay);

  return <>{isReady ? children : fallback}</>;
};
