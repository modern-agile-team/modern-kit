import { isNil } from '../../validator';

function getRangeValue(start: number, end: number, step: number = 1) {
  const length = Math.max(Math.ceil((end - start) / step), 0);
  const result = new Array(length);

  for (let i = 0; i < result.length; i++) {
    result[i] = start + step * i;
  }

  return result;
}

export function range(end: number): number[];
export function range(start: number, end: number): number[];
export function range(start: number, end: number, step?: number): number[];
export function range(start: number, end?: number, step?: number) {
  if (isNil(end)) {
    return getRangeValue(0, start);
  }

  if (isNil(step)) {
    step = 1;
  }

  if (!Number.isInteger(step) || step === 0) {
    throw new Error('The step value must be a non-zero integer.');
  }

  return getRangeValue(start, end, step);
}
