export function isRegExp<T>(value: unknown): value is RegExp {
  return value instanceof RegExp;
}
