import { Nullable } from '@modern-kit/types';

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
    return defaultCaseComponent;
  }

  return cases[condition] ?? defaultCaseComponent;
};
