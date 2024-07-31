import { describe, it, expect, vi } from 'vitest';
import { renderSetup } from '../../utils/test/renderSetup';
import { useKeyDown } from '.';
import { screen } from '@testing-library/react';

const TestComponent = (props: Parameters<typeof useKeyDown>[0]) => {
  const { ref } = useKeyDown<HTMLButtonElement>(props);

  return <button ref={ref}>버튼</button>;
};

describe('useKeyDown', () => {
  const allKeyMockFn = vi.fn();
  const enterMockFn = vi.fn();
  const shiftMockFn = vi.fn();

  it('should trigger the event provided to keyDownCallbackMap when a keyboard event occurs', async () => {
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

  it('should execute the callback function for all key', async () => {
    const { user } = renderSetup(
      <TestComponent allKeyDownCallback={allKeyMockFn} />
    );

    const button = screen.getByRole('button');

    button.focus();

    await user.keyboard('{Enter}{Shift}');

    expect(allKeyMockFn).toBeCalledTimes(2);
  });

  it('should bind the event if enabled is true', async () => {
    // enabled false setting
    const { user, rerender } = renderSetup(
      <TestComponent
        enabled={false}
        keyDownCallbackMap={{ Enter: enterMockFn }}
      />
    );

    const button = screen.getByRole('button');

    button.focus();

    await user.keyboard('{Enter}');

    expect(enterMockFn).not.toBeCalled();

    // enabled true setting
    rerender(
      <TestComponent
        enabled={true}
        keyDownCallbackMap={{ Enter: enterMockFn }}
      />
    );

    button.focus();

    await user.keyboard('{Enter}');

    expect(enterMockFn).toBeCalled();
  });

  it('should automatically focus when autoFocus is true', async () => {
    renderSetup(<TestComponent autoFocus />);

    const button = screen.getByRole('button');
    expect(button).toHaveFocus();
  });

  it('should not execute if a function is not assigned to the key', async () => {
    const { user } = renderSetup(<TestComponent autoFocus />);

    const button = screen.getByRole('button');

    button.focus();

    await user.keyboard('{Enter}');

    expect(enterMockFn).not.toBeCalled();
  });

  it('should not execute if a function is not assigned to the key', async () => {
    const { user } = renderSetup(<TestComponent autoFocus />);

    const button = screen.getByRole('button');

    button.focus();

    await user.keyboard('{Enter}');

    expect(enterMockFn).not.toBeCalled();
  });

  it('should call console.error if an error occurs in the callback function', async () => {
    const consoleErrorMock = vi.spyOn(console, 'error');

    const { user } = renderSetup(
      <TestComponent
        autoFocus
        keyDownCallbackMap={{
          Enter: () => {
            throw new Error('error');
          },
        }}
      />
    );

    const button = screen.getByRole('button');

    button.focus();

    await user.keyboard('{Enter}');

    expect(consoleErrorMock).toBeCalled();
  });
});
