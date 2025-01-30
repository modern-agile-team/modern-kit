import { describe, it, expect, beforeEach, vi, MockInstance } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUserAgent } from '.';

let userAgentSpy: MockInstance;

// https://github.com/faisalman/ua-parser-js?tab=readme-ov-file#overview
const userAgentMockData =
  'Mozilla/5.0 (Linux; Android 10; STK-LX1 Build/HONORSTK-LX1; ARM; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile Safari/537.36 musical_ly_2022803040 JsSdk/1.0 NetType/WIFI Channel/huaweiadsglobal_int AppName/musical_ly app_version/28.3.4 ByteLocale/en ByteFullLocale/en Region/IQ Spark/1.2.7-alpha.8 AppVersion/28.3.4 PIA/1.5.11 BytedanceWebview/d8a21c6';

beforeEach(() => {
  userAgentSpy = vi.spyOn(window.navigator, 'userAgent', 'get');
  userAgentSpy.mockReturnValue(userAgentMockData);
});

describe('useUserAgent', () => {
  it('userAgent 문자열을 파싱하고 CPU 정보를 반환해야 합니다', () => {
    const { result } = renderHook(() => useUserAgent());

    if (!result.current) return;
    const { ua, browser, engine, os, device, cpu } = result.current;

    expect(ua).toBe(userAgentMockData);
    expect(browser).toEqual({ name: 'TikTok', version: '28.3.4', major: '28' });
    expect(engine).toEqual({ name: 'Blink', version: '110.0.5481.153' });
    expect(os).toEqual({ name: 'Android', version: '10' });
    expect(device).toEqual({
      vendor: 'Huawei',
      model: 'STK-LX1',
      type: 'mobile',
    });
    expect(cpu).toEqual({ architecture: 'arm' });
  });
});
