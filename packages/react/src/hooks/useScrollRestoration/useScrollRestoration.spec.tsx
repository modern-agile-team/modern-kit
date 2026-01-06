import { render, renderHook, cleanup } from '@testing-library/react';
import { useScrollRestoration } from '.';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  pruneScrollPositionMap,
  getHistoryKey,
} from './useScrollRestoration.utils';

vi.mock('./useScrollRestoration.utils', () => ({
  getHistoryKey: vi.fn(),
  pruneScrollPositionMap: vi.fn(),
}));

const STORAGE_KEY = 'mk-scroll-restoration';
const TEST_HISTORY_KEY = 'test-history-key-123';
const SAVED_SCROLL_Y = 1500;

// 자주 사용되는 스크롤 맵 상수
const DEFAULT_WINDOW_SCROLL_MAP = {
  [`${TEST_HISTORY_KEY}-window`]: SAVED_SCROLL_Y,
};
const DEFAULT_ELEMENT_SCROLL_MAP = {
  [`${TEST_HISTORY_KEY}-element`]: SAVED_SCROLL_Y,
};

const getStorageItem = (key: string) => {
  const rawData = sessionStorage.getItem(STORAGE_KEY);
  const savedData = rawData ? JSON.parse(rawData) : {};
  return savedData[key];
};

/**
 * mock 데이터를 설정하는 헬퍼 함수
 */
const setupMocks = ({
  historyKey = TEST_HISTORY_KEY,
  scrollMap = {},
  setStorage = true,
}: {
  historyKey?: string;
  scrollMap?: Record<string, number>;
  setStorage?: boolean;
} = {}) => {
  vi.mocked(getHistoryKey).mockReturnValue(historyKey);
  vi.mocked(pruneScrollPositionMap).mockReturnValue(scrollMap);

  if (setStorage && Object.keys(scrollMap).length > 0) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(scrollMap));
  }
};

const TestComponent = () => {
  const { ref } = useScrollRestoration<HTMLDivElement>();

  return (
    <div ref={ref} style={{ height: '1000px', overflow: 'auto' }}>
      <div style={{ height: '2000px' }}></div>
    </div>
  );
};

beforeEach(() => {
  window.sessionStorage.clear();
  cleanup();
  vi.useFakeTimers();

  window.scrollTo = vi.fn();
  HTMLElement.prototype.scrollTo = vi.fn();

  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    value: 5000,
  });

  Object.defineProperty(document.documentElement, 'scrollHeight', {
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
  vi.useRealTimers();
});

describe('useScrollRestoration', () => {
  it('언마운트 시점에 스크롤 위치를 저장한다.', () => {
    setupMocks({ scrollMap: DEFAULT_WINDOW_SCROLL_MAP });

    const { unmount } = renderHook(() => useScrollRestoration());
    window.scrollY = SAVED_SCROLL_Y;

    unmount();

    const rawData = sessionStorage.getItem(STORAGE_KEY);
    const savedData = rawData ? JSON.parse(rawData) : {};
    const storageKey = `${TEST_HISTORY_KEY}-window`;

    expect(savedData[storageKey]).toBe(SAVED_SCROLL_Y);
  });

  it('마운트 시점에 저장된 스크롤 위치로 복구한다.', () => {
    setupMocks({ scrollMap: DEFAULT_WINDOW_SCROLL_MAP });

    renderHook(() => useScrollRestoration());

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: SAVED_SCROLL_Y,
      behavior: 'instant',
    });
  });

  it('저장된 위치보다 문서 높이가 짧으면 복구하지 않는다.', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', {
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
    setupMocks({ scrollMap: DEFAULT_ELEMENT_SCROLL_MAP });

    const scrollToSpy = vi.spyOn(HTMLElement.prototype, 'scrollTo');

    render(<TestComponent />);

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 1500,
      behavior: 'instant',
    });
  });

  it('여러 페이지 이동 시 각각의 key를 저장하고 복구해야 한다.', () => {
    const firstVisitKey = 'history_first_visit';
    const secondVisitKey = 'history_second_visit';

    const firstVisitScrollMap = { [`${firstVisitKey}-window`]: 100 };
    const combinedScrollMap = {
      ...firstVisitScrollMap,
      [`${secondVisitKey}-window`]: 800,
    };

    // 1. [A 첫 방문] 스크롤 100px 이동 후 이탈(저장)
    setupMocks({ historyKey: firstVisitKey, scrollMap: firstVisitScrollMap });
    const firstRender = renderHook(() => useScrollRestoration());

    window.scrollY = 100;
    firstRender.unmount(); // 저장 트리거

    // 검증: 첫 방문 A 키에 100 저장됨
    const storageItem1 = getStorageItem(`${firstVisitKey}-window`);
    expect(storageItem1).toBe(100);

    // 2. [방문 B (새 링크)] 새 키 생성 -> 스크롤 0에서 시작
    setupMocks({
      historyKey: secondVisitKey,
      scrollMap: combinedScrollMap,
      setStorage: false,
    });
    window.scrollTo = vi.fn(); // 호출 기록 초기화
    const secondRender = renderHook(() => useScrollRestoration());

    expect(window.scrollTo).not.toHaveBeenCalled(); // 새 방문이니 복원 안 함

    // 스크롤 800px 이동 후 이탈
    window.scrollY = 800;
    secondRender.unmount();

    // 검증: 키 1(100)과 키 2(800)가 따로 저장되어야 함
    const storageItem2 = getStorageItem(`${secondVisitKey}-window`);
    expect(storageItem2).toBe(800);

    // 3. [뒤로가기로 A 복귀] 첫 방문 키(Key 1)로 복원 시도
    setupMocks({
      historyKey: firstVisitKey,
      scrollMap: combinedScrollMap,
      setStorage: false,
    });
    window.scrollTo = vi.fn();
    renderHook(() => useScrollRestoration());

    // 검증: 800(최근)이 아니라 100(과거 시점)으로 정확히 복원되는지 확인
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 100,
      behavior: 'instant',
    });
  });

  it('시나리오: 페이지 A(0px) -> 페이지 B(1000px) -> 뒤로가기(Page A) 시 실제 scrollY가 0으로 변해야 함', () => {
    const pageAKey = 'page-a-key';
    const scrollMap = { [`${pageAKey}-window`]: 0 };

    // 1. Setup
    setupMocks({ historyKey: pageAKey, scrollMap });

    const { unmount } = renderHook(() => useScrollRestoration());
    unmount(); // 저장 완료 (0)

    // 2. Ghost Scroll 시뮬레이션 (B페이지의 잔재)
    // 현재 스크롤이 1000에 멈춰있는 상태
    Object.defineProperty(window, 'scrollY', {
      value: 1000,
      configurable: true,
      writable: true,
    });

    // 3. [핵심] scrollTo가 호출되면 실제로 scrollY 값을 갱신하도록 Mock 구현
    window.scrollTo = vi.fn((option) => {
      // option이 객체이고 top이 있으면 그 값으로 window.scrollY 업데이트
      if (typeof option === 'object' && typeof option.top === 'number') {
        window.scrollY = option.top;
      }
    });

    // 4. 훅 재실행 (복원 시도)
    setupMocks({ historyKey: pageAKey, scrollMap, setStorage: false });
    renderHook(() => useScrollRestoration());

    // 5. 검증: "호출했냐?"가 아니라 "결과가 0이냐?"를 확인
    // 버그가 있다면(호출 안 했다면) 1000으로 남아있어서 테스트 실패함.
    // 정상적으로 호출했다면 0으로 바뀌어서 테스트 통과함.
    expect(window.scrollY).toBe(0);
  });

  describe('Retry 메커니즘', () => {
    it('높이가 부족하면 재시도해야 한다', async () => {
      let currentHeight = 1000;

      setupMocks({ scrollMap: DEFAULT_WINDOW_SCROLL_MAP });

      Object.defineProperty(document.documentElement, 'scrollHeight', {
        configurable: true,
        get: () => currentHeight,
      });

      renderHook(() => useScrollRestoration());

      // 첫 시도: 높이 부족 (1000 < 1500)
      expect(window.scrollTo).not.toHaveBeenCalled();

      // 100ms 후 재시도
      vi.advanceTimersByTime(100);
      expect(window.scrollTo).not.toHaveBeenCalled();

      // 200ms 후 재시도 (지수 백오프)
      vi.advanceTimersByTime(200);
      expect(window.scrollTo).not.toHaveBeenCalled();

      // 이미지 로드 완료로 높이 증가
      currentHeight = 5000;

      // 400ms 후 재시도 -> 성공!
      vi.advanceTimersByTime(400);
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: SAVED_SCROLL_Y,
        behavior: 'instant',
      });
    });

    it('최대 재시도 횟수를 초과하면 중단해야 한다', () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        configurable: true,
        value: 1000, // 계속 부족
      });

      renderHook(() => useScrollRestoration());

      expect(window.scrollTo).not.toHaveBeenCalled();

      // 3번 재시도
      vi.advanceTimersByTime(100); // 1회
      vi.advanceTimersByTime(200); // 2회
      vi.advanceTimersByTime(400); // 3회

      // 최대 횟수 도달로 중단
      vi.advanceTimersByTime(800);
      vi.advanceTimersByTime(5000);

      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it('지수 백오프가 올바르게 작동해야 한다', () => {
      setupMocks({ scrollMap: DEFAULT_WINDOW_SCROLL_MAP });

      Object.defineProperty(document.documentElement, 'scrollHeight', {
        configurable: true,
        value: 1000, // 계속 부족
      });

      const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');

      renderHook(() => useScrollRestoration());

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 100);

      vi.advanceTimersByTime(100);

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 200);

      vi.advanceTimersByTime(200);

      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 400);
    });

    it('복원 성공 시 타이머를 정리해야 한다', () => {
      setupMocks({ scrollMap: DEFAULT_WINDOW_SCROLL_MAP });

      const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
      let currentHeight = 1000;

      Object.defineProperty(document.documentElement, 'scrollHeight', {
        configurable: true,
        get: () => currentHeight,
      });

      renderHook(() => useScrollRestoration());

      // 재시도 시작
      vi.advanceTimersByTime(100);

      // 높이 충족
      currentHeight = 5000;
      vi.advanceTimersByTime(200);

      // 복원 성공 후 타이머 정리 확인
      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it('enabled가 false로 변경되면 재시도를 중단해야 한다', () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', {
        configurable: true,
        value: 1000,
      });

      const { rerender } = renderHook(
        ({ enabled }) => useScrollRestoration({ enabled }),
        { initialProps: { enabled: true } }
      );

      // 재시도 중
      vi.advanceTimersByTime(100);
      expect(window.scrollTo).not.toHaveBeenCalled();

      // enabled를 false로 변경
      rerender({ enabled: false });

      // 더 이상 재시도 안 함
      vi.advanceTimersByTime(1000);
      vi.advanceTimersByTime(5000);
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('Beforeunload 이벤트 처리', () => {
    it('beforeunload 이벤트 발생 시 현재 스크롤 위치를 저장해야 한다', () => {
      const testKey = 'test-history-key';
      const scrollPosition = 2000;

      setupMocks({ historyKey: testKey, scrollMap: {} });

      renderHook(() => useScrollRestoration());

      window.scrollY = scrollPosition;

      const beforeunloadEvent = new Event('beforeunload');
      window.dispatchEvent(beforeunloadEvent);

      const savedData = getStorageItem(`${testKey}-window`);
      expect(savedData).toBe(scrollPosition);
    });

    it('새로고침 후 저장된 스크롤 위치로 복원되어야 한다', () => {
      const testKey = 'test-history-key';
      const savedScrollPosition = 1800;
      const scrollMap = { [`${testKey}-window`]: savedScrollPosition };

      // 새로고침 전 저장된 데이터 시뮬레이션
      setupMocks({ historyKey: testKey, scrollMap });

      // 새로고침 후 마운트 (새 컴포넌트 인스턴스)
      renderHook(() => useScrollRestoration());

      // 저장된 위치로 복원되었는지 확인
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: savedScrollPosition,
        behavior: 'instant',
      });
    });
  });

  describe('Popstate 이벤트 처리', () => {
    it('popstate 이벤트 발생 시 현재 페이지를 저장하고 이전 페이지로 복원해야 한다', () => {
      const keyA = 'history-key-A';
      const keyB = 'history-key-B';

      const pageAScrollMap = { [`${keyA}-window`]: 1000 };
      const combinedScrollMap = {
        [`${keyA}-window`]: 1000,
        [`${keyB}-window`]: 2500,
      };

      // 1. PageA mount
      setupMocks({ historyKey: keyA, scrollMap: pageAScrollMap });

      const { unmount } = renderHook(() => useScrollRestoration());

      // 2. PageA가 1000으로 복원됨 (첫 mount 시)
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 1000,
        behavior: 'instant',
      });

      // 3. 사용자가 PageB로 이동했다고 가정
      unmount(); // PageA unmount

      // 4. PageB mount (새 컴포넌트 인스턴스)
      setupMocks({ historyKey: keyB, scrollMap: combinedScrollMap });
      window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(pageAScrollMap)
      ); // PageA 데이터만 유지

      vi.mocked(window.scrollTo).mockClear();
      renderHook(() => useScrollRestoration());

      // PageB는 저장된 데이터 없음 → 복원 안 함
      expect(window.scrollTo).not.toHaveBeenCalled();

      // 5. PageB에서 스크롤
      window.scrollY = 2500;

      // 6. 뒤로가기 시뮬레이션
      vi.mocked(window.scrollTo).mockClear();

      // Popstate 발생 시 getHistoryKey는 돌아갈 페이지(keyA)를 반환
      setupMocks({
        historyKey: keyA,
        scrollMap: combinedScrollMap,
        setStorage: false,
      });

      const popstateEvent = new PopStateEvent('popstate');
      window.dispatchEvent(popstateEvent);

      // 7. 검증
      // (1) PageB의 스크롤 위치(2500)가 저장되었는지 확인
      const savedData = getStorageItem(`${keyB}-window`);
      expect(savedData).toBe(2500);

      // (2) PageA의 스크롤 위치(1000)로 복원되었는지 확인
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 1000,
        behavior: 'instant',
      });
    });
  });

  describe('Behavior 옵션', () => {
    it('behavior를 smooth로 설정할 수 있어야 한다', () => {
      setupMocks({ scrollMap: DEFAULT_WINDOW_SCROLL_MAP });

      renderHook(() => useScrollRestoration({ behavior: 'smooth' }));

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: SAVED_SCROLL_Y,
        behavior: 'smooth',
      });
    });

    it('behavior를 auto로 설정할 수 있어야 한다', () => {
      setupMocks({ scrollMap: DEFAULT_WINDOW_SCROLL_MAP });

      renderHook(() => useScrollRestoration({ behavior: 'auto' }));

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: SAVED_SCROLL_Y,
        behavior: 'auto',
      });
    });
  });

  describe('SessionStorage 정리', () => {
    it('maxEntries를 초과하면 오래된 데이터를 정리해야 한다', () => {
      // 60개 엔트리 생성
      const scrollMap: Record<string, number> = {};
      for (let i = 0; i < 60; i++) {
        scrollMap[`key_${i}`] = i * 100;
      }

      // pruneScrollPositionMap이 50개만 반환하도록 설정 (오래된 10개 제거)
      const prunedMap: Record<string, number> = {};
      for (let i = 10; i < 60; i++) {
        prunedMap[`key_${i}`] = i * 100;
      }

      setupMocks({ scrollMap });
      vi.mocked(pruneScrollPositionMap).mockReturnValue(prunedMap);

      const { unmount } = renderHook(() => useScrollRestoration());
      window.scrollY = 1000;
      unmount();

      // sessionStorage에 정리된 결과 + 새로 저장된 1개가 있는지 확인
      const savedData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
      expect(Object.keys(savedData).length).toBe(51);
    });
  });

  describe('Unmount 시 정리', () => {
    it('unmount 시 진행 중인 타이머를 정리해야 한다', () => {
      setupMocks({ scrollMap: DEFAULT_WINDOW_SCROLL_MAP });

      Object.defineProperty(document.documentElement, 'scrollHeight', {
        configurable: true,
        value: 1000, // retry 유발
      });

      const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');

      const { unmount } = renderHook(() => useScrollRestoration());

      // 재시도 진행 중
      vi.advanceTimersByTime(100);

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });
  });
});
