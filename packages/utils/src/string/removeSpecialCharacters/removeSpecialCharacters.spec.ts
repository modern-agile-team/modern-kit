import { describe, it, expect } from 'vitest';
import { removeSpecialCharacters } from '.';

describe('removeSpecialCharacters', () => {
  it('특수 문자가 없는 문자열에 대해 원본 문자열을 반환해야 합니다.', () => {
    const str = 'Hello World';
    expect(removeSpecialCharacters(str)).toBe('Hello World');
  });

  it('특수 문자가 포함된 문자열에 대해 특수 문자가 제거된 문자열을 반환해야 합니다.', () => {
    const str = 'H@#!ello, @Wo!@#!!(%)(!&@rld!';
    expect(removeSpecialCharacters(str)).toBe('Hello World');
  });
});
