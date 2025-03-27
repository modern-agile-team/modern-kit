import { describe } from 'node:test';
import { useInputState } from '.';
import { expect, it } from 'vitest';
import { fireEvent, renderHook, screen } from '@testing-library/react';
import { renderSetup } from '_internal/test/renderSetup';

const TestComponent1 = () => {
  const { value, onChange, reset } = useInputState('initial value');

  return (
    <>
      <h1 role="test-value">{value}</h1>
      <input role="test-input" name="test" onChange={onChange} />
      <button onClick={reset}>rest</button>
    </>
  );
};

const TestComponent2 = () => {
  const { value, onChange, reset } = useInputState({
    title: 'initial title',
    description: 'initial description',
  });

  return (
    <>
      <h1 role="title-value">{value.title}</h1>
      <input role="title-input" name="title" onChange={onChange} />
      <p role="description-value">{value.description}</p>
      <input role="description-input" name="description" onChange={onChange} />
      <button onClick={reset}>reset</button>
    </>
  );
};

describe('useInputState', () => {
  it('input에 name이 없을 때 오류가 발생합니다.', () => {
    const { result } = renderHook(() => useInputState('initial value'));

    const { onChange } = result.current;

    const input = document.createElement('input');

    expect(() => {
      fireEvent.change(input, { target: { value: 'changed value' } });
      onChange({ target: input } as React.ChangeEvent<HTMLInputElement>);
    }).toThrowError('The input element must have a "name" attribute.');
  });

  it('초기값으로 string을 넣으면 string으로 초기화 됩니다.', () => {
    renderSetup(<TestComponent1 />);

    const testTitle = screen.getByText('initial value');
    expect(testTitle).toBeInTheDocument();
  });

  it('초기값으로 object를 넣으면 object로 초기화 됩니다.', () => {
    renderSetup(<TestComponent2 />);

    const testTitle = screen.getByText('initial title');
    const testDescription = screen.getByText('initial description');
    expect(testTitle).toBeInTheDocument();
    expect(testDescription).toBeInTheDocument();
  });

  it('초기값이 string인 useInputState의 onChange를 사용하면 값이 변경됩니다.', () => {
    renderSetup(<TestComponent1 />);

    const input = screen.getByRole('test-input');
    const testValue = screen.getByRole('test-value');

    expect(testValue).toHaveTextContent('initial value');

    fireEvent.change(input, { target: { value: 'changed value' } });

    expect(testValue).toHaveTextContent('changed value');
  });

  it('초기값이 object인 uesInputState의 onChange를 사용하면 값이 변경됩니다.', () => {
    renderSetup(<TestComponent2 />);

    const titleInput = screen.getByRole('title-input');
    const descriptionInput = screen.getByRole('description-input');
    const titleValue = screen.getByRole('title-value');
    const descriptionValue = screen.getByRole('description-value');

    expect(titleValue).toHaveTextContent('initial title');
    expect(descriptionValue).toHaveTextContent('initial description');

    fireEvent.change(titleInput, { target: { value: 'changed title' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'changed description' },
    });

    expect(titleValue).toHaveTextContent('changed title');
    expect(descriptionValue).toHaveTextContent('changed description');
  });

  it('reset 버튼을 누르면 변경된 값이 초기값으로 재설정 됩니다.', () => {
    renderSetup(<TestComponent1 />);

    const input = screen.getByRole('test-input');
    const testValue = screen.getByRole('test-value');
    const resetButton = screen.getByText('rest');

    fireEvent.change(input, { target: { value: 'changed value' } });

    expect(testValue).toHaveTextContent('changed value');

    fireEvent.click(resetButton);

    expect(testValue).toHaveTextContent('initial value');
  });
});
