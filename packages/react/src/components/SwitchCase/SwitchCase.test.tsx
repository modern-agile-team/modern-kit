/*
 * Created on Thu Nov 16 2023
 *
 * Copyright (c) 2023 Your Company
 */

import { render } from '@testing-library/react';
import SwitchCase from '.';

describe('SwitchCase', () => {
  it('SwitchCase는 조건을 받을 수 있어야 한다.', () => {
    const { container } = render(
      <SwitchCase condition={0 as number} cases={{ 0: <div>1</div> }} />
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
