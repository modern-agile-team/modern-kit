import { ComponentProps, ElementType, ReactNode, forwardRef } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useMergeRefs } from '../../hooks/useMergeRefs';

type NonHaveChildElements =
  | 'input'
  | 'textarea'
  | 'img'
  | 'br'
  | 'hr'
  | 'meta'
  | 'link'
  | 'base'
  | 'col'
  | 'embed'
  | 'source'
  | 'track'
  | 'wbr';

type NoChildren<Tag extends ElementType> = Tag extends NonHaveChildElements
  ? { children?: never }
  : { children: ReactNode };

type AsRequired<Tag extends ElementType> = Tag extends 'div'
  ? { as?: Tag }
  : { as: Tag };

type AllowedTagName<Tag extends ElementType> =
  Tag extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[Tag]
    : HTMLElement;

type OutsideClickProps<Tag extends ElementType> = ComponentProps<Tag> &
  AsRequired<Tag> &
  NoChildren<Tag> & {
    callback: () => void;
  };

const OutsideClick = <Tag extends ElementType = 'div'>(
  { as, children, callback, ...props }: OutsideClickProps<Tag>,
  ref: React.ForwardedRef<any>
) => {
  const { ref: outsideRef } = useOnClickOutside<AllowedTagName<Tag>>(callback);

  const Component = as || 'div';

  return (
    <Component ref={useMergeRefs(outsideRef, ref)} {...props}>
      {children}
    </Component>
  );
};

const OutsideClickWithForwardRef = forwardRef(
  OutsideClick
) as typeof OutsideClick;

export { OutsideClickWithForwardRef as OutsideClick };
