import React from 'react';

type Condition = boolean | (() => boolean);

interface WhenProps {
  children: React.ReactNode;
  condition: Condition;
  fallback?: React.ReactNode;
}

const getConditionResult = (condition: Condition) => {
  return typeof condition === 'function' ? condition() : condition;
};

/**
 * @description condition prop이 true일 때 children을 렌더링하고, false일 때는 fallback을 렌더링하는 조건부 렌더링 컴포넌트입니다.
 *
 * @param {WhenProps} props
 * @param {React.ReactNode} props.children - 조건이 참일 때 렌더링될 자식 요소
 * @param {Condition} props.condition - 렌더링 여부를 결정하는 조건. boolean 값이나 boolean을 반환하는 함수
 * @param {React.ReactNode} props.fallback - 조건이 거짓일 때 렌더링될 대체 요소 (선택사항)
 * @returns {JSX.Element} 조건에 따라 children 또는 fallback을 렌더링
 *
 * @example
 * ```tsx
 * <When condition={true}>
 *   <UserProfile />
 * </When>
 *
 * <When condition={false} fallback={<div>fallback component</div>}>
 *   <MainContent />
 * </When>
 * ```
 */
export const When = ({
  children,
  condition,
  fallback,
}: WhenProps): JSX.Element => {
  const conditionResult = getConditionResult(condition);

  if (!conditionResult) return <>{fallback}</>;
  return <>{children}</>;
};
