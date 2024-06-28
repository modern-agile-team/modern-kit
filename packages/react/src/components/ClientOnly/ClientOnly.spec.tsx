import { screen } from '@testing-library/react';

import { renderSetup } from '../../utils/test/renderSetup';
import { renderToString } from 'react-dom/server';

import { ClientOnly } from '.';

const TestComponent = () => {
  return (
    <ClientOnly fallback={<div>fallback component</div>}>
      <div>children component</div>
    </ClientOnly>
  );
};

describe('ClientOnly', () => {
  it('should render a fallback component before mount', () => {
    const html = renderToString(<TestComponent />);

    expect(html).toContain('fallback component');
    expect(html).not.toContain('children component');
  });

  it('should render a children component after mount', () => {
    renderSetup(<TestComponent />);

    expect(screen.queryByText('fallback component')).not.toBeInTheDocument();
    expect(screen.getByText('children component')).toBeInTheDocument();
  });
});
