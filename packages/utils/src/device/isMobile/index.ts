import { isServer } from '../../device/isServer';

export const isMobile = () => {
  if (isServer()) return false;

  const userAgent = window.navigator.userAgent;
  const regex =
    /Android|webOS|iPhone|iPad|iPod|Windows Phone|BlackBerry|IEMobile|Opera Mini/i;

  return regex.test(userAgent);
};
