import { ComponentProps, ElementType, ReactNode } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

type OutsideClickProp<Tag extends ElementType> = ComponentProps<Tag> & {
  children: ReactNode;
} & {
  as?: Tag;
  callback: () => void;
};

export function OutsideClick<
  E extends HTMLElement = HTMLDivElement,
  Tag extends ElementType = 'div'
>({ as, children, callback, ...props }: OutsideClickProp<Tag>) {
  const { ref } = useOnClickOutside<E>(callback);

  const Component = as || 'div';

  return (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  );
}
