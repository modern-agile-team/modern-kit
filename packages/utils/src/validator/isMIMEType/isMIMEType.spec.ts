import { isMIMEType } from '.';
import { MIMEType } from '../../file/constants';

describe('isMIMEType', () => {
  it('should return true if the argument is a MIMEType and false otherwise', () => {
    expect(isMIMEType('image/png')).toBeTruthy();
    expect(isMIMEType('application/json')).toBeTruthy();

    expect(isMIMEType('')).toBeFalsy();
    expect(isMIMEType('abc')).toBeFalsy();
  });

  it('should narrow the type to MIMEType if isMIMEType returns true', () => {
    const str = 'image/png' as string;

    if (isMIMEType(str)) {
      expectTypeOf(str).toEqualTypeOf<MIMEType>();
    } else {
      expectTypeOf(str).toEqualTypeOf<string>();
    }
  });
});
