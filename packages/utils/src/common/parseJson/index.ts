export function parseJSON<T = unknown>(value: string): T;
export function parseJSON<T>(value: T): T;
export function parseJSON<T>(value: string): T {
  if (typeof value !== 'string') {
    return value as T;
  }
  try {
    return JSON.parse(value) as T;
  } catch (err) {
    throw new Error(`Failed to parse data: ${err}`);
  }
}
