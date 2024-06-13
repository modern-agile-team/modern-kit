import {
  containsConsecutiveCharacters,
  containsHangul,
  containsLowerCase,
  containsNumber,
  containsSpecialCharacter,
  containsUpperCase,
  containsWhitespace,
} from '../../regex';
import { contain } from '../../array';

interface Options {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  minLength: number;
  maxLength: number;
  maxRepeatChars: number;
  isContainHangul: boolean;
  forbiddenPasswords: string[] | ReadonlyArray<string>;
}

const checkInValidLengthOptions = (
  minLength: Options['minLength'],
  maxLength: Options['maxLength']
) => {
  if (minLength < 1 || maxLength < 1 || minLength > maxLength) {
    return true;
  }
  return !Number.isInteger(minLength) || !Number.isInteger(maxLength);
};

const checkForbiddenPasswords = (
  password: string,
  forbiddenPasswords: Options['forbiddenPasswords']
) => {
  return contain(forbiddenPasswords, password);
};

const checkLength = (
  password: string,
  minLength: Options['minLength'],
  maxLength: Options['maxLength']
) => {
  return password.length >= minLength && password.length <= maxLength;
};

export const isPassword = (
  password: string,
  options: Partial<Options> = {}
) => {
  const {
    level = 5,
    minLength = 8,
    maxLength = 24,
    maxRepeatChars = maxLength + 1,
    isContainHangul = false,
    forbiddenPasswords = [],
  } = options;

  // Check invalid length options
  if (checkInValidLengthOptions(minLength, maxLength)) {
    throw new Error('Invalid length option value');
  }

  // Check Include forbidden password list
  if (checkForbiddenPasswords(password, forbiddenPasswords)) {
    return false;
  }

  // Check for whitespace
  if (containsWhitespace(password)) {
    return false;
  }

  // Check for consecutive characters
  if (containsConsecutiveCharacters(password, maxRepeatChars)) {
    return false;
  }

  // Check for Korean language inclusions
  if (!isContainHangul && containsHangul(password)) {
    return false;
  }

  // level1: Check password minimum/maximum length
  if (level >= 1 && !checkLength(password, minLength, maxLength)) {
    return false;
  }

  // level2: Check for inclusion of lowercase
  if (level >= 2 && !containsLowerCase(password)) {
    return false;
  }

  // level3: Check for inclusion of lowercase + numbers
  if (level >= 3 && !containsNumber(password)) {
    return false;
  }

  // level4: Check for inclusion of lowercase + numbers + special characters
  if (level >= 4 && !containsSpecialCharacter(password)) {
    return false;
  }

  // level5: Check for inclusion of lowercase + numbers + special characters + uppercase
  if (level >= 5 && !containsUpperCase(password)) {
    return false;
  }

  return true;
};
