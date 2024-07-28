import { describe, it } from 'vitest';
import { isWindow } from '.';

describe('isWindow', () => {
  it('should correctly identify window objects', () => {
    const div = document.createElement('div');

    expect(isWindow(window)).toBeTruthy();

    expect(isWindow(window.document)).toBeFalsy();
    expect(isWindow({})).toBeFalsy();
    expect(isWindow(div)).toBeFalsy();
    expect(isWindow(1)).toBeFalsy();
    expect(isWindow('')).toBeFalsy();
  });
});
