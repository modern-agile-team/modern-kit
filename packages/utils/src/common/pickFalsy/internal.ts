import {
  isNil,
  isBoolean,
  isNumber,
  isString,
  isArray,
  isPlainObject,
} from '../../validator';

const isInvalidBoolean = (value: unknown) =>
  isBoolean(value) && value === false;
const isInvalidNumber = (value: unknown) =>
  isNumber(value) && (Number.isNaN(value) || value === 0);
const isInvalidString = (value: unknown) => isString(value) && value === '';

const isInvalidArray = (value: unknown) => isArray(value) && value.length === 0;
const isInvalidObject = (value: unknown) =>
  isPlainObject(value) && Object.keys(value).length === 0;

export const FALSY_MAPPER = {
  null: isNil,
  undefined: isNil,
  boolean: isInvalidBoolean,
  number: isInvalidNumber,
  string: isInvalidString,
  array: isInvalidArray,
  object: isInvalidObject,
} as const;
