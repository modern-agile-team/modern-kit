import { render, renderHook, cleanup } from '@testing-library/react';
import { useScrollRestoration } from '.';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const STORAGE_KEY = 'mk-scroll-restoration';
const INIT_SCROLL_Y = 1500;

const getParsedStorageItem = () => {
  const rawData = sessionStorage.getItem(STORAGE_KEY);
  return rawData ? JSON.parse(rawData) : {};
};

/**
 * history.state를 설정하여 특정 historyKey를 가진 상태로 만드는 헬퍼 함수
 */
const setHistoryState = (key: string) => {
  window.history.replaceState({ 'mk-scroll-key': key }, '');
};

/**
 * 저장된 스크롤 데이터를 sessionStorage에 미리 설정하는 헬퍼 함수
 */
const setStorageData = (scrollMap: Record<string, number>) => {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(scrollMap));
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

  // history.state 초기화
  window.history.replaceState(null, '');

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
    const testKey = 'test-history-key';
    setHistoryState(testKey);

    const { unmount } = renderHook(() => useScrollRestoration());
    window.scrollY = INIT_SCROLL_Y;

    unmount();

    const storageKey = `${testKey}-window`;
    const parsedStorageItem = getParsedStorageItem();

    expect(parsedStorageItem[storageKey]).toBe(INIT_SCROLL_Y);
  });

  it('마운트 시점에 저장된 스크롤 위치로 복구한다.', () => {
    const testKey = 'test-history-key';
    setHistoryState(testKey);
    setStorageData({ [`${testKey}-window`]: INIT_SCROLL_Y });

    renderHook(() => useScrollRestoration());

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: INIT_SCROLL_Y,
      behavior: 'instant',
    });
  });

  it('저장된 위치보다 문서 높이가 짧으면 복구하지 않는다.', () => {
    const testKey = 'test-history-key';
    setHistoryState(testKey);
    setStorageData({ [`${testKey}-window`]: INIT_SCROLL_Y });

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 1000,
    });

    renderHook(() => useScrollRestoration());

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('enabled가 false이면 스크롤을 복원하지 않아야 한다', () => {
    const testKey = 'test-history-key';
    setHistoryState(testKey);
    setStorageData({ [`${testKey}-window`]: INIT_SCROLL_Y });

    renderHook(() => useScrollRestoration({ enabled: false }));

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('마운트 시 특정 요소(ref)의 스크롤 위치를 복원해야 한다', () => {
    const testKey = 'test-history-key';
    setHistoryState(testKey);
    setStorageData({ [`${testKey}-element`]: INIT_SCROLL_Y });

    const scrollToSpy = vi.spyOn(HTMLElement.prototype, 'scrollTo');

    render(<TestComponent />);

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 1500,
      behavior: 'instant',
    });
  });

  it('여러 페이지 이동 시 각각의 key를 저장하고 복구해야 한다.', () => {
    const firstVisitKey = 'first-visit';
    const secondVisitKey = 'second-visit';

    // 1. [A 첫 방문] 스크롤 100px 이동 후 이탈(저장)
    setHistoryState(firstVisitKey);
    const firstRender = renderHook(() => useScrollRestoration());

    window.scrollY = 100;
    firstRender.unmount(); // 저장 트리거

    // 검증: 첫 방문 A 키에 100 저장됨
    const parsedStorageItem = getParsedStorageItem();
    expect(parsedStorageItem[`${firstVisitKey}-window`]).toBe(100);

    // 2. [방문 B (새 링크)] 새 키 생성 -> 스크롤 0에서 시작
    setHistoryState(secondVisitKey);
    window.scrollTo = vi.fn();
    const secondRender = renderHook(() => useScrollRestoration());

    expect(window.scrollTo).not.toHaveBeenCalled(); // 새 방문이니 복원 안 함

    // 스크롤 800px 이동 후 이탈
    window.scrollY = 800;
    secondRender.unmount();

    // 검증: 키 1(100)과 키 2(800)가 따로 저장되어야 함
    const parsedStorageItem2 = getParsedStorageItem();
    expect(parsedStorageItem2[`${secondVisitKey}-window`]).toBe(800);

    // 3. [뒤로가기로 A 복귀] 첫 방문 키(Key 1)로 복원 시도
    setHistoryState(firstVisitKey);
    window.scrollTo = vi.fn();
    renderHook(() => useScrollRestoration());

    // 검증: 800(최근)이 아니라 100(과거 시점)으로 정확히 복원되는지 확인
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 100,
      behavior: 'instant',
    });
  });

  it('시나리오: 페이지 A(0px) -> 페이지 B(1000px) -> 뒤로가기(Page A) 시 실제 scrollY가 0으로 변해야 함', () => {
    const pageAKey = 'a-key';

    // 1. Setup
    setHistoryState(pageAKey);

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
      if (typeof option === 'object' && typeof option.top === 'number') {
        window.scrollY = option.top;
      }
    });

    // 4. 훅 재실행 (복원 시도)
    renderHook(() => useScrollRestoration());

    // 5. 검증: "호출했냐?"가 아니라 "결과가 0이냐?"를 확인
    expect(window.scrollY).toBe(0);
  });

  describe('Retry 메커니즘', () => {
    it('높이가 부족하면 재시도해야 한다.(재시도 타이머는 지수 백오프 적용)', async () => {
      const testKey = 'test-history-key';
      setHistoryState(testKey);
      setStorageData({ [`${testKey}-window`]: INIT_SCROLL_Y });

      let currentHeight = 1000;

      Object.defineProperty(document.documentElement, 'scrollHeight', {
        configurable: true,
        get: () => currentHeight,
      });

      renderHook(() => useScrollRestoration());

      // 첫 시도: 높이 부족 (1000 < 1500)
      expect(window.scrollTo).not.toHaveBeenCalled();

      // 재시도1
      vi.advanceTimersByTime(100);
      expect(window.scrollTo).not.toHaveBeenCalled();

      // 재시도2
      vi.advanceTimersByTime(200);
      expect(window.scrollTo).not.toHaveBeenCalled();

      // 높이 증가
      currentHeight = 5000;

      // 400ms 후 재시도 -> 성공!
      vi.advanceTimersByTime(400);

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: INIT_SCROLL_Y,
        behavior: 'instant',
      });
    });

    it('최대 재시도 횟수를 초과하면 중단해야 한다', () => {
      const testKey = 'test-history-key';
      setHistoryState(testKey);
      setStorageData({ [`${testKey}-window`]: INIT_SCROLL_Y });

      const setTimeOutSpy = vi.spyOn(globalThis, 'setTimeout');

      Object.defineProperty(document.documentElement, 'scrollHeight', {
        configurable: true,
        value: 1000, // 계속 부족
      });

      renderHook(() => useScrollRestoration());

      expect(window.scrollTo).not.toHaveBeenCalled();

      // 3번 재시도
      vi.advanceTimersByTime(100); // 1회

      expect(setTimeOutSpy).toHaveBeenCalledWith(expect.any(Function), 100);
      vi.advanceTimersByTime(200); // 2회
      expect(setTimeOutSpy).toHaveBeenCalledWith(expect.any(Function), 200);
      vi.advanceTimersByTime(400); // 3회
      expect(setTimeOutSpy).toHaveBeenCalledWith(expect.any(Function), 400);
      vi.advanceTimersByTime(800); // 4회
      expect(setTimeOutSpy).toHaveBeenCalledWith(expect.any(Function), 800);
      vi.advanceTimersByTime(1600); // 5회
      expect(setTimeOutSpy).toHaveBeenCalledWith(expect.any(Function), 1600);
      vi.advanceTimersByTime(3200); // 6회 (호출 안 됨)

      // 최대 횟수 도달로 중단
      expect(window.scrollTo).not.toHaveBeenCalled();
      expect(setTimeOutSpy).toHaveBeenCalledTimes(5);
    });

    it('복원 성공 시 타이머를 정리해야 한다', () => {
      const testKey = 'test-history-key';
      setHistoryState(testKey);
      setStorageData({ [`${testKey}-window`]: INIT_SCROLL_Y });

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
      const testKey = 'test-history-key';
      setHistoryState(testKey);
      setStorageData({ [`${testKey}-window`]: INIT_SCROLL_Y });

      Object.defineProperty(document.documentElement, 'scrollHeight', {
        configurable: true,
        value: 1000, // 재시도 유발
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

      setHistoryState(testKey);

      renderHook(() => useScrollRestoration());

      window.scrollY = INIT_SCROLL_Y;

      const beforeunloadEvent = new Event('beforeunload');
      window.dispatchEvent(beforeunloadEvent);

      const parsedStorageItem = getParsedStorageItem();
      expect(parsedStorageItem[`${testKey}-window`]).toBe(INIT_SCROLL_Y);
    });

    it('새로고침 후 저장된 스크롤 위치로 복원되어야 한다', () => {
      const testKey = 'test-history-key';
      const savedScrollPosition = 1800;

      // 새로고침 전 저장된 데이터 시뮬레이션
      setHistoryState(testKey);
      setStorageData({ [`${testKey}-window`]: savedScrollPosition });

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

      // 1. PageA mount & unmount (스크롤 위치 저장됨)
      setHistoryState(keyA);

      const firstRender = renderHook(() => useScrollRestoration());
      window.scrollY = 1000;
      firstRender.unmount(); // PageA의 1000이 저장됨

      // 2. PageB mount
      setHistoryState(keyB);
      window.scrollTo = vi.fn();

      const secondRender = renderHook(() => useScrollRestoration());

      // PageB는 저장된 데이터 없음 → 복원 안 함
      expect(window.scrollTo).not.toHaveBeenCalled();

      // 3. PageB에서 스크롤
      window.scrollY = 2500;

      // 4. 뒤로가기 시뮬레이션
      window.scrollTo = vi.fn();

      // Popstate 발생 시 history state를 keyA로 변경 (브라우저의 실제 동작)
      setHistoryState(keyA);

      const popstateEvent = new PopStateEvent('popstate');
      window.dispatchEvent(popstateEvent);

      // 5. 검증
      // (1) PageB의 스크롤 위치(2500)가 저장되었는지 확인
      const parsedStorageItem1 = getParsedStorageItem();
      expect(parsedStorageItem1[`${keyB}-window`]).toBe(2500);

      // (2) PageA의 스크롤 위치(1000)로 복원되었는지 확인
      const parsedStorageItem2 = getParsedStorageItem();
      expect(parsedStorageItem2[`${keyA}-window`]).toBe(1000); // PageA 데이터도 확인

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 1000,
        behavior: 'instant',
      });

      // 정리
      secondRender.unmount();
    });
  });

  describe('Behavior 옵션', () => {
    it('behavior 옵션을 설정할 수 있어야 한다', () => {
      const testKey = 'test-history-key';
      setHistoryState(testKey);
      setStorageData({ [`${testKey}-window`]: INIT_SCROLL_Y });

      renderHook(() => useScrollRestoration({ behavior: 'smooth' }));

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: INIT_SCROLL_Y,
        behavior: 'smooth',
      });
    });
  });

  describe('SessionStorage 정리', () => {
    it('maxEntries를 초과하면 오래된 데이터를 정리해야 한다', () => {
      const testKey = 'test-history-key';
      setHistoryState(testKey);

      // 60개 엔트리 생성 (최대 50개를 초과)
      const scrollMap: Record<string, number> = {};
      for (let i = 0; i < 60; i++) {
        scrollMap[`key_${i}`] = i * 100;
      }

      setStorageData(scrollMap);

      const { unmount } = renderHook(() => useScrollRestoration());
      window.scrollY = 1000;
      unmount();

      // sessionStorage에 정리된 결과 확인
      // pruneScrollPositionMap은 실제로 실행되어 최대 50개만 유지 + 새로 저장된 1개
      const savedData = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
      expect(Object.keys(savedData).length).toBeLessThanOrEqual(51);
    });
  });

  describe('Unmount 시 정리', () => {
    it('unmount 시 진행 중인 타이머를 정리해야 한다', () => {
      const testKey = 'test-history-key';
      setHistoryState(testKey);
      setStorageData({ [`${testKey}-window`]: INIT_SCROLL_Y });

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

  describe('Hash 처리', () => {
    it('hash가 있으면 재시도를 중단해야 한다', () => {
      const testKey = 'test-history-key';
      setHistoryState(testKey);
      setStorageData({ [`${testKey}-window`]: INIT_SCROLL_Y });

      window.location.hash = '#test';

      renderHook(() => useScrollRestoration());

      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });
});
