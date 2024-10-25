import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { FallbackLazyImage } from '.';
import {
  mockIntersecting,
  mockIntersectionObserverCleanup,
  mockIntersectionObserverSetup,
} from '../../utils/test/mockIntersectionObserver';
import { renderSetup } from '../../utils/test/renderSetup';
import { Mock } from 'vitest';

beforeEach(() => {
  mockIntersectionObserverSetup();
});

afterEach(() => {
  mockIntersectionObserverCleanup();
});

const TestComponent = ({ mockFn }: { mockFn?: Mock }) => {
  return (
    <FallbackLazyImage
      className="img1"
      fallback={<div>Fallback</div>}
      src="img1"
      width={400}
      height={400}
      alt="img1"
      onLoad={mockFn}
    />
  );
};

describe('FallbackLazyImage', () => {
  const onLoadMockFn = vi.fn();

  it('should not load the image before it is exposed to the viewport and render the fallback', () => {
    renderSetup(<TestComponent />);

    const img1 = screen.getByAltText('img1');
    const fallback = screen.queryByText('Fallback');

    expect(fallback).toBeInTheDocument();
    expect(img1).not.toHaveAttribute('src', 'img1');

    // style
    expect(img1).toHaveStyle('width: 400');
    expect(img1).toHaveStyle('height: 400');
    expect(img1).toHaveStyle('transition: opacity 0.2s');
  });

  it('should load the image when it is exposed in the viewport and remove the fallback', async () => {
    renderSetup(<TestComponent mockFn={onLoadMockFn} />);

    const img1 = screen.getByAltText('img1');

    expect(screen.queryByText('Fallback')).toBeInTheDocument();

    await waitFor(() => {
      mockIntersecting({
        type: 'view',
        element: img1,
      });
    });

    expect(img1).toHaveAttribute('src', 'img1');

    await waitFor(() => {
      img1.dispatchEvent(new Event('load'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Fallback')).not.toBeInTheDocument();
      expect(onLoadMockFn).toBeCalled();
    });
  });
});
