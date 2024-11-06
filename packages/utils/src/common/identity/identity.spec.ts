import { describe, it, expect } from 'vitest';
import { identity } from '.';

describe('identity', () => {
  it('동일한 문자열 값을 반환해야 합니다.', () => {
    const value = 'test';
    const result = identity(value);

    expect(result).toBe(value);
  });

  it('동일한 숫자 값을 반환해야 합니다.', () => {
    const value = 42;
    const result = identity(value);

    expect(result).toBe(value);
  });

  it('동일한 부울 값을 반환해야 합니다.', () => {
    const value = true;
    const result = identity(value);

    expect(result).toBe(value);
  });

  it('동일한 객체 참조를 반환해야 합니다.', () => {
    const value = { key: 'value' };
    const result = identity(value);

    expect(result).toBe(value);
  });

  it('동일한 배열 참조를 반환해야 합니다.', () => {
    const value = [1, 2, 3];
    const result = identity(value);

    expect(result).toBe(value);
  });

  it('동일한 함수 참조를 반환해야 합니다.', () => {
    const value = () => 'function';
    const result = identity(value);

    expect(result).toBe(value);
  });

  it('동일한 null 값을 반환해야 합니다.', () => {
    const value = null;
    const result = identity(value);

    expect(result).toBe(value);
  });

  it('동일한 undefined 값을 반환해야 합니다.', () => {
    const value = undefined;
    const result = identity(value);

    expect(result).toBe(value);
  });
});
