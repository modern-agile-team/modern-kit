import { describe, it, expect, vi } from 'vitest';
import { renderSetup } from '../../_internal/test/renderSetup';
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
    it('키보드 이벤트가 발생했을 때 keyDownCallbackMap에 제공된 이벤트가 트리거되어야 합니다', async () => {
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

    it('모든 키에 대한 콜백 함수가 실행되어야 합니다', async () => {
      const { user } = renderSetup(
        <WindowComponent allKeyDownCallback={allKeyMockFn} />
      );

      await user.keyboard('{Enter}{Shift}');

      expect(allKeyMockFn).toBeCalledTimes(2);
    });

    it('enabled가 true일 때 이벤트가 바인딩되어야 합니다', async () => {
      // enabled false 설정
      const { user, rerender } = renderSetup(
        <WindowComponent
          enabled={false}
          keyDownCallbackMap={{ Enter: enterMockFn }}
        />
      );

      await user.keyboard('{Enter}');

      expect(enterMockFn).not.toBeCalled();

      // enabled true 설정
      rerender(
        <WindowComponent
          enabled={true}
          keyDownCallbackMap={{ Enter: enterMockFn }}
        />
      );

      await user.keyboard('{Enter}');

      expect(enterMockFn).toBeCalled();
    });

    it('키에 함수가 할당되지 않은 경우 실행되지 않아야 합니다', async () => {
      const { user } = renderSetup(<WindowComponent />);

      await user.keyboard('{Enter}');

      expect(enterMockFn).not.toBeCalled();
    });
  });

  describe('대상 요소', () => {
    it('키보드 이벤트가 발생했을 때 keyDownCallbackMap에 제공된 이벤트가 트리거되어야 합니다', async () => {
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

    it('모든 키에 대한 콜백 함수가 실행되어야 합니다', async () => {
      const { user } = renderSetup(
        <TargetTestComponent allKeyDownCallback={allKeyMockFn} />
      );

      const button = screen.getByRole('button');

      button.focus();

      await user.keyboard('{Enter}{Shift}');

      expect(allKeyMockFn).toBeCalledTimes(2);
    });

    it('enabled가 true일 때 이벤트가 바인딩되어야 합니다', async () => {
      // enabled false 설정
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

      // enabled true 설정
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

    it('키에 함수가 할당되지 않은 경우 실행되지 않아야 합니다', async () => {
      const { user } = renderSetup(<TargetTestComponent />);

      const button = screen.getByRole('button');

      button.focus();

      await user.keyboard('{Enter}');

      expect(enterMockFn).not.toBeCalled();
    });
  });
});
