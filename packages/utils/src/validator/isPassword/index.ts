import { contain } from '../../array';

interface Options {
  level: 0 | 1 | 2 | 3 | 4 | 5;
  minLength: number;
  maxLength: number;
  maxRepeatChars: number;
  isContainHangul: boolean;
  forbiddenPasswords: string[] | ReadonlyArray<string>;
}

function checkConsecutiveChars(
  password: string,
  maxRepeatChars: Options['maxRepeatChars']
): boolean {
  const regex = new RegExp(`(.)\\1{${maxRepeatChars - 1}}`);
  return regex.test(password);
}

const checkInValidOptions = (
  minLength: Options['minLength'],
  maxLength: Options['maxLength'],
  maxRepeatChars: Options['maxRepeatChars']
) => {
  if (maxRepeatChars < 1 || minLength < 1 || minLength > maxLength) {
    return true;
  }
  return (
    !Number.isInteger(minLength) ||
    !Number.isInteger(maxLength) ||
    !Number.isInteger(maxRepeatChars)
  );
};

const checkForbiddenPasswords = (
  password: string,
  forbiddenPasswords: Options['forbiddenPasswords']
) => {
  return contain(forbiddenPasswords, password);
};

const checkWhitespace = (password: string) => {
  return /\s/.test(password);
};

const checkHangul = (password: string) => {
  return /[가-힣]/.test(password);
};

const checkLength = (
  password: string,
  minLength: Options['minLength'],
  maxLength: Options['maxLength']
) => {
  return password.length >= minLength && password.length <= maxLength;
};

const checkLowerCase = (password: string) => {
  return /[a-z]/.test(password);
};

const checkNumber = (password: string) => {
  return /\d/.test(password);
};

const checkSpecialCharacter = (password: string) => {
  return /[^a-zA-Z0-9]/.test(password);
};

const checkUpperCase = (password: string) => {
  return /[A-Z]/.test(password);
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

  // Check invalid options
  if (checkInValidOptions(minLength, maxLength, maxRepeatChars)) {
    throw new Error('Invalid option value');
  }

  // Check Include forbidden password list
  if (checkForbiddenPasswords(password, forbiddenPasswords)) {
    return false;
  }

  // Check for whitespace
  if (checkWhitespace(password)) {
    return false;
  }

  // Check for consecutive characters
  if (checkConsecutiveChars(password, maxRepeatChars)) {
    return false;
  }

  // Check for Korean language inclusions
  if (!isContainHangul && checkHangul(password)) {
    return false;
  }

  // level1: Check password minimum/maximum length
  if (level >= 1 && !checkLength(password, minLength, maxLength)) {
    return false;
  }

  // level2: Check for inclusion of lowercase letter
  if (level >= 2 && !checkLowerCase(password)) {
    return false;
  }

  // level3: Check for inclusion of lowercase letter + numbers
  if (level >= 3 && !checkNumber(password)) {
    return false;
  }

  // level4: Check for inclusion of lowercase letter + numbers + special characters
  if (level >= 4 && !checkSpecialCharacter(password)) {
    return false;
  }

  // level5: Check for inclusion of lowercase letter + numbers + special characters + uppercase letter
  if (level >= 5 && !checkUpperCase(password)) {
    return false;
  }

  return true;
};
