import { act, screen } from '@testing-library/react';
import { renderSetup } from '../../utils/test/renderSetup';
import { DebounceWrapper } from '.';
import { ChangeEvent, useState } from 'react';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

interface TestComponentProps {
  capture: string;
  wait: number;
}

interface ButtonTestComponentProps extends TestComponentProps {
  onClick: () => void;
}

const TestComponentWithButton = ({
  capture,
  onClick,
  wait,
}: ButtonTestComponentProps) => {
  return (
    <DebounceWrapper capture={capture} wait={wait}>
      <button onClick={onClick}>Button</button>
    </DebounceWrapper>
  );
};

const TestInput = ({ onChange }: { onChange: (value: string) => void }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    act(() => setValue(e.target.value));
    onChange(e.target.value);
  };

  return <input type="text" onChange={handleChange} value={value} />;
};

const TestComponentWithInput = ({ capture, wait }: TestComponentProps) => {
  const [text, setText] = useState('');

  const onChange = (value: string) => {
    act(() => setText(value));
  };

  return (
    <>
      <DebounceWrapper capture={capture} wait={wait}>
        <TestInput onChange={onChange} />
      </DebounceWrapper>
      <p role="paragraph">{text}</p>
    </>
  );
};

describe('DebounceWrapper Component', () => {
  it('should debounce click event from child element', async () => {
    const mockFn = vi.fn();
    // https://github.com/testing-library/user-event/issues/833
    const { user } = renderSetup(
      <TestComponentWithButton capture="onClick" onClick={mockFn} wait={500} />,
      { delay: null }
    );

    const button = screen.getByRole('button');
    user.click(button);

    await vi.advanceTimersByTimeAsync(300);
    expect(mockFn).not.toBeCalled();

    await vi.advanceTimersByTimeAsync(200);
    expect(mockFn).toBeCalledTimes(1);

    user.click(button);
    user.click(button);
    user.click(button);

    await vi.advanceTimersByTimeAsync(300);
    expect(mockFn).toBeCalledTimes(1);

    await vi.advanceTimersByTimeAsync(200);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('should debounce change event from child element', async () => {
    const { user } = renderSetup(
      <TestComponentWithInput capture="onChange" wait={500} />,
      { delay: null }
    );

    const input = screen.getByRole('textbox');
    const paragraph = screen.getByRole('paragraph');

    user.type(input, 'Debounce');

    await vi.advanceTimersByTimeAsync(300);
    expect(paragraph).toHaveTextContent('');
    expect(input).toHaveValue('Debounce');

    await vi.advanceTimersByTimeAsync(200);
    expect(paragraph).toHaveTextContent('Debounce');
    expect(input).toHaveValue('Debounce');

    user.type(input, ' Test');

    await vi.advanceTimersByTimeAsync(300);
    expect(paragraph).toHaveTextContent('Debounce');
    expect(input).toHaveValue('Debounce Test');

    await vi.advanceTimersByTimeAsync(200);
    expect(paragraph).toHaveTextContent('Debounce Test');
    expect(input).toHaveValue('Debounce Test');
  });
});
