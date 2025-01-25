import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { When } from '.';

describe('When', () => {
  it('condition prop이 true일 때 자식 요소를 렌더링해야 한다', () => {
    render(
      <When condition={true}>
        <p role="paragraph">render</p>
      </When>
    );

    const header = screen.queryByRole('paragraph');

    expect(header).toBeInTheDocument();
  });

  it('condition prop이 false일 때 자식 요소를 렌더링하지 않아야 한다', () => {
    render(
      <When condition={false}>
        <p role="paragraph">render</p>
      </When>
    );

    const header = screen.queryByRole('paragraph');

    expect(header).not.toBeInTheDocument();
  });

  it('condition prop 함수가 true를 반환할 때 자식 요소를 렌더링해야 한다', () => {
    render(
      <When condition={() => true}>
        <p role="paragraph">render</p>
      </When>
    );

    const header = screen.queryByRole('paragraph');

    expect(header).toBeInTheDocument();
  });

  it('condition prop 함수가 false를 반환할 때 자식 요소를 렌더링하지 않아야 한다', () => {
    render(
      <When condition={() => false}>
        <p role="paragraph">render</p>
      </When>
    );

    const header = screen.queryByRole('paragraph');

    expect(header).not.toBeInTheDocument();
  });

  it('condition이 false이고 fallback prop이 있을 때 fallback을 렌더링해야 한다', () => {
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
