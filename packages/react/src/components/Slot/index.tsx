import { useMergeRefs } from '../../hooks/useMergeRefs';
import { mergeProps, getElementRef } from './Slot.utils';
import React from 'react';

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * @description 주어진 Props를 직계 자식 컴포넌트에 병합하고, 자식 컴포넌트를 렌더링하는 컴포넌트입니다.
 *
 * Slot은 부모 컴포넌트의 기능을 자식 컴포넌트에 전달하는 합성 패턴을 구현합니다. 이를 통해:
 * - 부모 컴포넌트의 `props`, `ref`, `이벤트 핸들러` 등을 자식 컴포넌트에 전달할 수 있습니다.
 * - 자식 컴포넌트의 구현을 변경하지 않고도 새로운 기능을 추가할 수 있습니다.
 * - 컴포넌트 간의 결합도를 낮추고 재사용성을 높일 수 있습니다.
 *
 * Slot은 아래와 같은 특징이 있습니다.
 * - 자식 요소로 `단일 요소`만 허용됩니다.
 * - 자식 요소로 컴포넌트가 온다면 해당 컴포넌트는 필수적으로 `forwardRef`, `props`를 허용해야 합니다. 허용하지 않으면 기능이 정상적으로 동작하지 않습니다.
 *  - Slot을 사용 할 경우 아래 링크를 참고하세요.
 *
 * @see https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-spread-props
 * @see https://www.radix-ui.com/primitives/docs/guides/composition#your-component-must-forward-ref
 *
 * @example
 * ```tsx
 * import React from "react";
 * import { Slot } from "@modern-kit/react";
 *
 * function Button({ asChild, ...props }) {
 *   const Comp = asChild ? Slot : "button";
 *   return <Comp {...props} />;
 * }
 *
 * // default
 * <Button onClick={onClick}>Button</Button>
 *
 * // asChild
 * <Button asChild onClick={onClick}>
 *   <div>asChild Button</div>
 * </Button>
 * ```
 */
export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  (props, forwardedRef) => {
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
            ? ((newElement as React.ReactElement<React.PropsWithChildren>).props.children)
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
  }
);

Slot.displayName = 'Slot';

interface SlotCloneProps {
  children: React.ReactNode;
}

/**
 * @description Slot의 자식 요소를 복제하고, slotProps와 자식 요소의 props를 병합한다.
 */
const SlotClone = React.forwardRef<HTMLElement, SlotCloneProps>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    const childRef = React.isValidElement(children)
      ? getElementRef(children)
      : null;
    const mergedRefs = useMergeRefs(forwardedRef, childRef);

    if (!React.isValidElement(children)) {
      return React.Children.count(children) > 1
        ? React.Children.only(null)
        : null;
    }

    return React.cloneElement(children, {
      ...mergeProps(slotProps, children.props as Record<string, any>),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref: forwardedRef ? mergedRefs : childRef,
    });
  }
);

SlotClone.displayName = 'SlotClone';

interface SlottableProps {
  children?: React.ReactNode;
}

/**
 * @description Slot 컴포넌트의 자식 요소로 사용되며, Slot이 렌더링할 대상이다.
 */
export const Slottable = ({ children }: SlottableProps) => {
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
