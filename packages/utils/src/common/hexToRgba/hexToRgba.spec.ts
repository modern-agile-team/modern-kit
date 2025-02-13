import { describe, it, expect } from 'vitest';
import { hexToRgba } from '.';

describe('hexToRgba', () => {
  it('유효한 16진수 색상을 RGB로 변환해야 합니다.', () => {
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

  it('유효하지 않은 16진수 색상에 대해 null을 반환해야 합니다.', () => {
    const invalidHexColor1 = '#XYZ123';
    const invalidHexColor2 = '#1A23';

    expect(hexToRgba(invalidHexColor1)).toBeNull();
    expect(hexToRgba(invalidHexColor2)).toBeNull();
  });

  it('짧은 16진수 색상 코드를 처리해야 합니다.', () => {
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

  it('빈 문자열에 대해 null을 반환해야 합니다.', () => {
    const emptyHexColor = '';
    const rgbColor = hexToRgba(emptyHexColor);

    expect(rgbColor).toBeNull();
  });
});
