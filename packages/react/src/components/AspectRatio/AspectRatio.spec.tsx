import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AspectRatio } from '.';

describe('AspectRatio', () => {
  it('자식 요소에 aspect-ratio 설정이 적용되어야 합니다.', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <p role="paragraph">Content</p>
      </AspectRatio>
    );

    const paragraph = screen.getByRole('paragraph');

    expect(paragraph).toHaveStyle('aspect-ratio: 1.7777777777777777');
  });
});
