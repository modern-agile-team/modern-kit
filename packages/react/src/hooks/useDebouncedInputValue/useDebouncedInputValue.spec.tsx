import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { useDebouncedInputValue } from '.';
import { renderSetup } from '../../utils/test/renderSetup';
import { delay } from '@modern-kit/utils';

const DELAY = 200;

const TestComponent = () => {
  const { value, debouncedValue, onChange, onReset } =
    useDebouncedInputValue(DELAY);
  return (
    <>
      <input type="text" onChange={onChange} />
      <button onClick={onReset}>reset</button>
      <p data-testId="default-value">{value}</p>
      <p data-testId="debounced-value">{debouncedValue}</p>
    </>
  );
};

describe('useDebouncedInputValue', () => {
  it('input이 변경되면 기본 값은 즉시 업데이트되고, 디바운스된 값은 지연 시간 후에 업데이트되야 합니다', async () => {
    const { user } = renderSetup(<TestComponent />);

    const input = screen.getByRole('textbox');
    const defaultValue = screen.getByTestId('default-value');
    const debouncedValue = screen.getByTestId('debounced-value');

    expect(defaultValue).toHaveTextContent('');
    expect(debouncedValue).toHaveTextContent('');

    await user.type(input, 'test');

    await delay(DELAY / 2);

    expect(defaultValue).toHaveTextContent('test');
    expect(debouncedValue).toHaveTextContent('');

    await delay(DELAY / 2);

    expect(defaultValue).toHaveTextContent('test');
    expect(debouncedValue).toHaveTextContent('test');
  });

  it('reset 함수가 호출되면 기본 값과 디바운스된 값이 모두 초기화되야합니다.', async () => {
    const { user } = renderSetup(<TestComponent />);

    const input = screen.getByRole('textbox');
    const resetButton = screen.getByRole('button');
    const defaultValue = screen.getByTestId('default-value');
    const debouncedValue = screen.getByTestId('debounced-value');

    expect(defaultValue).toHaveTextContent('');
    expect(debouncedValue).toHaveTextContent('');

    await user.type(input, 'test');
    await delay(DELAY);

    expect(defaultValue).toHaveTextContent('test');
    expect(debouncedValue).toHaveTextContent('test');

    await user.click(resetButton);
    await delay(DELAY);

    expect(defaultValue).toHaveTextContent('');
    expect(debouncedValue).toHaveTextContent('');
  });
});
