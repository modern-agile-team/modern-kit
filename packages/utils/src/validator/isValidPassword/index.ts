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

type Validator = 'lowerCase' | 'number' | 'specialCharacter' | 'upperCase';

interface Options {
  validator: Validator[];
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

const checkLength = (
  password: string,
  minLength: Options['minLength'],
  maxLength: Options['maxLength']
) => {
  return password.length >= minLength && password.length <= maxLength;
};

export const isValidPassword = (
  password: string,
  options: Partial<Options> = {}
) => {
  const {
    minLength = 8,
    maxLength = 16,
    maxRepeatChars = maxLength + 1,
    isContainHangul = false,
    forbiddenPasswords = [],
    validator = [],
  } = options;

  // Check invalid length options
  if (checkInValidLengthOptions(minLength, maxLength)) {
    throw new Error('Invalid length option value');
  }

  // Check Include forbidden password list
  if (contain(forbiddenPasswords, password)) {
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

  // Check password minimum/maximum length
  if (!checkLength(password, minLength, maxLength)) {
    return false;
  }

  // Check for inclusion of lowerCase
  if (contain(validator, 'lowerCase') && !containsLowerCase(password)) {
    return false;
  }

  // Check for inclusion of numbers
  if (contain(validator, 'number') && !containsNumber(password)) {
    return false;
  }

  // Check for inclusion of special character
  if (
    contain(validator, 'specialCharacter') &&
    !containsSpecialCharacter(password)
  ) {
    return false;
  }

  // Check for inclusion of upperCase
  if (contain(validator, 'upperCase') && !containsUpperCase(password)) {
    return false;
  }

  return true;
};
