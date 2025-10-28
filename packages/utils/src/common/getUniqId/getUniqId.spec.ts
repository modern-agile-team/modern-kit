import { afterEach, describe, expect, it, vi, beforeEach } from 'vitest';
import { getUniqId } from '.';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('getUniqId', () => {
  it('시간을 기반으로 고유한 ID 값을 반환해야 합니다', () => {
    vi.setSystemTime(new Date('2023-08-07T09:00:00Z'));

    const id1 = getUniqId();
    const id2 = getUniqId();

    expect(id1).not.toBe(id2);
  });

  it('고유 ID 생성 시 접두사를 추가할 수 있어야 합니다', () => {
    const prefix = 'id_';

    vi.setSystemTime(new Date('2024-01-01T09:00:00Z'));

    const id1 = getUniqId(prefix);

    expect(id1.startsWith(prefix)).toBeTruthy();
  });
});
