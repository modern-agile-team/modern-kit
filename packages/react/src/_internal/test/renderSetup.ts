import userEvent, { Options } from '@testing-library/user-event';
import { render } from '@testing-library/react';

export const renderSetup = (jsx: JSX.Element, options: Options = {}) => {
  return {
    user: userEvent.setup(options),
    ...render(jsx),
  };
};
