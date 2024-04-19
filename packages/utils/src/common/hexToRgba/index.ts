export const hexToRgba = (hex: string, alpha = 1) => {
  const regex = /^#?[0-9A-Fa-f]{6}$/;
  const HEXADECIMAL = 16;

  if (!regex.test(hex)) {
    return null;
  }

  let convertedHex = hex.replace('#', '');

  const r = parseInt(convertedHex.slice(0, 2), HEXADECIMAL);
  const g = parseInt(convertedHex.slice(2, 4), HEXADECIMAL);
  const b = parseInt(convertedHex.slice(4, 6), HEXADECIMAL);

  return {
    r,
    g,
    b,
    a: alpha,
    stringifiedValue: `rgba(${r},${g},${b},${alpha})`,
  } as const;
};
