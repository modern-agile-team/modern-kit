import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderSetup } from '../../utils/test/renderSetup';
import { useDebouncedState } from '.';
import { delay } from '@modern-kit/utils';

const DELAY_TIME = 300;

const TestComponent = () => {
  const [debouncedState, setDebouncedState] = useDebouncedState('', DELAY_TIME);
  return (
    <>
      <input type="text" onChange={(e) => setDebouncedState(e.target.value)} />
      <p data-testId="debounced-state">{debouncedState}</p>
    </>
  );
};

describe('useDebouncedState', () => {
  it('should update debouncedState after the delay time when setDebouncedState is called.', async () => {
    const { user } = renderSetup(<TestComponent />);

    const input = screen.getByRole('textbox');
    const debouncedState = screen.getByTestId('debounced-state');

    await user.type(input, 'test');

    await delay(100);
    expect(debouncedState).toHaveTextContent('');

    await delay(200);
    expect(debouncedState).toHaveTextContent('test');
  });

  it('should only update debouncedState once even if setDebouncedState is called multiple times within the delay time.', async () => {
    const { user } = renderSetup(<TestComponent />);

    const input = screen.getByRole('textbox');
    const debouncedState = screen.getByTestId('debounced-state');

    await user.type(input, 'test');
    await user.type(input, '1234');
    await user.type(input, 'bgzt');

    await delay(100);
    expect(debouncedState).toHaveTextContent('');

    await delay(200);
    expect(debouncedState).toHaveTextContent('bgzt');
  });
});
