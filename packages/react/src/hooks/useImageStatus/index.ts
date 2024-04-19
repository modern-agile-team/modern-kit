import { useCallback, useState } from 'react';

type ImageStatus = 'pending' | 'loading' | 'complete' | 'error';

export const useImageStatus = () => {
  const [imageStatus, setImageStatus] = useState<ImageStatus>('pending');

  const ref = useCallback((imgElement: HTMLImageElement) => {
    if (!imgElement) {
      return;
    }

    setImageStatus('loading');

    imgElement.onload = () => {
      setImageStatus('complete');
    };

    imgElement.onerror = () => {
      setImageStatus('error');
    };
  }, []);

  return { ref, imageStatus };
};
