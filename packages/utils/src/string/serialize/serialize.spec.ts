import { serialize } from '.';

describe('serialize', () => {
  it('should return the correct string for a valid value', () => {
    const value = {
      str: 123,
      foo: 'boo',
    };

    expect(serialize(value)).toBe('str=123&foo=boo');
  });

  it('should return the correct string for a valid input with valid array', () => {
    const value = {
      str: 123,
      foo: 'boo',
      bar: [1, 2, 3],
    };

    expect(serialize(value)).toBe('str=123&foo=boo&bar=1&bar=2&bar=3');
  });

  it('should return the correct string for a valid input with invalid array', () => {
    const value = {
      str: 123,
      foo: 'boo',
      bar: [null, '', undefined],
    };

    expect(serialize(value)).toBe('str=123&foo=boo');
  });

  it('should return the correct string for a input with options', () => {
    const value = {
      str: null,
      bar: '',
      foo: undefined,
    };

    const option1 = { skipNull: false };
    const option2 = { skipEmptyString: false };
    const option3 = { skipUndefined: false };

    expect(serialize(value, option1)).toBe('str=null');
    expect(serialize(value, option2)).toBe('bar=');
    expect(serialize(value, option3)).toBe('foo=undefined');
  });
});
