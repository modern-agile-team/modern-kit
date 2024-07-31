import { useReducer } from 'react';

const updateReducer = (num: number) => (num + 1) % 10000000;

export function useForceUpdate() {
  const [, forceUpdate] = useReducer(updateReducer, 0);

  return forceUpdate;
}
