import { isNumber } from '.';

describe('isNumber', () => {
  it('should return true if the argument is a number and false otherwise', () => {
    expect(isNumber(123)).toBeTruthy();

    expect(isNumber(() => {})).toBeFalsy();
    expect(isNumber('123')).toBeFalsy();
    expect(isNumber(true)).toBeFalsy();
    expect(isNumber({})).toBeFalsy();
    expect(isNumber([])).toBeFalsy();
  });
});
