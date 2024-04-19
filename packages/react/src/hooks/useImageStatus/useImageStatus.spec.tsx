import { renderHook, waitFor } from '@testing-library/react';
import { useImageStatus } from '.';

describe('useImageStatus', () => {
  it('should initialize with "pending" status', () => {
    const { result } = renderHook(() => useImageStatus());
    expect(result.current.imageStatus).toBe('pending');
  });

  it('should change status to "loading" when an image starts loading', async () => {
    const { result } = renderHook(() => useImageStatus());
    const img = document.createElement('img');
    img.setAttribute('src', 'imgUrl');

    await waitFor(() => result.current.ref(img));

    expect(result.current.imageStatus).toBe('loading');
  });

  it('should change status to "complete" when an image loads successfully', async () => {
    const { result } = renderHook(() => useImageStatus());
    const img = document.createElement('img');
    img.setAttribute('src', 'imgUrl');

    await waitFor(() => result.current.ref(img));

    img.onload = () => {
      expect(result.current.imageStatus).toBe('complete');
    };
  });

  it('should change status to "error" when an image fails to load', async () => {
    const { result } = renderHook(() => useImageStatus());
    const img = document.createElement('img');
    img.setAttribute('src', 'imgUrl');

    await waitFor(() => result.current.ref(img));

    img.onerror = () => {
      expect(result.current.imageStatus).toBe('error');
    };
  });
});
