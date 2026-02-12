export function parseJSON<T = unknown>(value: string): T;
export function parseJSON<T>(value: T): T;
export function parseJSON<T>(value: string): T {
  if (typeof value !== 'string') {
    return value as T;
  }
  try {
    return JSON.parse(value) as T;
  } catch (err) {
    throw new Error(`데이터 파싱에 실패했습니다.`, {
      cause: err,
    });
  }
}
