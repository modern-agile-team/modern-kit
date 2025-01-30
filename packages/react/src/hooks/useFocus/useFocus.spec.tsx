import { describe, it, expect, Mock, vi } from 'vitest';
import { useFocus } from '.';
import { renderSetup } from '../../_internal/test/renderSetup';
import { screen } from '@testing-library/react';

const TestComponent = ({
  focusMockFn,
  blurMockFn,
  connectedRef,
}: {
  focusMockFn?: Mock<any>;
  blurMockFn?: Mock<any>;
  connectedRef?: boolean;
}) => {
  const { ref, isFocus, setFocus } = useFocus<HTMLInputElement>({
    onFocus: focusMockFn,
    onBlur: blurMockFn,
  });

  return (
    <div>
      <input ref={connectedRef ? ref : undefined} role="focus-target" />
      <button role="target-trigger" onClick={() => setFocus()} />
      <div role="target-status">{isFocus ? 'Focus' : 'Blur'}</div>
    </div>
  );
};

describe('useFocus', () => {
  it('타겟 요소에 focus와 blur 이벤트가 발생하면 콜백이 트리거되어야 합니다', async () => {
    const focusMockFn = vi.fn();
    const blurMockFn = vi.fn();

    const { user } = renderSetup(
      <TestComponent
        focusMockFn={focusMockFn}
        blurMockFn={blurMockFn}
        connectedRef
      />
    );

    const focusTarget = screen.getByRole('focus-target');
    const targetTrigger = screen.getByRole('target-trigger');
    const targetStatus = screen.getByRole('target-status');

    await user.click(targetTrigger);

    expect(focusTarget).toHaveFocus();
    expect(targetStatus.textContent).toBe('Focus');
    expect(focusMockFn).toBeCalled();

    await user.click(targetStatus);

    expect(focusTarget).not.toHaveFocus();
    expect(targetStatus.textContent).toBe('Blur');
    expect(blurMockFn).toBeCalled();
  });

  it('ref가 할당되지 않았을 때 어떤 동작도 수행하지 않아야 합니다', async () => {
    const focusMockFn = vi.fn();
    const blurMockFn = vi.fn();

    const { user } = renderSetup(
      <TestComponent focusMockFn={focusMockFn} blurMockFn={blurMockFn} />
    );

    const focusTarget = screen.getByRole('focus-target');
    const targetTrigger = screen.getByRole('target-trigger');
    const targetStatus = screen.getByRole('target-status');

    await user.click(targetTrigger);

    expect(focusTarget).not.toHaveFocus();
    expect(targetStatus.textContent).toBe('Blur');
    expect(focusMockFn).not.toBeCalled();

    await user.click(targetStatus);

    expect(focusTarget).not.toHaveFocus();
    expect(targetStatus.textContent).toBe('Blur');
    expect(blurMockFn).not.toBeCalled();
  });

  it('onFocus와 onBlur가 할당되지 않았을 때 어떤 동작도 수행하지 않아야 합니다', async () => {
    const { user } = renderSetup(<TestComponent connectedRef />);

    const focusTarget = screen.getByRole('focus-target');
    const targetTrigger = screen.getByRole('target-trigger');
    const targetStatus = screen.getByRole('target-status');

    await user.click(targetTrigger);

    expect(focusTarget).toHaveFocus();
    expect(targetStatus.textContent).toBe('Focus');

    await user.click(targetStatus);

    expect(focusTarget).not.toHaveFocus();
    expect(targetStatus.textContent).toBe('Blur');
  });
});
