import { describe, it, expect, vi } from 'vitest';
import { waitFor, screen } from '@testing-library/react';
import { renderSetup } from '../../utils/test/renderSetup';
import { OutsideClick } from './index';

describe('OutsideClick', () => {
  it('should call the callback when an event occurs outside the component', async () => {
    const callbackMockFn = vi.fn();

    const { user } = renderSetup(
      <>
        <OutsideClick callback={callbackMockFn}>
          <div role="inside-element">inside</div>
        </OutsideClick>

        <div role="outside-element">outside</div>
      </>
    );

    await user.click(screen.getByRole('inside-element'));
    expect(callbackMockFn).not.toHaveBeenCalled();

    await user.click(screen.getByRole('outside-element'));

    await waitFor(() => {
      expect(callbackMockFn).toHaveBeenCalledTimes(1);
    });

    await user.click(document.body);

    await waitFor(() => {
      expect(callbackMockFn).toHaveBeenCalledTimes(2);
    });
  });

  it('should not call the callback when an event occurs inside the component', async () => {
    const callbackMockFn = vi.fn();

    const { user } = renderSetup(
      <OutsideClick callback={callbackMockFn}>
        <div role="inside-element">inside</div>
      </OutsideClick>
    );

    await user.click(screen.getByRole('inside-element'));
    expect(callbackMockFn).not.toHaveBeenCalled();
  });
});
