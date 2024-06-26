import React from 'react';

interface SwitchCaseProps<Condition extends string | number> {
  condition: Condition | null;
  cases: Partial<Record<Condition, JSX.Element | null>>;
  defaultCaseComponent?: JSX.Element | null;
}

export const SwitchCase = <Condition extends string | number>({
  condition,
  cases,
  defaultCaseComponent = null,
}: SwitchCaseProps<Condition>) => {
  if (condition == null) {
    return <React.Fragment>{defaultCaseComponent}</React.Fragment>;
  }

  return (
    <React.Fragment>{cases[condition] ?? defaultCaseComponent}</React.Fragment>
  );
};
