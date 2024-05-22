import { renderHook } from '@testing-library/react';
import { useDocumentTitle } from '.';

const ORIGIN_TITLE = 'origin title';
const FIRST_CHANGE_TITLE = 'first change title';
const SECOND_CHANGE_TITLE = 'second change title';

beforeEach(() => {
  document.title = ORIGIN_TITLE;
});

describe('useDocumentTitle', () => {
  it('should update the document title', () => {
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

  it('should revert to the original title on unmount if preserveTitleOnUnmount is false', () => {
    const { unmount } = renderHook(() =>
      useDocumentTitle(FIRST_CHANGE_TITLE, { preserveTitleOnUnmount: false })
    );

    expect(document.title).toBe(FIRST_CHANGE_TITLE);

    unmount();

    expect(document.title).toBe(ORIGIN_TITLE);
  });

  it('should retain the changed title on unmount if preserveTitleOnUnmount is true', () => {
    const { unmount } = renderHook(() =>
      useDocumentTitle(FIRST_CHANGE_TITLE, { preserveTitleOnUnmount: true })
    );

    expect(document.title).toBe(FIRST_CHANGE_TITLE);

    unmount();

    expect(document.title).toBe(FIRST_CHANGE_TITLE);
  });
});
