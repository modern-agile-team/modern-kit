export const parseJSON = <T>(value: any): T | null => {
  if (value === '') {
    return '' as T;
  }

  if (typeof value !== 'string') {
    return value as T;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    if (process.env.NODE_ENV === 'development') {
      console.error(`데이터를 파싱하는 데에 실패했습니다. 원본: ${value}`);
    }
    return null;
  }
};
