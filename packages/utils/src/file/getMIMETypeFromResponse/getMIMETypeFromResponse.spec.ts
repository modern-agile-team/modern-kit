import { getMIMETypeFromResponse } from '.';

describe('getMIMETypeFromResponse', () => {
  it('should return the correct MIME type from the response headers', () => {
    const headers = new Headers();
    headers.set('Content-Type', 'image/png');

    const mockResponse = new Response(null, { headers });

    const mimeType = getMIMETypeFromResponse(mockResponse);
    expect(mimeType).toBe('image/png');
  });

  it('should return an empty string if the Content-Type header is not present', () => {
    const headers = new Headers();
    const mockResponse = new Response(null, { headers });

    const mimeType = getMIMETypeFromResponse(mockResponse);
    expect(mimeType).toBe('');
  });

  it('should return an empty string when given an invalid argument', () => {
    const mockResponse1 = {} as unknown as Response;
    const mockResponse2 = 123 as unknown as Response;

    const mimeType1 = getMIMETypeFromResponse(mockResponse1);
    expect(mimeType1).toBe('');

    const mimeType2 = getMIMETypeFromResponse(mockResponse2);
    expect(mimeType2).toBe('');
  });
});
