import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { When } from '.';

describe('When Component', () => {
  it('should render the child element when the condition prop is true', () => {
    render(
      <When condition={true}>
        <p role="paragraph">render</p>
      </When>
    );

    const header = screen.queryByRole('paragraph');

    expect(header).toBeInTheDocument();
  });

  it('should not render the child element when the condition prop is false', () => {
    render(
      <When condition={false}>
        <p role="paragraph">render</p>
      </When>
    );

    const header = screen.queryByRole('paragraph');

    expect(header).not.toBeInTheDocument();
  });

  it('should render the child element when the condition prop function returns true', () => {
    render(
      <When condition={() => true}>
        <p role="paragraph">render</p>
      </When>
    );

    const header = screen.queryByRole('paragraph');

    expect(header).toBeInTheDocument();
  });

  it('should not render the child element when the condition prop function returns false', () => {
    render(
      <When condition={() => false}>
        <p role="paragraph">render</p>
      </When>
    );

    const header = screen.queryByRole('paragraph');

    expect(header).not.toBeInTheDocument();
  });

  it('should render fallback when condition is false and has fallback props', () => {
    render(
      <When condition={false} fallback={<p role="paragraph">false</p>}>
        <button>true</button>
      </When>
    );

    const button = screen.queryByRole('button');

    const fallbackParagraph = screen.queryByRole('paragraph');

    expect(button).not.toBeInTheDocument();
    expect(fallbackParagraph).toBeInTheDocument();
  });
});
