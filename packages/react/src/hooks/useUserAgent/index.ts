import { useState } from 'react';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { UAParser } from 'ua-parser-js';

export const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState<UAParser.IResult | null>(null);

  useIsomorphicLayoutEffect(() => {
    const uaParser = new UAParser(window.navigator.userAgent);

    setUserAgent(uaParser.getResult());
  }, []);

  return userAgent;
};
