import { isArray } from '../../validator';

export interface SerializeOptions {
  skipNull?: boolean;
  skipEmptyString?: boolean;
  skipUndefined?: boolean;
}

export const isValidValue = <T>(
  value: T,
  {
    skipNull = true,
    skipEmptyString = true,
    skipUndefined = true,
  }: SerializeOptions = {}
) =>
  !(skipUndefined && value === undefined) &&
  !(skipNull && value === null) &&
  !(skipEmptyString && value === '');

export const serializeKeyValue = <T>(
  key: string,
  value: T,
  options: SerializeOptions
) => {
  return isValidValue(value, options) ? `${key}=${value}` : '';
};

const serializeArray = <T>(
  key: string,
  arr: T[] | readonly T[],
  options: SerializeOptions
) => {
  let result = '';

  for (const value of arr) {
    const serializedValue = serializeKeyValue(key, value, options);
    if (serializedValue) {
      result += result ? `&${serializedValue}` : serializedValue;
    }
  }

  return result;
};

export const serializeByType = <T>(
  key: string,
  value: T,
  options: SerializeOptions
) => {
  if (isArray(value)) {
    return serializeArray(key, value, options);
  }
  return serializeKeyValue(key, value, options);
};
