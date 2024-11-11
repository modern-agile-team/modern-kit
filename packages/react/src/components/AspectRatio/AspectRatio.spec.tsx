import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AspectRatio } from '.';

describe('AspectRatio component', () => {
  it('기본적으로 div 태그를 부모 요소로 두고 자식 요소를 렌더링하며, div 태그에 aspect-ratio 설정이 적용되어야 합니다.', () => {
    render(
      <AspectRatio ratio={16 / 9} role="wrapper">
        <p>Content</p>
      </AspectRatio>
    );

    const wrapper = screen.getByRole('wrapper');

    expect(wrapper).toHaveStyle(
      'padding-top: calc(100% * (1 / 1.7777777777777777))'
    );
    expect(wrapper.tagName).toBe('DIV');
  });

  it('asChild 속성이 true라면 aspect-ratio 설정이 자식 요소에 적용됩니다.', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9} asChild>
        <section role="wrapper">Content</section>
      </AspectRatio>
    );

    const divWrapper = container.querySelector('div');

    expect(divWrapper).not.toBeInTheDocument();

    const wrapper = screen.getByRole('wrapper');

    expect(wrapper).toHaveStyle(
      'padding-top: calc(100% * (1 / 1.7777777777777777))'
    );
    expect(wrapper.tagName).toBe('SECTION');
  });

  it('하나 이상의 하위 요소가 있을 때 오류를 발생시켜야 합니다.', () => {
    const renderComponent = () => {
      render(
        <AspectRatio ratio={4 / 3}>
          <div>Child 1</div>
          <div>Child 2</div>
        </AspectRatio>
      );
    };

    expect(renderComponent).toThrow();
  });
});
