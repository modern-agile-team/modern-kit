export const parseJSON = <T>(value: any): T | null => {
  if (typeof value !== 'string') {
    return value as T;
  }

  if (value === '') {
    return '' as T;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    console.error(`데이터를 파싱하는 데에 실패했습니다. 원본: ${value}`);
    return null;
  }
};
