import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AspectRatio } from '.';

describe('AspectRatio', () => {
  it('기본 적으로 div 요소로 감싸지며, 해당 요소에 aspect-ratio 속성이 적용되어야 합니다.', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <p role="paragraph">Content</p>
      </AspectRatio>
    );

    const parentElement = screen.getByRole('paragraph')
      .parentElement as HTMLElement;

    expect(parentElement).toHaveStyle('aspect-ratio: 1.7777777777777777');
  });

  it('as props를 통해 특정 요소로 렌더링할 수 있습니다.', () => {
    render(
      <AspectRatio as="ul" ratio={16 / 9}>
        <p role="paragraph">Content</p>
      </AspectRatio>
    );

    const parentElement = screen.getByRole('paragraph')
      .parentElement as HTMLElement;
    expect(parentElement.tagName).toBe('UL');

    expect(parentElement).toHaveStyle('aspect-ratio: 1.7777777777777777');
  });

  it('asChild props를 통해 자식 요소를 그대로 렌더링하고, 자식 요소에 aspect-ratio 속성을 적용할 수 있습니다.', () => {
    render(
      <AspectRatio asChild ratio={16 / 9}>
        <p role="paragraph">Content</p>
      </AspectRatio>
    );

    const paragraph = screen.getByRole('paragraph');
    expect(paragraph.tagName).toBe('P');
    expect(paragraph).toHaveStyle('aspect-ratio: 1.7777777777777777');
  });
});
