import Cookies from 'js-cookie';
import { getCustomEventHandler } from '../../_internal/storage';

export const cookieEventHandler = getCustomEventHandler('cookie');

export const getSnapshot = (key: string) => {
  return Cookies.get(key);
};

// SSR 환경에서 initialValue를 반환
export const getServerSnapshot = (initialValue: string | null) => {
  return initialValue;
};

export const subscribe = (callback: () => void) => {
  cookieEventHandler.subscribe(callback);
  return () => {
    cookieEventHandler.unsubscribe(callback);
  };
};
