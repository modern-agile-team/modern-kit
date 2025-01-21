import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getUniqTime } from '.';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('getUniqTime', () => {
  it('동일한 시간에 여러 번 호출되어도 고유한 시간값을 반환해야 합니다', () => {
    vi.setSystemTime(new Date('2023-08-07T09:00:00Z'));

    const time1 = getUniqTime();
    const time2 = getUniqTime();

    expect(time1).not.toBe(time2);
  });
});
