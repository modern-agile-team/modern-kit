import { isNumber, isString, isArray, isPlainObject } from '../../validator';

/**
 * @description 숫자 0을 falsy로 간주합니다.
 */
const isFalsyNumber = (value: unknown): boolean => {
  return isNumber(value) && value === 0;
};

/**
 * @description 빈 문자열을 falsy로 간주합니다.
 */
const isFalsyString = (value: unknown): boolean => {
  return isString(value) && value === '';
};

/**
 * @description 빈 배열을 falsy로 간주합니다.
 */
const isFalsyArray = (value: unknown): boolean => {
  return isArray(value) && value.length === 0;
};

/**
 * @description 빈 객체를 falsy로 간주합니다.
 */
const isFalsyObject = (value: unknown): boolean => {
  return isPlainObject(value) && Object.keys(value).length === 0;
};

/**
 * @description 다양한 타입에 대한 falsy 판단 함수들을 모아둔 맵
 * 각 함수는 해당 타입이 falsy로 간주되는 경우 true를 반환합니다.
 */
export const FALSY_CHECK_MAPPER = {
  number: isFalsyNumber,
  string: isFalsyString,
  array: isFalsyArray,
  object: isFalsyObject,
} as const;
