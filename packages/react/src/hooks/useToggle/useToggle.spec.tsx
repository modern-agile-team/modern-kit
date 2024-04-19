import { screen, waitFor } from '@testing-library/react';
import { useToggle } from '.';
import { renderSetup } from '../../utils/test/renderSetup';

const TestComponent = () => {
  const [bool, toggle] = useToggle(false);

  return (
    <div>
      <p role={'paragraph'}>{`${bool}`}</p>
      <button onClick={toggle}>button</button>
    </div>
  );
};

describe('useToggle', () => {
  it('When toggle is executed, the value of bool changes from true to false, or from false to true.', async () => {
    const { user } = renderSetup(<TestComponent />);

    const button = screen.getByRole('button');
    const paragraph = screen.getByRole('paragraph');

    expect(paragraph).toHaveTextContent('false');

    await waitFor(() => {
      user.click(button);
      expect(paragraph).toHaveTextContent('true');
    });

    await waitFor(() => {
      user.click(button);
      expect(paragraph).toHaveTextContent('false');
    });

    await waitFor(() => {
      user.click(button);
      expect(paragraph).toHaveTextContent('true');
    });
  });
});
