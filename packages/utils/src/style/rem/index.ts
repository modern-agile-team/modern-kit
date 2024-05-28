import { isNumber } from '../../validator';
import { isClient } from '../../device';

interface RemOptions {
  suffix?: boolean;
  toFixedDigits?: number;
}

const cacheMap = new Map<string, string | number>();

const getFixedRem = (rem: number, toFixedDigits?: number) => {
  if (isNumber(toFixedDigits)) {
    return Number(rem.toFixed(toFixedDigits));
  }
  return rem;
};

const getElementFontSize = (element: HTMLElement) => {
  return getComputedStyle(element).fontSize;
};

export const rem = (pixel: number, options: RemOptions = {}) => {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }

  const { suffix = true, toFixedDigits } = options;
  const cacheKey = `${pixel}-${suffix}-${toFixedDigits}`;

  if (cacheMap.has(cacheKey)) {
    return cacheMap.get(cacheKey) as string | number;
  }

  const rootFontSize = getElementFontSize(document.documentElement);

  const fixedRem = getFixedRem(pixel / parseFloat(rootFontSize), toFixedDigits);
  const result = suffix ? `${fixedRem}rem` : fixedRem;

  cacheMap.set(cacheKey, result);
  return result;
};
