import { describe } from 'node:test';
import { useInputState } from '.';
import { expect, it } from 'vitest';
import { fireEvent, renderHook, screen, waitFor } from '@testing-library/react';
import { renderSetup } from '../../_internal/test/renderSetup';

const TestComponent = () => {
  const { value, onChange, reset } = useInputState('initial value');

  return (
    <>
      <h1 role="test-value">{value}</h1>
      <input data-testid="test-input" onChange={onChange} value={value} />
      <button onClick={reset}>reset</button>
    </>
  );
};

const TestComponent1 = () => {
  const { value, onChange, reset } = useInputState('initial value');

  return (
    <>
      <h1 role="test-value">{value}</h1>
      <input
        data-testid="test-input"
        name="test"
        onChange={onChange}
        value={value}
      />
      <button onClick={reset}>reset</button>
    </>
  );
};

const TestComponent2 = () => {
  const { value, onChange, reset } = useInputState({
    test: 'initial value',
  });

  return (
    <>
      <h1 role="test-value">{value.test}</h1>
      <input data-testid="test-input" name="test" onChange={onChange} />
      <button onClick={reset}>reset</button>
    </>
  );
};

describe('useInputState', () => {
  it('input에 name이 없을 때 값이 변경되지 않 습니다.', async () => {
    renderSetup(<TestComponent />);

    const value = screen.getByRole('test-value');
    const input = screen.getByTestId('test-input');

    await fireEvent.change(input, { target: { value: 'changed value' } });

    expect(value).toHaveTextContent('initial value');
  });

  it('초기값으로 string을 넣으면 string으로 초기화 됩니다.', () => {
    const { result } = renderHook(() => useInputState('initial value'));
    const { value } = result.current;

    expect(value).toEqual('initial value');
  });

  it('초기값으로 object를 넣으면 object로 초기화 됩니다.', () => {
    const { result } = renderHook(() =>
      useInputState({
        title: 'initial title',
        description: 'initial description',
      })
    );

    const { value } = result.current;

    expect(value).toEqual({
      title: 'initial title',
      description: 'initial description',
    });
  });

  it('onChange를 사용하면 value 값이 변경됩니다.', () => {
    renderSetup(<TestComponent1 />);

    const value = screen.getByRole('test-value');
    const input = screen.getByTestId('test-input');

    expect(value).toHaveTextContent('initial value');

    fireEvent.change(input, { target: { value: 'changed value' } });

    expect(value).toHaveTextContent('changed value');
  });

  it('초기값이 object인 uesInputState의 onChange를 사용하면 값이 변경됩니다.', async () => {
    renderSetup(<TestComponent2 />);

    const titleInput = screen.getByTestId('test-input');
    const value = screen.getByRole('test-value');

    await waitFor(() => {
      expect(value).toHaveTextContent('initial value');
    });

    await fireEvent.change(titleInput, { target: { value: 'changed value' } });

    await waitFor(() => {
      expect(value).toHaveTextContent('changed value');
    });
  });

  it('reset 버튼을 누르면 변경된 값이 초기값으로 재설정 됩니다.', async () => {
    const { user } = renderSetup(<TestComponent1 />);

    const input = screen.getByTestId('test-input');
    const testValue = screen.getByRole('test-value');

    await fireEvent.change(input, { target: { value: 'changed value' } });

    await waitFor(() => {
      expect(testValue).toHaveTextContent('changed value');
    });

    await user.click(screen.getByRole('button', { name: 'reset' }));

    await waitFor(() => {
      expect(testValue).toHaveTextContent('initial value');
    });
  });
});
