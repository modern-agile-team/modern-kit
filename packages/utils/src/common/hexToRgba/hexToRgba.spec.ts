import { describe, it, expect } from 'vitest';
import { hexToRgba } from '.';

describe('hexToRgba', () => {
  it('should convert valid hex color to RGB', () => {
    const upperCaseValidHexColor1 = '#1A2B3C';
    const lowerCaseValidHexColor2 = '#1a2b3c';

    const rgbColor1 = hexToRgba(upperCaseValidHexColor1);
    const rgbColor2 = hexToRgba(lowerCaseValidHexColor2, 0.5);

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
      a: 0.5,
      stringifiedValue: 'rgba(26,43,60,0.5)',
    });
  });

  it('should return null for invalid hex color', () => {
    const invalidHexColor1 = '#XYZ123';
    const invalidHexColor2 = '#1A23';

    expect(hexToRgba(invalidHexColor1)).toBeNull();
    expect(hexToRgba(invalidHexColor2)).toBeNull();
  });

  it('should handle short hex color codes', () => {
    const shortHexColor = '#1A2';
    const rgbColor = hexToRgba(shortHexColor, 0.2);

    expect(rgbColor).toEqual({
      r: 17,
      g: 170,
      b: 34,
      a: 0.2,
      stringifiedValue: 'rgba(17,170,34,0.2)',
    });
  });

  it('should return null for empty string', () => {
    const emptyHexColor = '';
    const rgbColor = hexToRgba(emptyHexColor);

    expect(rgbColor).toBeNull();
  });
});
