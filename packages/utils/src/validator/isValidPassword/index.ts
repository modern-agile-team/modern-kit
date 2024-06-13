import {
  containsConsecutiveCharacters,
  containsHangul,
  containsLowerCase,
  containsNumber,
  containsSpecialCharacters,
  containsUpperCase,
  containsWhitespace,
} from '../../regex';
import { contain } from '../../array';

type Validator = 'lowerCase' | 'number' | 'specialCharacters' | 'upperCase';

type ErrorReason =
  | Validator
  | 'forbidden'
  | 'whiteSpace'
  | 'consecutiveCharacters'
  | 'hangul'
  | 'length';

interface Options {
  validator: Validator[];
  minLength: number;
  maxLength: number;
  maxRepeatChars: number;
  isContainHangul: boolean;
  forbiddenPasswords: string[] | ReadonlyArray<string>;
}

interface PasswordValidationReturnType {
  isValid: boolean;
  errorReason: ErrorReason | null;
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
): PasswordValidationReturnType => {
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
    return { isValid: false, errorReason: 'forbidden' };
  }

  // Check for whitespace
  if (containsWhitespace(password)) {
    return { isValid: false, errorReason: 'whiteSpace' };
  }

  // Check for consecutive characters
  if (containsConsecutiveCharacters(password, maxRepeatChars)) {
    return { isValid: false, errorReason: 'consecutiveCharacters' };
  }

  // Check for Korean language inclusions
  if (!isContainHangul && containsHangul(password)) {
    return { isValid: false, errorReason: 'hangul' };
  }

  // Check password minimum/maximum length
  if (!checkLength(password, minLength, maxLength)) {
    return { isValid: false, errorReason: 'length' };
  }

  // Check for inclusion of lowerCase
  if (contain(validator, 'lowerCase') && !containsLowerCase(password)) {
    return { isValid: false, errorReason: 'lowerCase' };
  }

  // Check for inclusion of numbers
  if (contain(validator, 'number') && !containsNumber(password)) {
    return { isValid: false, errorReason: 'number' };
  }

  // Check for inclusion of special character
  if (
    contain(validator, 'specialCharacters') &&
    !containsSpecialCharacters(password)
  ) {
    return { isValid: false, errorReason: 'specialCharacters' };
  }

  // Check for inclusion of upperCase
  if (contain(validator, 'upperCase') && !containsUpperCase(password)) {
    return { isValid: false, errorReason: 'upperCase' };
  }

  return { isValid: true, errorReason: null };
};
