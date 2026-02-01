import * as React from 'react';

type AnyProps = Record<string, any>;

/**
 * @description Slot 컴포넌트의 props와 자식 요소의 props를 병합하는 함수입니다.
 */
export function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // 모든 자식의 props를 오버라이드 해야 합니다.
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // handler가 둘 다 존재하는 경우
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // handler가 slotProps에만 존재하는 경우
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // style 및 className 병합
    else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

type ElementWithRef = React.ReactElement<React.RefAttributes<HTMLElement>>;
// React 19 이전 버전에서 `element.props.ref`에 접근하면 경고가 표시되고, `element.ref` 사용을 제안합니다.
// React 19 부터는 `element.ref`에 액세스하면 그 반대가 됩니다.
// https://github.com/facebook/react/pull/28348
//
// 경고가 표시되지 않는 방법을 사용하여 ref에 접근합니다.
export function getElementRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get;
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as ElementWithRef).props.ref;
  }

  // Not DEV
  return (element as ElementWithRef).props.ref || (element as any).ref;
}
