import { isNil } from '@modern-kit/utils';
import React from 'react';

interface SwitchCaseProps<Case extends PropertyKey> {
  value: Case | null | undefined;
  caseBy: Record<Case, React.ReactNode>;
  defaultComponent?: React.ReactNode;
}

/**
 * @description value 값에 따라 다른 컴포넌트를 `Switch` 형태로 조건부 렌더링하는 컴포넌트입니다.
 *
 * @param {SwitchCaseProps<Case>} props - `SwitchCase` 컴포넌트의 속성
 * @param {Case | null | undefined} props.value - 렌더링할 케이스를 결정하는 값
 * @param {Record<Case, React.ReactNode>} props.caseBy - `value` 값에 대응하는 컴포넌트들을 담은 객체
 * @param {React.ReactNode} props.defaultComponent - `value`가 `null`이거나 `caseBy`에 해당하는 컴포넌트가 없을 때 렌더링할 기본 컴포넌트
 *
 * @returns {React.ReactNode} - 조건부로 렌더링된 컴포넌트
 *
 * @example
 * ```tsx
 * <SwitchCase
 *   value={status}
 *   caseBy={{ success: <SuccessView />, error: <ErrorView /> }}
 *   defaultComponent={<DefaultView />}
 * />
 * ```
 */
export const SwitchCase = <Case extends PropertyKey>({
  caseBy,
  value,
  defaultComponent = null,
}: SwitchCaseProps<Case>): React.ReactNode => {
  if (isNil(value)) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
};
