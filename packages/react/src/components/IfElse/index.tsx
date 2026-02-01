import React from 'react';

type Condition = boolean | (() => boolean);

interface IfElseProps {
  condition: Condition;
  truthyComponent: React.ReactNode;
  falsyComponent: React.ReactNode;
}

const getConditionResult = (condition: Condition) => {
  return typeof condition === 'function' ? condition() : condition;
};

/**
 * @description If-Else 조건부 렌더링을 사용하기 위한 컴포넌트입니다.
 *
 * @param {IfElseProps} props
 * @param {Condition} props.condition - 렌더링 조건 (boolean 또는 boolean을 반환하는 함수)
 * @param {React.ReactNode} props.truthyComponent - condition이 true일 때 렌더링될 컴포넌트
 * @param {React.ReactNode} props.falsyComponent - condition이 false일 때 렌더링될 컴포넌트
 * @returns {React.JSX.Element} 조건에 따라 trueComponent 또는 falseComponent를 렌더링
 *
 * @example
 * <IfElse
 *   condition={condition}
 *   truthyComponent={<TruthyComponent />}
 *   falsyComponent={<FalsyComponent />}
 * />
 */
export const IfElse = ({
  condition,
  truthyComponent,
  falsyComponent,
}: IfElseProps): React.JSX.Element => {
  const conditionResult = getConditionResult(condition);
  return <>{conditionResult ? truthyComponent : falsyComponent}</>;
};
