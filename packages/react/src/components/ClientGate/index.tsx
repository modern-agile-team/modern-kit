import { PropsWithChildren, useSyncExternalStore } from 'react';

import { noop } from '@modern-kit/utils';

const emptySubscribe = () => noop;

interface ClientGateProps {
  fallback?: JSX.Element;
}

export function ClientGate({
  fallback = <></>,
  children,
}: PropsWithChildren<ClientGateProps>) {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true,
  );

  return isServer ? fallback : children;
}
