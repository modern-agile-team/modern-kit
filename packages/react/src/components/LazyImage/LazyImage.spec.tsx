import { screen, waitFor } from '@testing-library/react';
import { LazyImage } from '.';
import {
  mockIntersecting,
  mockIntersectionObserverCleanup,
  mockIntersectionObserverSetup,
} from '../../utils/test/mockIntersectionObserver';
import { renderSetup } from '../../utils/test/renderSetup';

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
  it('should not load the image before it is exposed to the viewport', () => {
    renderSetup(<TestComponent />);

    const img1 = screen.getByAltText('img1');
    const img2 = screen.getByAltText('img2');

    expect(img1).not.toHaveAttribute('src', 'img1');
    expect(img2).not.toHaveAttribute('src', 'img2');
    expect(img1).toHaveAttribute('class', 'lazy-image img1');
    expect(img2).toHaveAttribute('class', 'lazy-image img2');
  });

  it('should load the image when it is exposed to the viewport', async () => {
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
