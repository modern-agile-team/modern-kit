import { describe, it, expect } from 'vitest';
import { serialize } from '.';

describe('serialize', () => {
  it('유효한 값이 주어지면 올바른 문자열을 반환해야 합니다', () => {
    const value = {
      str: 123,
      foo: 'boo',
    };

    expect(serialize(value)).toBe('str=123&foo=boo');
  });

  it('유효한 배열이 주어지면 올바른 문자열을 반환해야 합니다', () => {
    const value = {
      str: 123,
      foo: 'boo',
      bar: [1, 2, 3],
    };

    expect(serialize(value)).toBe('str=123&foo=boo&bar=1&bar=2&bar=3');
  });

  it('유효하지 않은 배열이 주어지면 올바른 문자열을 반환해야 합니다', () => {
    const value = {
      str: 123,
      foo: 'boo',
      bar: [null, '', undefined],
    };

    expect(serialize(value)).toBe('str=123&foo=boo');
  });

  it('옵션이 주어지면 올바른 문자열을 반환해야 합니다', () => {
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
