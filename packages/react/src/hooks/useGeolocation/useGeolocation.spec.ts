import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGeolocation } from './index';

const mockGeolocation = {
  getCurrentPosition: vi.fn(),
  watchPosition: vi.fn(),
  clearWatch: vi.fn(),
};

type GeolocationData = {
  coords: Omit<GeolocationPosition['coords'], 'toJSON'>;
  timestamp: number;
};

const mockPosition: GeolocationData = {
  coords: {
    latitude: 37.5665,
    longitude: 126.978,
    accuracy: 100,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  },
  timestamp: Date.now(),
};

const expectedMockPosition = {
  ...mockPosition.coords,
  timestamp: mockPosition.timestamp,
};

const mockError: GeolocationPositionError = {
  code: 1,
  message: 'User denied Geolocation',
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
};

beforeEach(() => {
  Object.defineProperty(window.navigator, 'geolocation', {
    value: mockGeolocation,
    configurable: true,
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('useGeolocation', () => {
  describe('mount 시 동작', () => {
    it('마운트 시 기본적으로 getCurrentPosition을 통해 현재 위치 정보를 가져와야 합니다.', async () => {
      // mount 동작 테스트를 위해서는 미리 getCurrentPosition을 설정해야 합니다.
      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success(mockPosition);
      });

      const { result } = renderHook(() =>
        useGeolocation({ mountBehavior: 'get' })
      );

      expect(result.current.data).toEqual(expectedMockPosition);
      expect(result.current.loading).toBeFalsy();
    });

    it('마운트 시 mountBehavior가 watch일 때 watchPosition을 통해 위치 정보를 실시간으로 가져와야 합니다.', async () => {
      // mount 동작 테스트를 위해서는 미리 watchPosition을 설정해야 합니다.
      mockGeolocation.watchPosition.mockImplementation((success) => {
        success(mockPosition);
        return 123;
      });

      const { result } = renderHook(() =>
        useGeolocation({ mountBehavior: 'watch' })
      );

      expect(result.current.data).toEqual(expectedMockPosition);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.isWatching).toBeTruthy();
    });
  });

  describe('반환 함수 동작', () => {
    it('get 함수를 호출하면 현재 위치 정보를 업데이트해야 합니다.', async () => {
      const { result } = renderHook(() => useGeolocation());

      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success(mockPosition);
      });

      await waitFor(() => {
        result.current.get();
      });

      expect(result.current.data).toEqual(expectedMockPosition);
    });

    it('watch 함수를 호출하면 현재 위치 정보를 실시간으로 업데이트해야 하며 isWatching이 true가 되어야 합니다.', async () => {
      const { result } = renderHook(() => useGeolocation());

      mockGeolocation.watchPosition.mockImplementation((success) => {
        success(mockPosition);
        return 123;
      });

      await waitFor(() => {
        result.current.watch();
      });

      expect(result.current.data).toEqual(expectedMockPosition);
      expect(result.current.isWatching).toBeTruthy();
    });

    it('stopWatch 함수를 호출하면 위치 정보 실시간 업데이트를 중단하고 isWatching이 false가 되어야 합니다.', async () => {
      mockGeolocation.watchPosition.mockImplementation((success) => {
        success(mockPosition);
        return 123;
      });

      const { result } = renderHook(() => useGeolocation());

      await waitFor(() => {
        result.current.watch();
      });

      expect(result.current.isWatching).toBeTruthy();

      await waitFor(() => {
        result.current.stopWatch();
      });

      expect(result.current.isWatching).toBeFalsy();
    });
  });

  describe('positionOption', () => {
    it('positionOption을 설정하면 getCurrentPosition과 watchPosition에 해당 옵션이 전달되어야 합니다.', () => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const { result } = renderHook(() => useGeolocation(options));

      result.current.get();

      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        options
      );

      result.current.watch();
      expect(mockGeolocation.watchPosition).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        options
      );
    });
  });

  describe('에러 처리', () => {
    it('위치 정보 가져오기 실패 시 에러를 설정해야 한다', async () => {
      mockGeolocation.getCurrentPosition.mockImplementation((_, error) => {
        error(mockError);
      });

      const { result } = renderHook(() =>
        useGeolocation({ mountBehavior: 'get' })
      );

      expect(result.current.error).toEqual(mockError);
      expect(result.current.loading).toBeFalsy();
    });

    it('Geolocation을 지원하는 환경이 아닐 시 에러를 설정해야 한다', async () => {
      Object.defineProperty(window.navigator, 'geolocation', {
        value: null,
        configurable: true,
      });

      const { result } = renderHook(() => useGeolocation(), { hydrate: true });

      await waitFor(() => {
        result.current.get();
      });

      expect(result.current.error).toEqual(
        new Error('Geolocation을 지원하는 환경이 아닙니다.')
      );
      expect(result.current.loading).toBeFalsy();
    });
  });
});
