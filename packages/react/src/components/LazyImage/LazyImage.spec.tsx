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
  return <LazyImage className="img1" src="img1" alt="img1" />;
};

describe('LazyImage', () => {
  it('이미지가 viewport에 노출되기 전에는 이미지가 로드되지 않아야 합니다.', () => {
    renderSetup(<TestComponent />);

    const img1 = screen.getByAltText('img1');

    expect(img1).not.toHaveAttribute('src', 'img1');
    expect(img1).toHaveAttribute('class', 'img1');
  });

  it('이미지가 viewport에 노출되면 이미지가 로드되어야 합니다.', async () => {
    renderSetup(<TestComponent />);

    const img1 = screen.getByAltText('img1');

    await waitFor(() => {
      mockIntersecting({
        type: 'view',
        element: img1,
      });
    });

    expect(img1).toHaveAttribute('src', 'img1');
  });
});
