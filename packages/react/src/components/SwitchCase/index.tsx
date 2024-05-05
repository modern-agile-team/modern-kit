type Component = JSX.Element | null;

interface Props<Condition extends string | number> {
  condition: Condition | null | undefined;
  cases: Partial<Record<Condition, Component>>;
  defaultCase?: Component;
}

/**
 * @example
 * ```tsx
 * const [testValue, setTestValue] = useState(0);
 *
 * <SwitchCase
 * 	condition={testValue}
 * 	cases={{
 * 		0: <Comp1 />,
 * 		1: <Comp2 />,
 *  	2: <Comp3 />
 * 	}}
 * 	defaultCase={<Comp4 />}
 * />
 * ```
 *
 * @param props.condition - 비교 조건
 * @param props.cases - 조건에 부합하면 렌더링될 컴포넌트
 * @param props.defaultCase - 조건에 부합하는 값이 없으면 렌더링할 컴포넌트
 */
export const SwitchCase = <Condition extends string | number>({
  condition,
  cases,
  defaultCase = null,
}: Props<Condition>) => {
  if (condition === null || condition === undefined) {
    return defaultCase;
  }

  return cases[condition] ?? defaultCase;
};
