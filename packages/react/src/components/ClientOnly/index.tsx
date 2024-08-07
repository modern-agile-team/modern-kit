import { ReactNode } from 'react';
import { useIsMounted } from '../../hooks/useIsMounted';

interface ClientOnlyProps {
  fallback?: ReactNode;
}

export const ClientOnly = ({
  fallback = <></>,
  children,
}: React.PropsWithChildren<ClientOnlyProps>) => {
  const isMounted = useIsMounted();

  if (!isMounted) return fallback;
  return <>{children}</>;
};
