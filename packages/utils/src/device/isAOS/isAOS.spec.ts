import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getOS } from '../getOS';
import { isAOS } from '.';

vi.mock('../getOS', () => ({
  getOS: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('isAOS', () => {
  it('서버 환경에서 호출되면 에러를 발생시켜야 합니다.', () => {
    expect(isAOS()).toBeFalsy();
  });

  it('AOS 장치인 경우 true를 반환해야 합니다.', () => {
    vi.mocked(getOS).mockReturnValue('android');
    expect(isAOS()).toBeTruthy();
  });
});
