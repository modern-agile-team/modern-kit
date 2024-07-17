import { isNil } from '../../validator';

const getRangeValue = (start: number, end: number, step: number = 1) => {
  const result = [];

  for (let value = start; value <= end; value += step) {
    result.push(value);
  }

  return result;
};

export function range(end: number): number[];
export function range(start: number, end: number): number[];
export function range(start: number, end: number, step?: number): number[];
export function range(startOrEnd: number, end?: number, step?: number) {
  if (isNil(end)) {
    return getRangeValue(1, startOrEnd);
  }

  if (startOrEnd > end) {
    throw new Error('min value cannot be greater than the max value.');
  }

  if (Object.is(step, 0) || Object.is(step, -0)) {
    throw new Error('step value cannot be zero (neither +0 nor -0).');
  }

  if (step && !Number.isInteger(step)) {
    throw new Error('step value must be an integer.');
  }

  return getRangeValue(startOrEnd, end, step);
}
