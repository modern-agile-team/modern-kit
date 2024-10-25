import { PropsWithChildren, useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

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
