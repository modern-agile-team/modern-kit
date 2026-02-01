import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

type GeolocationData = GeolocationPosition['coords'] & { timestamp: number };

interface GeolocationState {
  data: GeolocationData | null;
  error: GeolocationPositionError | Error | null;
  loading: boolean;
  isWatching: boolean;
}

interface UseGeolocationOptions extends PositionOptions {
  mountBehavior?: 'watch' | 'get';
}

interface UseGeolocationReturn extends GeolocationState {
  get: () => void;
  watch: () => void;
  stopWatch: () => void;
}

/**
 * @description 브라우저의 Geolocation API를 활용하여 사용자의 현재 위치 정보를 가져오는 커스텀 훅입니다.
 *
 * 위치 정보를 한 번만 가져오거나(`get`) 실시간으로 추적(`watch`)할 수 있습니다.
 *
 * @param {UseGeolocationOptions} options - Geolocation API 옵션
 * @param {boolean} [options.enableHighAccuracy=false] - 높은 정확도의 위치 정보를 요청할지 여부
 * @param {number} [options.timeout=Infinity] - 위치 정보를 가져오는 데 허용되는 최대 시간 (밀리초)
 * @param {number} [options.maximumAge=0] - 캐시된 위치 정보의 최대 수명 (밀리초)
 * @param {'watch' | 'get'} [options.mountBehavior='get'] - 훅이 마운트될 때 위치 정보를 가져오는 방식
 *
 * @returns {UseGeolocationReturn} 위치 정보 상태 및 제어 함수
 *
 * @example
 * const location = useGeolocation();
 * const { data, error, loading, isWatching, get, watch, stopWatch } = location;
 *
 * @example
 * // 훅이 마운트될 때 위치 정보를 가져오는 방식을 실시간으로 설정
 * const location = useGeolocation({ mountBehavior: 'watch' });
 *
 * @example
 * // 훅이 마운트될 때 위치 정보를 가져오는 방식을 한 번만 설정
 * const location = useGeolocation({ mountBehavior: 'get' });
 */
export function useGeolocation(
  options: UseGeolocationOptions = {}
): UseGeolocationReturn {
  const {
    enableHighAccuracy = false,
    timeout = Infinity,
    maximumAge = 0,
    mountBehavior = 'get',
  } = options;

  const watchId = useRef<number | null>(null);

  const positionOptions = useMemo(() => {
    return {
      enableHighAccuracy,
      timeout,
      maximumAge,
    };
  }, [enableHighAccuracy, timeout, maximumAge]);

  const [state, setState] = useState<GeolocationState>({
    data: null,
    error: null,
    loading: !!mountBehavior,
    isWatching: mountBehavior === 'watch',
  });

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    setState((prev) => ({
      ...prev,
      data: { ...position.coords, timestamp: position.timestamp },
      error: null,
      loading: false,
    }));
  }, []);

  const handleError = useCallback((error: GeolocationPositionError) => {
    setState((prev) => ({
      ...prev,
      error,
      loading: false,
    }));
  }, []);

  const checkGeolocationSupport = useCallback(() => {
    if (typeof window === 'undefined' || navigator.geolocation == null) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: new Error('Geolocation을 지원하는 환경이 아닙니다.'),
      }));
      return false;
    }
    return true;
  }, []);

  const get = useCallback(() => {
    if (!checkGeolocationSupport()) {
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      positionOptions
    );
  }, [checkGeolocationSupport, handleSuccess, handleError, positionOptions]);

  const watch = useCallback(() => {
    if (!checkGeolocationSupport()) {
      return;
    }

    setState((prev) => ({ ...prev, isWatching: true }));

    watchId.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      positionOptions
    );
  }, [checkGeolocationSupport, handleSuccess, handleError, positionOptions]);

  const stopWatch = useCallback(() => {
    if (watchId.current != null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setState((prev) => ({ ...prev, isWatching: false }));
    }
  }, []);

  useEffect(() => {
    if (mountBehavior === 'watch') {
      watch();
    } else if (mountBehavior === 'get') {
      get();
    }

    return stopWatch;
  }, [mountBehavior, get, watch, stopWatch]);

  return {
    ...state,
    get,
    watch,
    stopWatch,
  };
}
