import React from 'react';
import { PropsWithChildren } from 'react';

type Condition = boolean | ((...args: any[]) => boolean);

interface WhenProps {
  condition: Condition;
  fallback?: React.ReactNode;
}

const getConditionResult = (condition: Condition) => {
  return typeof condition === 'function' ? condition() : condition;
};

export const When = ({
  children,
  condition,
  fallback,
}: PropsWithChildren<WhenProps>) => {
  const conditionResult = getConditionResult(condition);

  if (!conditionResult) return <React.Fragment>{fallback}</React.Fragment>;
  return <React.Fragment>{children}</React.Fragment>;
};
