import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AspectRatio } from '.';

describe('AspectRatio component', () => {
  it('should render correctly with the given ratio', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    );

    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveStyle(
      'padding-top: calc(100% * (1 / 1.7777777777777777))'
    );
  });

  it('should throw an error if more than one child is passed', () => {
    const renderComponent = () => {
      render(
        <AspectRatio ratio={4 / 3}>
          <div>Child 1</div>
          <div>Child 2</div>
        </AspectRatio>
      );
    };

    expect(renderComponent).toThrow(
      'AspectRatio component expects exactly one child element.'
    );
  });
});
