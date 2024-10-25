import { useIsMounted } from '../../hooks/useIsMounted';

interface MountedProps {
  fallback?: JSX.Element;
}

export const Mounted = ({
  fallback = <></>,
  children,
}: React.PropsWithChildren<MountedProps>) => {
  const isMounted = useIsMounted();

  if (!isMounted) return fallback;
  return <>{children}</>;
};
