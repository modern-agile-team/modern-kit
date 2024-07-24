import React from 'react';

type Condition = boolean | (() => boolean);

interface IfElseProps {
  condition: Condition;
  trueComponent: React.ReactNode;
  falseComponent: React.ReactNode;
}

const getConditionResult = (condition: Condition) => {
  return typeof condition === 'function' ? condition() : condition;
};

export const IfElse = ({
  condition,
  trueComponent,
  falseComponent,
}: IfElseProps): JSX.Element => {
  const conditionResult = getConditionResult(condition);
  return (
    <React.Fragment>
      {conditionResult ? trueComponent : falseComponent}
    </React.Fragment>
  );
};
