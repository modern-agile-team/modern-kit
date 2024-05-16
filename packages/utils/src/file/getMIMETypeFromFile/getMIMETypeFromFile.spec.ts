import { getMIMETypeFromFile } from '.';

describe('getMIMETypeFromFile', () => {
  it('should return the MIME type of a valid file', () => {
    const file = new File([''], 'example.png', { type: 'image/png' });
    const mimeType = getMIMETypeFromFile(file);
    expect(mimeType).toBe('image/png');
  });

  it('should return an empty string if the file type is an empty string', () => {
    const file = new File([''], 'example', { type: '' });
    const mimeType = getMIMETypeFromFile(file);
    expect(mimeType).toBe('');
  });

  it('should return an empty string if the file type is invalid', () => {
    const file = new File([''], 'example.unknown');
    const mimeType = getMIMETypeFromFile(file);
    expect(mimeType).toBe('');
  });

  it('should return an empty string if the argument is invalid', () => {
    const mimeType1 = getMIMETypeFromFile(NaN as unknown as File);
    expect(mimeType1).toBe('');

    const mimeType2 = getMIMETypeFromFile(123 as unknown as File);
    expect(mimeType2).toBe('');
  });
});
