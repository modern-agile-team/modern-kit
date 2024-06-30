import { UseStepProps, useStep } from '../useStep';
import { Dispatch, SetStateAction, useState } from 'react';

interface UseStepWithInitialState<T> extends UseStepProps {
  initialState: T;
}

type UseStepStateProps<T> = UseStepWithInitialState<T> | UseStepProps;

export function useStepState<T>({
  initialState,
  ...useStepProps
}: UseStepWithInitialState<T>): ReturnType<typeof useStep> & {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
};

export function useStepState<T>(useStepProps: UseStepStateProps<T>): ReturnType<
  typeof useStep
> & {
  state: T | null;
  setState: Dispatch<SetStateAction<T | null>>;
};

export function useStepState<T>(props: UseStepStateProps<T>) {
  const initialState = 'initialState' in props ? props.initialState : null;
  const [state, setState] = useState<T | null>(initialState);

  return { state, setState, ...useStep(props) };
}
