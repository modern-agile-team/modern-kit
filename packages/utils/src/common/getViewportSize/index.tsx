import { isServer } from '../../device/isServer';

export function getViewportSize() {
  if (isServer()) {
    return { width: 0, height: 0 } as const;
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  } as const;
}
