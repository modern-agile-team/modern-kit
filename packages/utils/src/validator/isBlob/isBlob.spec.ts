import { describe, expect, it } from 'vitest';
import { isBlob } from '.';

describe('isBlob', () => {
  it('값이 Blob인 경우 true를 반화해야 합니다.', () => {
    expect(isBlob(new Blob())).toBeTruthy();

    const blobWithOptions = new Blob(['content'], { type: 'text/plain' });
    expect(isBlob(blobWithOptions)).toBeTruthy();
  });

  it('값이 Blob이 아닌 경우 false를 반환해야 합니다.', () => {
    expect(isBlob('blob')).toBeFalsy();
    expect(isBlob(123)).toBeFalsy();
    expect(isBlob({ a: 1 })).toBeFalsy();
    expect(isBlob([1, 2, 3])).toBeFalsy();
    expect(isBlob(null)).toBeFalsy();
    expect(isBlob(undefined)).toBeFalsy();
  });
});
