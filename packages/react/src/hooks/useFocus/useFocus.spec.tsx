import { describe, it, expect, Mock, vi } from 'vitest';
import { useFocus } from '.';
import { renderSetup } from '../../utils/test/renderSetup';
import { act, screen } from '@testing-library/react';

const TestComponent = ({
  focusMockFn,
  blurMockFn,
  connectedRef,
}: {
  focusMockFn?: Mock<any, any>;
  blurMockFn?: Mock<any, any>;
  connectedRef?: boolean;
}) => {
  const { ref, isFocus, setFocus } = useFocus<HTMLInputElement>({
    focusAction: focusMockFn,
    blurAction: blurMockFn,
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
  it('should trigger callback at target focus and blur', async () => {
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

    await act(async () => {
      await user.click(targetTrigger);
    });
    expect(focusTarget).toHaveFocus();
    expect(targetStatus.textContent).toBe('Focus');
    expect(focusMockFn).toBeCalled();

    await act(async () => {
      await user.click(targetStatus);
    });
    expect(focusTarget).not.toHaveFocus();
    expect(targetStatus.textContent).toBe('Blur');
    expect(blurMockFn).toBeCalled();
  });

  it('should not throw error when ref is not connected', async () => {
    const focusMockFn = vi.fn();
    const blurMockFn = vi.fn();

    const { user } = renderSetup(
      <TestComponent focusMockFn={focusMockFn} blurMockFn={blurMockFn} />
    );

    const focusTarget = screen.getByRole('focus-target');
    const targetTrigger = screen.getByRole('target-trigger');
    const targetStatus = screen.getByRole('target-status');

    await act(async () => {
      await user.click(targetTrigger);
    });
    expect(focusTarget).not.toHaveFocus();
    expect(targetStatus.textContent).toBe('Blur');
    expect(focusMockFn).not.toBeCalled();

    await act(async () => {
      await user.click(targetStatus);
    });
    expect(focusTarget).not.toHaveFocus();
    expect(targetStatus.textContent).toBe('Blur');
    expect(blurMockFn).not.toBeCalled();
  });

  it('should not throw error when focusAction and blurAction is not provided', async () => {
    const { user } = renderSetup(<TestComponent connectedRef />);

    const focusTarget = screen.getByRole('focus-target');
    const targetTrigger = screen.getByRole('target-trigger');
    const targetStatus = screen.getByRole('target-status');

    await act(async () => {
      await user.click(targetTrigger);
    });
    expect(focusTarget).toHaveFocus();
    expect(targetStatus.textContent).toBe('Focus');

    await act(async () => {
      await user.click(targetStatus);
    });
    expect(focusTarget).not.toHaveFocus();
    expect(targetStatus.textContent).toBe('Blur');
  });
});
