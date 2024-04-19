import { render, screen } from '@testing-library/react';
import { When } from '.';

describe('When Component', () => {
  it('should render the child element when the condition prop is true', () => {
    render(
      <When condition={true}>
        <h1>render</h1>
      </When>
    );

    const header = screen.queryByRole('heading');

    expect(header).toBeInTheDocument();
  });

  it('should not render the child element when the condition prop is false', () => {
    render(
      <When condition={false}>
        <h1>render</h1>
      </When>
    );

    const header = screen.queryByRole('heading');

    expect(header).not.toBeInTheDocument();
  });

  it('should render the child element when the condition prop function returns true', () => {
    render(
      <When condition={() => true}>
        <h1>render</h1>
      </When>
    );

    const header = screen.queryByRole('heading');

    expect(header).toBeInTheDocument();
  });

  it('should not render the child element when the condition prop function returns false', () => {
    render(
      <When condition={() => false}>
        <h1>render</h1>
      </When>
    );

    const header = screen.queryByRole('heading');

    expect(header).not.toBeInTheDocument();
  });
});
