import { ReactNode } from 'react';
import { useOutsidePointerDown } from '../../hooks/useOutsidePointerDown';
import { useMergeRefs } from '../../hooks/useMergeRefs';
import { polymorphicForwardRef } from 'utils';
import { Slot } from '../Slot';

interface OutsidePointerDownProps {
  asChild?: boolean;
  onPointerDown: () => void;
  children: ReactNode;
}

export const OutsidePointerDown = polymorphicForwardRef<
  'div',
  OutsidePointerDownProps
>(({ as = 'div', asChild = false, onPointerDown, ...props }, ref) => {
  const targetRef = useOutsidePointerDown<HTMLElement>(onPointerDown);

  const OutsidePointerDownWrapper = asChild ? Slot : as;

  return (
    <OutsidePointerDownWrapper ref={useMergeRefs(targetRef, ref)} {...props} />
  );
});
