import { isNumber } from '../../validator';
import { isClient } from '../../device';

interface RemOptions {
  suffix?: boolean;
  toFixedDigits?: number;
}

const getFixedRem = (rem: number, toFixedDigits?: number) => {
  if (isNumber(toFixedDigits)) {
    return Number(rem.toFixed(toFixedDigits));
  }
  return rem;
};

export const rem = (pixel: number, options: RemOptions = {}) => {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }
  const { suffix = false, toFixedDigits } = options;

  const rootElement = document.documentElement;
  const rootFontSize = parseFloat(getComputedStyle(rootElement).fontSize); // "16px" -> 16

  const fixedRem = getFixedRem(pixel / rootFontSize, toFixedDigits);

  if (suffix) {
    return `${fixedRem}rem`;
  }
  return fixedRem;
};
