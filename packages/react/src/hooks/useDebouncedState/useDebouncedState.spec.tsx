import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderSetup } from '../../_internal/test/renderSetup';
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
  it('setDebouncedState가 호출되면 지연 시간 이후에 debouncedState가 업데이트되어야 합니다', async () => {
    const { user } = renderSetup(<TestComponent />);

    const input = screen.getByRole('textbox');
    const debouncedState = screen.getByTestId('debounced-state');

    await user.type(input, 'test');

    await delay(100);
    expect(debouncedState).toHaveTextContent('');

    await delay(200);
    expect(debouncedState).toHaveTextContent('test');
  });

  it('지연 시간 내에 setDebouncedState가 여러 번 호출되어도 한 번만 업데이트되어야 합니다', async () => {
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
