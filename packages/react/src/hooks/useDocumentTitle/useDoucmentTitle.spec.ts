import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDocumentTitle } from '.';

const ORIGIN_TITLE = 'origin title';
const FIRST_CHANGE_TITLE = 'first change title';
const SECOND_CHANGE_TITLE = 'second change title';

beforeEach(() => {
  document.title = ORIGIN_TITLE;
});

describe('useDocumentTitle', () => {
  it('문서 제목이 업데이트되어야 합니다', () => {
    const { rerender, unmount } = renderHook(
      ({ title }) => useDocumentTitle(title),
      {
        initialProps: { title: FIRST_CHANGE_TITLE },
      }
    );

    expect(document.title).toBe(FIRST_CHANGE_TITLE);

    rerender({ title: SECOND_CHANGE_TITLE });

    expect(document.title).toBe(SECOND_CHANGE_TITLE);

    unmount();

    expect(document.title).toBe(ORIGIN_TITLE);
  });

  it('preserveTitleOnUnmount가 false일 때 언마운트 시 원래 제목으로 되돌아가야 합니다', () => {
    const { unmount } = renderHook(() =>
      useDocumentTitle(FIRST_CHANGE_TITLE, { preserveTitleOnUnmount: false })
    );

    expect(document.title).toBe(FIRST_CHANGE_TITLE);

    unmount();

    expect(document.title).toBe(ORIGIN_TITLE);
  });

  it('preserveTitleOnUnmount가 true일 때 언마운트 시 변경된 제목을 유지해야 합니다', () => {
    const { unmount } = renderHook(() =>
      useDocumentTitle(FIRST_CHANGE_TITLE, { preserveTitleOnUnmount: true })
    );

    expect(document.title).toBe(FIRST_CHANGE_TITLE);

    unmount();

    expect(document.title).toBe(FIRST_CHANGE_TITLE);
  });
});
