import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { LazyImage } from '.';
import {
  mockIntersecting,
  mockIntersectionObserverCleanup,
  mockIntersectionObserverSetup,
} from '../../_internal/test/mockIntersectionObserver';
import { renderSetup } from '../../_internal/test/renderSetup';

beforeEach(() => {
  mockIntersectionObserverSetup();
});

afterEach(() => {
  mockIntersectionObserverCleanup();
});

const TestComponent = () => {
  return (
    <div>
      <LazyImage className="img1" src="img1" alt="img1" />
      <LazyImage className="img2" src="img2" alt="img2" />
    </div>
  );
};

describe('LazyImage', () => {
  it('이미지가 viewport에 노출되기 전에는 이미지가 로드되지 않아야 합니다.', () => {
    renderSetup(<TestComponent />);

    const img1 = screen.getByAltText('img1');
    const img2 = screen.getByAltText('img2');

    expect(img1).not.toHaveAttribute('src', 'img1');
    expect(img2).not.toHaveAttribute('src', 'img2');
    expect(img1).toHaveAttribute('class', 'img1');
    expect(img2).toHaveAttribute('class', 'img2');
  });

  it('이미지가 viewport에 노출되면 이미지가 로드되어야 합니다.', async () => {
    renderSetup(<TestComponent />);

    const img1 = screen.getByAltText('img1');
    const img2 = screen.getByAltText('img2');

    await waitFor(() => {
      mockIntersecting({
        type: 'view',
        element: img1,
      });
    });

    expect(img1).toHaveAttribute('src', 'img1');
    expect(img2).not.toHaveAttribute('src', 'img2');

    await waitFor(() => {
      mockIntersecting({
        type: 'view',
        element: img2,
      });
    });

    expect(img1).toHaveAttribute('src', 'img1');
    expect(img2).toHaveAttribute('src', 'img2');
  });
});
