import { describe, it, expect } from 'vitest';
import { getMIMETypeFromResponse } from '.';

describe('getMIMETypeFromResponse', () => {
  it('응답 헤더에서 올바른 MIME 타입을 반환해야 합니다.', () => {
    const headers = new Headers();
    headers.set('Content-Type', 'image/png');

    const mockResponse = new Response(null, { headers });

    const mimeType = getMIMETypeFromResponse(mockResponse);
    expect(mimeType).toBe('image/png');
  });

  it('Content-Type 헤더가 없을 경우 빈 문자열을 반환해야 합니다.', () => {
    const headers = new Headers();
    const mockResponse = new Response(null, { headers });

    const mimeType = getMIMETypeFromResponse(mockResponse);
    expect(mimeType).toBe('');
  });

  it('인자가 유효하지 않을 경우 빈 문자열을 반환해야 합니다.', () => {
    const mockResponse1 = {} as unknown as Response;
    const mockResponse2 = 123 as unknown as Response;

    const mimeType1 = getMIMETypeFromResponse(mockResponse1);
    expect(mimeType1).toBe('');

    const mimeType2 = getMIMETypeFromResponse(mockResponse2);
    expect(mimeType2).toBe('');
  });
});
