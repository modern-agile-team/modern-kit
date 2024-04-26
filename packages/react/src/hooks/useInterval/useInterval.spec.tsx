import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import { useInterval } from '.';
import { useState } from 'react';

const delayTime = 1000;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const TestComponent = () => {
  const [number, setNumber] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useInterval(
    () => {
      act(() => setNumber(number + 1));
    },
    isPlaying ? delayTime : undefined
  );

  return (
    <div>
      <div>{number}</div>
      <button onClick={() => setIsPlaying(false)}>button</button>
    </div>
  );
};

describe('useInterval', () => {
  it('mockFn is called every time the specified delay passes', () => {
    const mockFn = vi.fn();

    renderHook(() => useInterval(mockFn, delayTime));

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime / 2);
    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('delay is undefined, interval is disabled', () => {
    render(<TestComponent />);
    const button = screen.getByRole('button');

    expect(screen.getByText('0')).toBeInTheDocument();

    vi.advanceTimersByTime(delayTime);
    expect(screen.getByText('1')).toBeInTheDocument();

    vi.advanceTimersByTime(delayTime);
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(button);

    vi.advanceTimersByTime(delayTime);
    expect(screen.getByText('2')).toBeInTheDocument();

    vi.advanceTimersByTime(delayTime);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
