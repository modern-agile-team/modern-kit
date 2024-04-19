import { Children, cloneElement } from 'react';
import { DebounceParameters, useDebounce } from '../../hooks/useDebounce';

export interface DebounceWrapperProps {
  children: JSX.Element;
  capture: string;
  wait: DebounceParameters[1];
  options?: DebounceParameters[2];
}

export const DebounceWrapper = ({
  children,
  capture,
  wait,
  options,
}: DebounceWrapperProps) => {
  // If children is a valid element, returns that element. Otherwise, throws an error.
  const child = Children.only(children);
  const debouncedCallback = useDebounce(
    (...args: any) => {
      const childProps = child?.props;

      if (!childProps) return;
      if (typeof childProps[capture] === 'function') {
        return childProps[capture](...args);
      }
    },
    wait,
    options
  );

  // cloneElement lets you create a new React element using another element as a starting point.
  return cloneElement(child, {
    [capture]: debouncedCallback,
  });
};
