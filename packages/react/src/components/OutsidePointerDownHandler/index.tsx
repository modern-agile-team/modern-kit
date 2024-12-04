import { ReactNode } from 'react';
import { useOutsidePointerDown } from '../../hooks/useOutsidePointerDown';
import { useMergeRefs } from '../../hooks/useMergeRefs';
import { polymorphicForwardRef } from 'utils';
import { Slot } from '../Slot';

interface OutsidePointerDownHandlerProps {
  asChild?: boolean;
  onPointerDown: () => void;
  children: ReactNode;
}

export const OutsidePointerDownHandler = polymorphicForwardRef<
  'div',
  OutsidePointerDownHandlerProps
>(({ as = 'div', asChild = false, onPointerDown, ...props }, ref) => {
  const targetRef = useOutsidePointerDown<HTMLElement>(onPointerDown);

  const Wrapper = asChild ? Slot : as;

  return <Wrapper ref={useMergeRefs(targetRef, ref)} {...props} />;
});
