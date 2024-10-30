import { mergeRefs } from '../../hooks/useMergeRefs';
import { mergeProps, getElementRef } from './Slot.utils';
import React from 'react';

type SlotProps = React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>;

/**
 * @description 주어진 Props를 직계 자식 컴포넌트에 병합하는 컴포넌트입니다.
 */
const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    // 렌더링할 새 요소로 `Slottable`의 children으로 전달된 요소를 할당한다.
    const newElement = slottable.props.children;

    // childrenArray를 순회하면서 새로운 자식 요소를 생성한다.
    // Slottable 컴포넌트를 발견하면 해당 자식 요소를 새로운 자식으로 교체한다.
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React.Children.count(newElement) > 1) {
          return React.Children.only(null);
        }
        return React.isValidElement(newElement)
          ? (newElement.props.children as React.ReactNode)
          : null;
      }
      return child;
    });

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {React.isValidElement(newElement)
          ? React.cloneElement(newElement, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }

  // Slottable 컴포넌트가 존재하지 않을 경우, children을 그대로 렌더링한다.
  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

Slot.displayName = 'Slot';

/**
 * @description Slot의 자식 요소를 복제하고, slotProps와 자식 요소의 props를 병합한다.
 */
const SlotClone = React.forwardRef<HTMLElement, React.PropsWithChildren>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (React.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      return React.cloneElement(children, {
        ...mergeProps(slotProps, children.props), // props 병합
        // @ts-ignore
        ref: forwardedRef ? mergeRefs(forwardedRef, childrenRef) : childrenRef, // ref 병합
      });
    }

    return React.Children.count(children) > 1
      ? React.Children.only(null)
      : null;
  }
);

SlotClone.displayName = 'SlotClone';

/**
 * @description Slot 컴포넌트의 자식 요소로 사용되며, Slot이 렌더링할 대상이다.
 */
const Slottable = ({ children }: React.PropsWithChildren) => {
  return <>{children}</>;
};

/**
 * @description child가 유효한 React 요소인지 확인하고, type이 'Slottable' 컴포넌트인지 확인한다.
 */
function isSlottable(
  child: React.ReactNode
): child is React.ReactElement<React.PropsWithChildren> {
  return React.isValidElement(child) && child.type === Slottable;
}

export { Slot, Slottable };
export type { SlotProps };
