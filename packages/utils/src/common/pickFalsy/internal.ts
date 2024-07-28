import { isArray } from '../../validator';

const checkBoolean = (value: unknown) => value === false;
const checkNull = (value: unknown) => value === null;
const checkUndefined = (value: unknown) => value === undefined;
const checkInvalidNumber = (value: unknown) =>
  typeof value === 'number' &&
  (Number.isNaN(value) || Object.is(value, +0) || Object.is(value, -0));
const checkEmptyString = (value: unknown) => value === '';

const checkEmptyArray = (value: unknown) =>
  isArray(value) && value.length === 0;
const checkEmptyObject = (value: unknown) =>
  value !== null &&
  typeof value === 'object' &&
  Object.keys(value).length === 0;

export const FALSY_MAPPER = {
  boolean: checkBoolean,
  null: checkNull,
  undefined: checkUndefined,
  number: checkInvalidNumber,
  string: checkEmptyString,
  array: checkEmptyArray,
  object: checkEmptyObject,
} as const;

export type FalsyMapperKeys = keyof typeof FALSY_MAPPER;
export type PickFalsyProps = Exclude<
  FalsyMapperKeys,
  'null' | 'undefined' | 'boolean'
>;
