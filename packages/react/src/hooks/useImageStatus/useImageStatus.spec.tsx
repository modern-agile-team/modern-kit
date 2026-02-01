import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useImageStatus } from '.';

describe('useImageStatus', () => {
  it('초기 상태는 "pending"이어야 합니다', () => {
    const { result } = renderHook(() => useImageStatus());
    expect(result.current.imageStatus).toBe('pending');
  });

  it('이미지 로딩이 시작되면 상태가 "loading"으로 변경되어야 합니다', async () => {
    const { result } = renderHook(() => useImageStatus());
    const img = document.createElement('img');
    img.setAttribute('src', 'imgUrl');

    result.current.ref(img);
    await waitFor(() => expect(result.current.imageStatus).toBe('loading'));
  });

  it('이미지 로딩이 성공하면 상태가 "complete"로 변경되어야 합니다', async () => {
    const { result } = renderHook(() => useImageStatus());
    const loadEvent = new Event('load');

    const img = document.createElement('img');
    img.setAttribute('src', 'imgUrl');

    result.current.ref(img);
    img.dispatchEvent(loadEvent);
    await waitFor(() => expect(result.current.imageStatus).toBe('complete'));
  });

  it('이미지 로딩이 실패하면 상태가 "error"로 변경되어야 합니다', async () => {
    const { result } = renderHook(() => useImageStatus());
    const errorEvent = new Event('error');

    const img = document.createElement('img');
    img.setAttribute('src', 'imgUrl');

    result.current.ref(img);
    img.dispatchEvent(errorEvent);
    await waitFor(() => expect(result.current.imageStatus).toBe('error'));
  });

  it('ref에 null 값이 전달되면 상태가 변경되지 않아야 합니다', async () => {
    const { result } = renderHook(() => useImageStatus());

    result.current.ref(null as any);
    await waitFor(() => expect(result.current.imageStatus).toBe('pending'));
  });
});
