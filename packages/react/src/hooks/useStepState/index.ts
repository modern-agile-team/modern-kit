import {
  isFunction,
  removeStorageItem,
  setStorageItem,
} from '@modern-kit/utils';
import { UseStepProps, useStep } from '../useStep';
import { SetStateAction, useCallback, useState } from 'react';

interface StorageOptions {
  key: string;
  type: 'localStorage' | 'sessionStorage';
}

interface UseStepWithInitialState<T> extends UseStepProps {
  initialState: T;
  storageOptions?: StorageOptions;
}

interface UseStepWithoutInitialState extends UseStepProps {
  storageOptions?: StorageOptions;
}

type UseStepStateProps<T> =
  | UseStepWithInitialState<T>
  | UseStepWithoutInitialState;

export function useStepState<T>({
  initialState,
  ...props
}: UseStepWithInitialState<T>): ReturnType<typeof useStep> & {
  state: T;
  setState: (newState: SetStateAction<T>) => void;
  clearState: () => void;
};

export function useStepState<T>(props: UseStepWithoutInitialState): ReturnType<
  typeof useStep
> & {
  state: T | null;
  setState: (newState: SetStateAction<T | null>) => void;
  clearState: () => void;
};

export function useStepState<T>(props: UseStepStateProps<T>) {
  const initialState = 'initialState' in props ? props.initialState : null;
  const { type, key } = props?.storageOptions ?? {};

  const [_state, _setState] = useState<T | null>(initialState);

  const setState = useCallback(
    (newState: SetStateAction<T | null>) => {
      _setState((prev) => {
        const newStateToUse = isFunction(newState) ? newState(prev) : newState;

        if (type && key) {
          setStorageItem(type, key, newStateToUse);
        }
        return newStateToUse;
      });
    },
    [type, key]
  );

  const clearState = useCallback(() => {
    if (type && key) {
      removeStorageItem(type, key);
    }
    _setState(null);
  }, [type, key]);

  return { state: _state, setState, clearState, ...useStep(props) };
}
