import { describe, it, expect } from 'vitest';
import { isWindow } from '.';

describe('isWindow', () => {
  it('window 객체를 올바르게 식별해야 합니다.', () => {
    const div = document.createElement('div');

    expect(isWindow(window)).toBeTruthy();

    expect(isWindow(window.document)).toBeFalsy();
    expect(isWindow({})).toBeFalsy();
    expect(isWindow(div)).toBeFalsy();
    expect(isWindow(1)).toBeFalsy();
    expect(isWindow('')).toBeFalsy();
  });
});
