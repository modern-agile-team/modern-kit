import { describe } from 'node:test';
import { useInputState } from '.';
import { expect, it } from 'vitest';
import { renderHook, screen } from '@testing-library/react';
import { renderSetup } from '../../_internal/test/renderSetup';

const TestComponent = ({
  initial,
  isObject,
  isName,
}: {
  initial: any;
  isObject: boolean;
  isName: boolean;
}) => {
  const { value, onChange, reset } = useInputState(initial);

  return (
    <>
      <h1 role="test-value">{isObject ? value.test : value}</h1>
      {isName ? (
        <input
          type="text"
          name="test"
          onChange={onChange}
          value={isObject ? value.test : value}
        />
      ) : (
        <input
          type="text"
          onChange={onChange}
          value={isObject ? value.test : value}
        />
      )}
      <button onClick={reset}>reset</button>
    </>
  );
};

describe('useInputState', () => {
  it('value값이 단일 값일 때, name이 없어도 값이 변경됩니다.', async () => {
    const { user } = renderSetup(
      <TestComponent
        initial={'initial value'}
        isObject={false}
        isName={false}
      />
    );

    const value = screen.getByRole('test-value');
    const input = screen.getByRole('textbox');

    await user.type(input, ' changed');

    expect(value).toHaveTextContent('initial value changed');
  });

  it('value값이 단일 값이 아니라면 name이 없을 때 값이 변경되지 않습니다.', async () => {
    const { user } = renderSetup(
      <TestComponent
        initial={{ test: 'initial value' }}
        isObject={true}
        isName={false}
      />
    );

    const value = screen.getByRole('test-value');
    const input = screen.getByRole('textbox');

    await user.type(input, ' changed');

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

  it('단일 값에 onChange를 사용하면 value 값이 변경됩니다.', async () => {
    const { user } = renderSetup(
      <TestComponent
        initial={'initial value'}
        isObject={false}
        isName={false}
      />
    );

    const value = screen.getByRole('test-value');
    const input = screen.getByRole('textbox');

    expect(value).toHaveTextContent('initial value');

    await user.type(input, ' changed');

    expect(value).toHaveTextContent('initial value changed');
  });

  it('다중 값에 onChange를 사용하면 값이 변경됩니다.', async () => {
    const { user } = renderSetup(
      <TestComponent
        initial={{ test: 'initial value' }}
        isObject={true}
        isName={true}
      />
    );

    const input = screen.getByRole('textbox');
    const value = screen.getByRole('test-value');

    expect(value).toHaveTextContent('initial value');

    await user.type(input, ' changed');

    expect(value).toHaveTextContent('initial value changed');
  });

  it('reset 버튼을 누르면 변경된 값이 초기값으로 재설정 됩니다.', async () => {
    const { user } = renderSetup(
      <TestComponent
        initial={'initial value'}
        isObject={false}
        isName={false}
      />
    );

    const input = screen.getByRole('textbox');
    const value = screen.getByRole('test-value');

    await user.type(input, ' changed');

    expect(value).toHaveTextContent('initial value changed');

    await user.click(screen.getByRole('button', { name: 'reset' }));

    expect(value).toHaveTextContent('initial value');
  });
});
