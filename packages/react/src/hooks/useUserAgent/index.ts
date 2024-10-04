import { useState } from 'react';
import { UAParser } from 'ua-parser-js';
import { isClient } from '@modern-kit/utils';

/**
 * @description 사용자의 User Agent 정보를 분석하여 반환합니다.
 *
 * @returns {UAParser.IResult | null} 사용자의 User-Agent 정보 객체를 반환합니다.
 * 만약 클라이언트 환경이 아닌 경우(null), User-Agent 정보를 반환하지 않습니다.
 *
 * @example
 * const userAgent = useUserAgent();
 *
 * // userAgent는 사용자의 브라우저 및 운영체제 정보 등을 포함합니다.
 * console.log(userAgent?.browser.name); // 'Chrome', 'Firefox' 등
 */
export function useUserAgent(): UAParser.IResult | null {
  const [userAgent] = useState<UAParser.IResult | null>(() => {
    if (!isClient()) {
      return null;
    }
    const uaParser = new UAParser(window.navigator.userAgent);

    return uaParser.getResult();
  });
  return userAgent;
}
