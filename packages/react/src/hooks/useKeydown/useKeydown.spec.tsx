import { renderSetup } from '../../utils/test/renderSetup';
import { useKeyDown } from '.';
import { screen } from '@testing-library/react';

const TestComponent = (props: Parameters<typeof useKeyDown>[0]) => {
  const { ref } = useKeyDown<HTMLButtonElement>(props);

  return <button ref={ref}>버튼</button>;
};

describe('useKeyDown', () => {
  it('should trigger the event provided to keyDownCallbackMap when a keyboard event occurs', async () => {
    const enterMockFn = vi.fn();
    const shiftMockFn = vi.fn();

    const { user } = renderSetup(
      <TestComponent
        keyDownCallbackMap={{ Enter: enterMockFn, Shift: shiftMockFn }}
      />
    );

    const button = screen.getByRole('button');

    expect(enterMockFn).not.toBeCalled();

    button.focus();

    await user.keyboard('{Enter}');

    expect(enterMockFn).toBeCalledTimes(1);

    await user.keyboard('{Shift}');

    expect(shiftMockFn).toBeCalledTimes(1);

    await user.keyboard('{Enter}{Shift}');

    expect(enterMockFn).toBeCalledTimes(2);
    expect(shiftMockFn).toBeCalledTimes(2);
  });

  it('should automatically focus when autoFocus is true', async () => {
    const enterMockFn = vi.fn();
    const shiftMockFn = vi.fn();

    const { user } = renderSetup(
      <TestComponent
        autoFocus
        keyDownCallbackMap={{ Enter: enterMockFn, Shift: shiftMockFn }}
      />
    );

    await user.keyboard('{Enter}');

    expect(enterMockFn).toBeCalledTimes(1);

    await user.keyboard('{Shift}');

    expect(shiftMockFn).toBeCalledTimes(1);

    await user.keyboard('{Enter}{Shift}');

    expect(enterMockFn).toBeCalledTimes(2);
    expect(shiftMockFn).toBeCalledTimes(2);
  });
});
