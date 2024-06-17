import {
  containsConsecutiveCharacters,
  containsHangul,
  containsLowerCase,
  containsNumber,
  containsSpecialCharacters,
  containsUpperCase,
  containsWhiteSpace,
} from '../../regex';
import { contain } from '../../array';

interface ValidationOption {
  lowerCase?: boolean;
  number?: boolean;
  specialCharacters?: boolean;
  upperCase?: boolean;
  hangul?: boolean;
}

type Validator =
  | 'hangul'
  | 'lowerCase'
  | 'number'
  | 'specialCharacters'
  | 'upperCase';

type ErrorReason =
  | Validator
  | 'forbidden'
  | 'whiteSpace'
  | 'consecutiveCharacters'
  | 'length';

interface Options {
  validationOptions: ValidationOption;
  minLength: number;
  maxLength: number;
  maxRepeatChars: number;
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
    forbiddenPasswords = [],
    validationOptions = {},
  } = options;

  const {
    lowerCase = false,
    number = false,
    specialCharacters = false,
    upperCase = false,
    hangul = true,
  } = validationOptions;

  // Check invalid length options
  if (checkInValidLengthOptions(minLength, maxLength)) {
    throw new Error('Invalid length option value');
  }

  // Check Include forbidden password list
  if (contain(forbiddenPasswords, password)) {
    return { isValid: false, errorReason: 'forbidden' };
  }

  // Check for whitespace
  if (containsWhiteSpace(password)) {
    return { isValid: false, errorReason: 'whiteSpace' };
  }

  // Check for consecutive characters
  if (containsConsecutiveCharacters(password, maxRepeatChars)) {
    return { isValid: false, errorReason: 'consecutiveCharacters' };
  }

  // Check for Korean language inclusions
  if (hangul && containsHangul(password)) {
    return { isValid: false, errorReason: 'hangul' };
  }

  // Check password minimum/maximum length
  if (!checkLength(password, minLength, maxLength)) {
    return { isValid: false, errorReason: 'length' };
  }

  // Check for inclusion of lowerCase
  if (lowerCase && !containsLowerCase(password)) {
    return { isValid: false, errorReason: 'lowerCase' };
  }

  // Check for inclusion of numbers
  if (number && !containsNumber(password)) {
    return { isValid: false, errorReason: 'number' };
  }

  // Check for inclusion of special character
  if (specialCharacters && !containsSpecialCharacters(password)) {
    return { isValid: false, errorReason: 'specialCharacters' };
  }

  // Check for inclusion of upperCase
  if (upperCase && !containsUpperCase(password)) {
    return { isValid: false, errorReason: 'upperCase' };
  }

  return { isValid: true, errorReason: null };
};
