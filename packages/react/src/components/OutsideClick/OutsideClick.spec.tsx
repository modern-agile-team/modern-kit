import { waitFor, screen } from '@testing-library/react';
import { renderSetup } from '../../utils/test/renderSetup';
import { OutsideClick } from './index';

describe('OutsideClick', () => {
  it('should call the callback when an event occurs outside the component', async () => {
    const onEffect = vitest.fn();

    const { user } = renderSetup(
      <>
        <OutsideClick callback={onEffect}>
          <div role="inside-element">inside</div>
        </OutsideClick>

        <div role="outside-element">outside</div>
      </>
    );

    await user.click(screen.getByRole('inside'));
    expect(onEffect).not.toHaveBeenCalled();

    await user.click(screen.getByRole('outside'));

    await waitFor(() => {
      expect(onEffect).toHaveBeenCalledTimes(1);
    });

    await user.click(document.body);

    await waitFor(() => {
      expect(onEffect).toHaveBeenCalledTimes(2);
    });
  });

  it('should not call the callback when an event occurs inside the component', async () => {
    const onEffect = vitest.fn();

    const { user } = renderSetup(
      <OutsideClick callback={onEffect}>
        <div role="inside-element">inside</div>
      </OutsideClick>
    );

    await user.click(screen.getByRole('inside'));
    expect(onEffect).not.toHaveBeenCalled();
  });
});
