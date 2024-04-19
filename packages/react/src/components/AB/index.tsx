import React, { PropsWithChildren, useEffect } from 'react';
import { abRandom, noop } from '@modern-kit/utils';
import { usePreservedCallback } from '../../hooks/usePreservedCallback';

interface ABProps {
  renderAction?: () => void;
}

const OVER_COUNT = 2;

export const AB = ({ children }: PropsWithChildren) => {
  const ab = abRandom();
  const childrenList = React.Children.toArray(children) as JSX.Element[];
  let aCount = 0;
  let bCount = 0;

  if (childrenList.length !== 2) {
    return null;
  }

  for (const child of childrenList) {
    const isValidComponentType = [AB.CaseA, AB.CaseB].includes(child.type);

    if (!isValidComponentType) {
      return null;
    }

    if (child.type === AB.CaseA) {
      aCount += 1;
    } else {
      bCount += 1;
    }
  }

  if (aCount >= OVER_COUNT || bCount >= OVER_COUNT) {
    return null;
  }
  return ab ? childrenList[0] : childrenList[1];
};

AB.CaseA = ({ children, renderAction }: PropsWithChildren<ABProps>) => {
  const callbackRenderAction = usePreservedCallback(renderAction || noop);

  useEffect(() => {
    callbackRenderAction();
  }, [callbackRenderAction]);

  return <React.Fragment>{children}</React.Fragment>;
};

AB.CaseB = ({ children, renderAction }: PropsWithChildren<ABProps>) => {
  const callbackRenderAction = usePreservedCallback(renderAction || noop);

  useEffect(() => {
    callbackRenderAction();
  }, [callbackRenderAction]);

  return <React.Fragment>{children}</React.Fragment>;
};
