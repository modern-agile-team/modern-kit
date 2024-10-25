import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';

import { renderSetup } from '../../utils/test/renderSetup';
import { renderToString } from 'react-dom/server';

import { Mounted } from '.';

const TestComponent = () => {
  return (
    <Mounted fallback={<div>fallback component</div>}>
      <div>children component</div>
    </Mounted>
  );
};

describe('Mounted', () => {
  it('마운트 전에는 fallback 컴포넌트가 나타난다.', () => {
    const html = renderToString(<TestComponent />);

    expect(html).toContain('fallback component');
    expect(html).not.toContain('children component');
  });

  it('마운트 후에는 children 컴포넌트가 나타난다.', () => {
    renderSetup(<TestComponent />);

    expect(screen.queryByText('fallback component')).not.toBeInTheDocument();
    expect(screen.getByText('children component')).toBeInTheDocument();
  });
});
