import { render, renderHook, cleanup } from '@testing-library/react';
import { useScrollRestoration } from '.'; // 경로 확인
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getHistoryKey } from './useScrollRestoration.util';

vi.mock('./useScrollRestoration.util', () => ({
  getHistoryKey: vi.fn(),
}));

const STORAGE_KEY = '__modern_kit_scroll_restoration_map__';
const TEST_HISTORY_KEY = 'test_history_key_123';
const SAVED_SCROLL_Y = 1500;

const TestComponent = () => {
  const { ref } = useScrollRestoration<HTMLDivElement>();

  return (
    <div ref={ref} style={{ height: '1000px', overflow: 'auto' }}>
      <div style={{ height: '2000px' }}></div>
    </div>
  );
};

describe('useScrollRestoration', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    cleanup();

    const preSavedData = {
      [TEST_HISTORY_KEY]: SAVED_SCROLL_Y,
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(preSavedData));

    window.scrollTo = vi.fn();
    HTMLElement.prototype.scrollTo = vi.fn();
    vi.mocked(getHistoryKey).mockReturnValue(TEST_HISTORY_KEY);

    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 5000,
    });

    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('언마운트 시점에 스크롤 위치를 저장한다.', () => {
    const { unmount } = renderHook(() => useScrollRestoration());
    window.scrollY = SAVED_SCROLL_Y;

    unmount();

    const rawData = sessionStorage.getItem(STORAGE_KEY);
    const savedData = rawData ? JSON.parse(rawData) : {};
    expect(savedData[TEST_HISTORY_KEY]).toBe(SAVED_SCROLL_Y);
  });

  it('마운트 시점에 저장된 스크롤 위치로 복구한다.', () => {
    renderHook(() => useScrollRestoration());

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: SAVED_SCROLL_Y,
      behavior: 'instant',
    });
  });

  it('저장된 위치보다 문서 높이가 짧으면 복구하지 않는다.', () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 1000,
    });

    renderHook(() => useScrollRestoration());

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('enabled가 false이면 스크롤을 복원하지 않아야 한다', () => {
    renderHook(() => useScrollRestoration({ enabled: false }));

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('마운트 시 특정 요소(ref)의 스크롤 위치를 복원해야 한다', () => {
    const scrollToSpy = vi.spyOn(HTMLElement.prototype, 'scrollTo');

    render(<TestComponent />);

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 1500,
      behavior: 'instant',
    });
  });
  it('여러 페이지 이동 시 각각의 key를 저장하고 복구해야 한다.', () => {
    const keyA_FirstVisit = 'history-key-A-1';
    const keyA_SecondVisit = 'history-key-A-2';

    // 1. [A 첫 방문] 스크롤 100px 이동 후 이탈(저장)
    vi.mocked(getHistoryKey).mockReturnValue(keyA_FirstVisit);
    const render1 = renderHook(() => useScrollRestoration());

    window.scrollY = 100;
    render1.unmount(); // 저장 트리거

    // 검증: 첫 방문 키에 100 저장됨
    const storageAfterFirstA = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) || '{}'
    );
    expect(storageAfterFirstA[keyA_FirstVisit]).toBe(100);

    // 2. [A 재방문 (새 링크)] 새 키 생성 -> 스크롤 0에서 시작
    vi.mocked(getHistoryKey).mockReturnValue(keyA_SecondVisit);
    window.scrollTo = vi.fn(); // 호출 기록 초기화
    const render2 = renderHook(() => useScrollRestoration());

    expect(window.scrollTo).not.toHaveBeenCalled(); // 새 방문이니 복원 안 함

    // 스크롤 800px 이동 후 이탈
    window.scrollY = 800;
    render2.unmount();

    // 검증: 키 1(100)과 키 2(800)가 따로 저장되어야 함
    const storageAfterSecondA = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) || '{}'
    );
    expect(storageAfterSecondA[keyA_SecondVisit]).toBe(800);
    expect(storageAfterSecondA[keyA_FirstVisit]).toBe(100);

    // 3. [뒤로가기로 A 복귀] 첫 방문 키(Key 1)로 복원 시도
    vi.mocked(getHistoryKey).mockReturnValue(keyA_FirstVisit);

    window.scrollTo = vi.fn();
    renderHook(() => useScrollRestoration());

    // 검증: 800(최근)이 아니라 100(과거 시점)으로 정확히 복원되는지 확인
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 100,
      behavior: 'instant',
    });
  });
});
