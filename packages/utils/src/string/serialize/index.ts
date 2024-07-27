import { isArray } from '../../validator';

interface Options {
  skipNull?: boolean;
  skipEmptyString?: boolean;
}

const isValidValue = (
  value: unknown,
  { skipNull = true, skipEmptyString = true }: Options = {},
) =>
  value !== undefined &&
  !(skipNull && value === null) &&
  !(skipEmptyString && value === '');

const serializeKeyValue = (key: string, value: unknown, options: Options) => {
  if (!isValidValue(value, options)) {
    return false;
  }
  return `${key}=${value}`;
};

const serializeArray = (
  key: string,
  array: unknown[] | readonly unknown[],
  options: Options,
) =>
  array
    .map((value) => serializeKeyValue(key, value, options))
    .filter((item) => !!item)
    .join('&');

export const serialize = (
  obj: Record<string, unknown>,
  options: Options = {},
) => {
  return Object.entries(obj)
    .map(([key, value]) =>
      isArray(value)
        ? serializeArray(key, value, options)
        : serializeKeyValue(key, value, options),
    )
    .filter((item) => !!item)
    .join('&');
};
