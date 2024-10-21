import { describe, it, expect, vi } from 'vitest';
import { renderSetup } from '../../utils/test/renderSetup';
import { useKeyDown } from '.';
import { screen } from '@testing-library/react';

const WindowComponent = (props: Parameters<typeof useKeyDown>[0]) => {
  useKeyDown<HTMLButtonElement>(props);

  return <></>;
};

const TargetTestComponent = (props: Parameters<typeof useKeyDown>[0]) => {
  const targetRef = useKeyDown<HTMLButtonElement>(props);

  return <button ref={targetRef}>버튼</button>;
};

describe('useKeyDown', () => {
  const allKeyMockFn = vi.fn();
  const enterMockFn = vi.fn();
  const shiftMockFn = vi.fn();

  describe('window', () => {
    it('should trigger the event provided to keyDownCallbackMap when a keyboard event occurs', async () => {
      const { user } = renderSetup(
        <WindowComponent
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

    it('should execute the callback function for all key', async () => {
      const { user } = renderSetup(
        <WindowComponent allKeyDownCallback={allKeyMockFn} />
      );

      await user.keyboard('{Enter}{Shift}');

      expect(allKeyMockFn).toBeCalledTimes(2);
    });

    it('should bind the event if enabled is true', async () => {
      // enabled false setting
      const { user, rerender } = renderSetup(
        <WindowComponent
          enabled={false}
          keyDownCallbackMap={{ Enter: enterMockFn }}
        />
      );

      await user.keyboard('{Enter}');

      expect(enterMockFn).not.toBeCalled();

      // enabled true setting
      rerender(
        <WindowComponent
          enabled={true}
          keyDownCallbackMap={{ Enter: enterMockFn }}
        />
      );

      await user.keyboard('{Enter}');

      expect(enterMockFn).toBeCalled();
    });

    it('should not execute if a function is not assigned to the key', async () => {
      const { user } = renderSetup(<WindowComponent />);

      await user.keyboard('{Enter}');

      expect(enterMockFn).not.toBeCalled();
    });
  });

  describe('target element', () => {
    it('should trigger the event provided to keyDownCallbackMap when a keyboard event occurs', async () => {
      const { user } = renderSetup(
        <TargetTestComponent
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
        <TargetTestComponent allKeyDownCallback={allKeyMockFn} />
      );

      const button = screen.getByRole('button');

      button.focus();

      await user.keyboard('{Enter}{Shift}');

      expect(allKeyMockFn).toBeCalledTimes(2);
    });

    it('should bind the event if enabled is true', async () => {
      // enabled false setting
      const { user, rerender } = renderSetup(
        <TargetTestComponent
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
        <TargetTestComponent
          enabled={true}
          keyDownCallbackMap={{ Enter: enterMockFn }}
        />
      );

      button.focus();

      await user.keyboard('{Enter}');

      expect(enterMockFn).toBeCalled();
    });

    it('should not execute if a function is not assigned to the key', async () => {
      const { user } = renderSetup(<TargetTestComponent />);

      const button = screen.getByRole('button');

      button.focus();

      await user.keyboard('{Enter}');

      expect(enterMockFn).not.toBeCalled();
    });
  });
});
