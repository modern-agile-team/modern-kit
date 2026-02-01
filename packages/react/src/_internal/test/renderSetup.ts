import userEvent, { Options } from '@testing-library/user-event';
import { render } from '@testing-library/react';
import React from 'react';

export const renderSetup = (jsx: React.JSX.Element, options: Options = {}) => {
  return {
    user: userEvent.setup(options),
    ...render(jsx),
  };
};
