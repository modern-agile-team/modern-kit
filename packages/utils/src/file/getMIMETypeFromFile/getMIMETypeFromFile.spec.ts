import { getMIMETypeFromFile } from '.';

describe('getMIMETypeFromFile', () => {
  it('should return the MIME type of a valid file', () => {
    const file = new File([''], 'example.png', { type: 'image/png' });
    const result = getMIMETypeFromFile(file);
    expect(result).toBe('image/png');
  });

  it('should return an empty string if the file type is an empty string', () => {
    const file = new File([''], 'example', { type: '' });
    const result = getMIMETypeFromFile(file);
    expect(result).toBe('');
  });

  it('should return an empty string if the file type is invalid', () => {
    const file = new File([''], 'example.unknown');
    const result = getMIMETypeFromFile(file);
    expect(result).toBe('');
  });

  it('should return an empty string if the argument is invalid', () => {
    const result = getMIMETypeFromFile(NaN as any);
    expect(result).toBe('');
  });
});
