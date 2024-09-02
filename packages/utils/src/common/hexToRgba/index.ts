import { repeatCharacters } from '../../string';

const FULL_HEX_LENGTH = 6;
const HEXADECIMAL = 16;

interface HexToRgbaReturnType {
  r: number;
  g: number;
  b: number;
  a: number;
  stringifiedValue: string;
}

/**
 * @description 16진수 색상 값을 RGBA 색상 값으로 변환하는 함수입니다.
 * 변환된 결과는 객체 형태로 반환되며, RGBA 값을 문자열로도 제공합니다.
 *
 * @param {string} hex - 변환할 16진수 색상 값입니다. `#` 기호는 필수 사항이며, 3자리(단축형) 또는 6자리의 16진수 값이어야 합니다.
 * @param {number} [alpha=1] - 색상의 투명도를 나타내는 알파 값입니다. 기본값은 1입니다.
 * @returns {{ r: number; g: number; b: number; a: number; stringifiedValue: string } | null}
 *  - 변환된 RGBA 값을 포함하는 객체를 반환합니다. 입력이 유효하지 않을 경우 `null`을 반환합니다.
 *
 * @example
 * hexToRgba('#FF5733', 0.5);
 * // { r: 255, g: 87, b: 51, a: 0.5, stringifiedValue: 'rgba(255,87,51,0.5)' }
 *
 * @example
 * hexToRgba('#1A2', 0.2);
 * // { r: 17, g: 170, b: 34, a: 0.2, stringifiedValue: 'rgba(17,170,34,0.2)' }
 */
export function hexToRgba(hex: string, alpha = 1): HexToRgbaReturnType | null {
  const regex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  if (!regex.test(hex)) {
    return null;
  }

  const replacedHex = hex.replace('#', '');
  const convertedHex =
    replacedHex.length === FULL_HEX_LENGTH
      ? replacedHex
      : repeatCharacters(replacedHex, 2);

  const r = parseInt(convertedHex.slice(0, 2), HEXADECIMAL);
  const g = parseInt(convertedHex.slice(2, 4), HEXADECIMAL);
  const b = parseInt(convertedHex.slice(4, 6), HEXADECIMAL);

  return {
    r,
    g,
    b,
    a: alpha,
    stringifiedValue: `rgba(${r},${g},${b},${alpha})`,
  };
}
