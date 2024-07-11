import { hexToRgba } from '.';

describe.concurrent('hexToRgba', () => {
  it('should convert valid hex color to RGB', () => {
    const upperCaseValidHexColor1 = '#1A2B3C';
    const lowerCaseValidHexColor2 = '#1a2b3c';

    const rgbColor1 = hexToRgba(upperCaseValidHexColor1);
    const rgbColor2 = hexToRgba(lowerCaseValidHexColor2);

    expect(rgbColor1).toEqual({
      r: 26,
      g: 43,
      b: 60,
      a: 1,
      stringifiedValue: 'rgba(26,43,60,1)',
    });
    expect(rgbColor2).toEqual({
      r: 26,
      g: 43,
      b: 60,
      a: 1,
      stringifiedValue: 'rgba(26,43,60,1)',
    });
  });

  it('should return null for invalid hex color', () => {
    const invalidHexColor = '#XYZ123';
    const rgbColor = hexToRgba(invalidHexColor);

    expect(rgbColor).toBeNull();
  });

  it('should handle short hex color codes', () => {
    const shortHexColor = '#1A2';
    const rgbColor = hexToRgba(shortHexColor);

    expect(rgbColor).toBeNull();
  });

  it('should return null for empty string', () => {
    const emptyHexColor = '';
    const rgbColor = hexToRgba(emptyHexColor);

    expect(rgbColor).toBeNull();
  });
});
