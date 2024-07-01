import {
  isFunction,
  removeStorageItem,
  setStorageItem,
} from '@modern-kit/utils';
import { UseStepProps, useStep } from '../useStep';
import { SetStateAction, useCallback, useState } from 'react';
import { usePreservedState } from '../usePreservedState';

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
  readonly state: T;
  readonly setState: (newState: SetStateAction<T>) => void;
  readonly clearState: () => void;
};

export function useStepState<T>(props: UseStepWithoutInitialState): ReturnType<
  typeof useStep
> & {
  readonly state: T | null;
  readonly setState: (newState: SetStateAction<T | null>) => void;
  readonly clearState: () => void;
};

export function useStepState<T>(props: UseStepStateProps<T>) {
  const initialState = 'initialState' in props ? props.initialState : null;
  const preservedStorageOptions = usePreservedState(props.storageOptions);
  const preservedInitialState = usePreservedState(initialState);

  const [_state, _setState] = useState<T | null>(preservedInitialState);

  const setState = useCallback(
    (newState: SetStateAction<T | null>) => {
      _setState((prev) => {
        const newStateToUse = isFunction(newState) ? newState(prev) : newState;

        if (preservedStorageOptions) {
          const { type, key } = preservedStorageOptions;
          setStorageItem(type, key, newStateToUse);
        }
        return newStateToUse;
      });
    },
    [preservedStorageOptions]
  );

  const clearState = useCallback(() => {
    if (preservedStorageOptions) {
      const { type, key } = preservedStorageOptions;
      removeStorageItem(type, key);
    }
    _setState(null);
  }, [preservedStorageOptions]);

  return { state: _state, setState, clearState, ...useStep(props) } as const;
}
