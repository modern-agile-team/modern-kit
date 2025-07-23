import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isServer } from '../isServer';
import { getOS } from '../getOS';
import { isIOS } from '.';

vi.mock('../getOS', () => ({
  getOS: vi.fn(),
}));

describe('isIOS', () => {
  it('서버 환경에서 호출되면 에러를 발생시켜야 합니다.', () => {
    expect(isIOS()).toBeFalsy();
  });

  it('iOS 장치인 경우 true를 반환해야 합니다.', () => {
    vi.mocked(getOS).mockReturnValue('ios');
    expect(isIOS()).toBeTruthy();
  });
});
