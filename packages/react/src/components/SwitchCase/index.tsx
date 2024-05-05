import { Nullable } from '@modern-kit/types';
import React from 'react';

type Component = Nullable<React.ReactNode>;

interface SwitchCaseProps<Condition extends string | number> {
  condition: Condition | null | undefined;
  cases: Partial<Record<Condition, Component>>;
  defaultCaseComponent?: Component;
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
