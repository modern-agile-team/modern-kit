import { describe, it, expect } from 'vitest';
import { getMIMETypeFromFile } from '.';

describe('getMIMETypeFromFile', () => {
  it('유효한 파일의 MIME 타입을 반환해야 합니다.', () => {
    const file = new File([''], 'example.png', { type: 'image/png' });
    const mimeType = getMIMETypeFromFile(file);
    expect(mimeType).toBe('image/png');
  });

  it('파일 타입이 빈 문자열일 경우 빈 문자열을 반환해야 합니다.', () => {
    const file = new File([''], 'example', { type: '' });
    const mimeType = getMIMETypeFromFile(file);
    expect(mimeType).toBe('');
  });

  it('파일 타입이 유효하지 않을 경우 빈 문자열을 반환해야 합니다.', () => {
    const file = new File([''], 'example.unknown');
    const mimeType = getMIMETypeFromFile(file);
    expect(mimeType).toBe('');
  });

  it('인자가 유효하지 않을 경우 빈 문자열을 반환해야 합니다.', () => {
    const mimeType1 = getMIMETypeFromFile(NaN as unknown as File);
    expect(mimeType1).toBe('');

    const mimeType2 = getMIMETypeFromFile(123 as unknown as File);
    expect(mimeType2).toBe('');
  });
});
