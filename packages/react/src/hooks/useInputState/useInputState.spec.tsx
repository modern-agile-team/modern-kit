import { describe } from 'node:test';
import { useInputState } from '.';
import { expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderSetup } from '../../_internal/test/renderSetup';

const TestComponent = ({
  initial = '',
  validate,
}: {
  initial?: any;
  validate?: (value: string) => string | undefined | null;
}) => {
  const { value, error, onChange, reset, resetValue, resetError } =
    useInputState(initial, { validate });

  return (
    <>
      <h1 role="test-value">{value}</h1>
      <h1 role="test-error">{error}</h1>

      <input type="text" onChange={onChange} value={value} />

      <button onClick={reset}>reset</button>
      <button onClick={resetValue}>resetValue</button>
      <button onClick={resetError}>resetError</button>
    </>
  );
};

describe('useInputState', () => {
  it('단일 값일 때, 값이 변경됩니다.', async () => {
    const { user } = renderSetup(<TestComponent initial={''} />);

    const value = screen.getByRole('test-value');
    const input = screen.getByRole('textbox');

    await user.type(input, 'changed');

    expect(value).toHaveTextContent('changed');
  });

  it('validate 함수를 통해 에러 메시지를 반환할 수 있습니다.', async () => {
    const { user } = renderSetup(
      <TestComponent
        validate={(value) => (value.length > 10 ? 'error' : undefined)}
      />
    );

    const input = screen.getByRole('textbox');
    const error = screen.getByRole('test-error');

    await user.type(input, '123456789ab');

    expect(error).toHaveTextContent('error');
  });

  it('resetValue 버튼을 누르면 변경된 값이 초기값으로 재설정 됩니다.', async () => {
    const { user } = renderSetup(<TestComponent initial={'initial value'} />);

    const input = screen.getByRole('textbox');
    const value = screen.getByRole('test-value');

    await user.type(input, ' changed');

    expect(value).toHaveTextContent('initial value changed');

    await user.click(screen.getByRole('button', { name: 'resetValue' }));

    expect(value).toHaveTextContent('initial value');
  });

  it('resetError 버튼을 누르면 에러 메시지가 초기화 됩니다.', async () => {
    const { user } = renderSetup(
      <TestComponent
        initial={''}
        validate={(value) => (value.length > 10 ? 'error' : undefined)}
      />
    );

    const error = screen.getByRole('test-error');
    const input = screen.getByRole('textbox');

    await user.type(input, '123456789ab');

    expect(error).toHaveTextContent('error');

    await user.click(screen.getByRole('button', { name: 'resetError' }));

    expect(error).toHaveTextContent('');
  });

  it('reset 버튼을 누르면 값과 에러 메시지가 초기화 됩니다.', async () => {
    const { user } = renderSetup(
      <TestComponent
        initial={''}
        validate={(value) => (value.length > 10 ? 'error' : undefined)}
      />
    );

    const input = screen.getByRole('textbox');
    const value = screen.getByRole('test-value');
    const error = screen.getByRole('test-error');

    await user.type(input, '123456789ab');

    expect(value).toHaveTextContent('123456789a');
    expect(error).toHaveTextContent('error');

    await user.click(screen.getByRole('button', { name: 'reset' }));

    expect(value).toHaveTextContent('');
    expect(error).toHaveTextContent('');
  });
});
